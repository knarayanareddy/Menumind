from __future__ import annotations

from pathlib import Path

import pytest

from harness.intake import IntakeError, ingest_bytes, ingest_json_text, reject_url_fetch, sniff_mime


def test_rejects_url_keys():
    with pytest.raises(IntakeError) as ei:
        reject_url_fetch({"image_url": "http://127.0.0.1/"})
    assert ei.value.status == 400


def test_rejects_nested_url():
    with pytest.raises(IntakeError):
        reject_url_fetch({"listing": {"url": "file:///etc/passwd"}})


def test_sniff_rejects_html():
    assert sniff_mime(b"<script>alert(1)</script>") is None
    assert sniff_mime(b"<!DOCTYPE html><html>") is None


def test_json_ok():
    out = ingest_json_text('{"title":"bike"}')
    assert out["payload"]["title"] == "bike"
    assert len(out["input_hash"]) == 64


def test_json_url_forbidden():
    with pytest.raises(IntakeError):
        ingest_json_text('{"url":"http://169.254.169.254/"}')


def test_upload_rejects_oversize(tmp_path):
    data = b"A" * (8 * 1024 * 1024 + 1)
    with pytest.raises(IntakeError) as ei:
        ingest_bytes(data, tmp_path)
    assert ei.value.status == 413


def test_upload_rejects_html_polyglot(tmp_path):
    with pytest.raises(IntakeError):
        ingest_bytes(b"<html><body>not an image</body></html>", tmp_path)


def test_upload_png_roundtrip(tmp_path):
    from PIL import Image
    import io

    im = Image.new("RGB", (8, 8), (20, 20, 20))
    buf = io.BytesIO()
    im.save(buf, format="PNG")
    stored = ingest_bytes(buf.getvalue(), tmp_path)
    assert stored["mime"] == "image/jpeg"
    assert Path(stored["path"]).exists()
    assert Path(stored["path"]).resolve().parent == tmp_path.resolve()
