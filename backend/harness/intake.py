from __future__ import annotations

import hashlib
import io
import json
import re
import uuid
from pathlib import Path

from pypdf import PdfReader
from pypdf.errors import FileNotDecryptedError, PdfReadError

from harness import budgets

URL_KEYS = {
    "url",
    "image_url",
    "pdf_url",
    "file_url",
    "source_url",
    "fetch",
    "href",
    "uri",
    "download_url",
    "remote_url",
}

ALLOWED_MIME = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
    "application/pdf": ".pdf",
    "text/plain": ".txt",
    "application/json": ".json",
}

_HTML_HEAD = re.compile(r"\s*<(!doctype|html|script|svg|iframe)\b", re.I)


class IntakeError(Exception):
    def __init__(self, message: str, status: int = 400) -> None:
        super().__init__(message)
        self.status = status


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def reject_url_fetch(payload: object) -> None:
    """S-01: never fetch a user-supplied URL."""
    if isinstance(payload, dict):
        for key, value in payload.items():
            if str(key).lower() in URL_KEYS:
                raise IntakeError("server-side url fetch is forbidden", 400)
            reject_url_fetch(value)
    elif isinstance(payload, list):
        for item in payload:
            reject_url_fetch(item)


def sniff_mime(data: bytes) -> str | None:
    if not data:
        return None
    if data.startswith(b"\xff\xd8\xff"):
        return "image/jpeg"
    if data.startswith(b"\x89PNG\r\n\x1a\n"):
        return "image/png"
    if len(data) >= 12 and data[:4] == b"RIFF" and data[8:12] == b"WEBP":
        return "image/webp"
    if data.startswith(b"%PDF"):
        return "application/pdf"
    stripped = data.lstrip()
    try:
        text = stripped[:400].decode("utf-8")
    except UnicodeDecodeError:
        return None
    if _HTML_HEAD.match(text):
        return None
    if stripped[:1] in (b"{", b"["):
        return "application/json"
    try:
        data.decode("utf-8")
    except UnicodeDecodeError:
        return None
    return "text/plain"


def _reencode_image(data: bytes) -> bytes:
    from PIL import Image

    Image.MAX_IMAGE_PIXELS = budgets.IMAGE_MAX_PX * budgets.IMAGE_MAX_PX
    try:
        im = Image.open(io.BytesIO(data))
        im.load()
    except Exception as exc:  # noqa: BLE001 — hostile uploads
        raise IntakeError("image could not be decoded", 400) from exc
    w, h = im.size
    if w > budgets.IMAGE_MAX_PX or h > budgets.IMAGE_MAX_PX:
        raise IntakeError("image exceeds pixel budget", 413)
    if im.mode not in ("RGB", "L"):
        im = im.convert("RGB")
    out = io.BytesIO()
    im.save(out, format="JPEG", quality=85, optimize=True)
    return out.getvalue()


def _check_pdf(data: bytes) -> None:
    try:
        reader = PdfReader(io.BytesIO(data))
    except FileNotDecryptedError as exc:
        raise IntakeError("encrypted pdf rejected", 400) from exc
    except PdfReadError as exc:
        raise IntakeError("pdf could not be read", 400) from exc
    if getattr(reader, "is_encrypted", False):
        raise IntakeError("encrypted pdf rejected", 400)
    if len(reader.pages) > budgets.PDF_MAX_PAGES:
        raise IntakeError("pdf exceeds page budget", 413)


def ingest_bytes(data: bytes, uploads_dir: Path) -> dict:
    if not data:
        raise IntakeError("empty input", 400)
    if len(data) > budgets.UPLOAD_BYTES:
        raise IntakeError("upload exceeds size budget", 413)
    mime = sniff_mime(data)
    if mime is None or mime not in ALLOWED_MIME:
        raise IntakeError("file type not allowed", 400)
    stored = data
    if mime.startswith("image/"):
        stored = _reencode_image(data)
        mime = "image/jpeg"
    elif mime == "application/pdf":
        _check_pdf(data)
    uploads_dir.mkdir(parents=True, exist_ok=True)
    ext = ALLOWED_MIME[mime]
    name = f"{uuid.uuid4()}{ext}"
    dest = (uploads_dir / name).resolve()
    root = uploads_dir.resolve()
    if not str(dest).startswith(str(root) + "/") and dest.parent != root:
        raise IntakeError("path rejected", 400)
    dest.write_bytes(stored)
    return {
        "path": str(dest),
        "mime": mime,
        "input_hash": sha256_bytes(data),
        "stored_hash": sha256_bytes(stored),
        "bytes": len(stored),
    }


def ingest_json_text(text: str) -> dict:
    if not text or not text.strip():
        raise IntakeError("empty input", 400)
    if len(text.encode("utf-8")) > budgets.UPLOAD_BYTES:
        raise IntakeError("upload exceeds size budget", 413)
    try:
        payload = json.loads(text)
    except json.JSONDecodeError as exc:
        raise IntakeError("invalid json", 400) from exc
    reject_url_fetch(payload)
    return {
        "payload": payload,
        "input_hash": sha256_bytes(text.encode("utf-8")),
        "mime": "application/json",
    }
