from __future__ import annotations

import re

IBAN_RE = re.compile(r"\b[A-Z]{2}\d{2}[A-Z0-9]{10,30}\b")
PHONE_RE = re.compile(r"\b(?:\+?\d[\d\s\-()]{8,}\d)\b")
EMAIL_RE = re.compile(r"\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b", re.I)
KEY_RE = re.compile(r"(api[_-]?key|tf_api_key|authorization)\s*[:=]\s*\S+", re.I)


def redact(text: str) -> str:
    if not text:
        return text
    text = KEY_RE.sub(r"\1=[REDACTED]", text)
    text = IBAN_RE.sub("[IBAN]", text)
    text = EMAIL_RE.sub("[EMAIL]", text)
    text = PHONE_RE.sub("[PHONE]", text)
    return text


def redact_obj(value):
    if isinstance(value, str):
        return redact(value)
    if isinstance(value, dict):
        return {k: redact_obj(v) for k, v in value.items()}
    if isinstance(value, list):
        return [redact_obj(v) for v in value]
    return value
