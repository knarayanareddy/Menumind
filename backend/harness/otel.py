"""OpenInference spans. No-op if packages or endpoint are missing.

OTLP endpoint comes from env only (no UI field — SSRF).
Default allowlist: localhost, 127.0.0.1, ::1.
Write on exit so set_attribute is recorded.
"""

from __future__ import annotations

import json
import os
from contextlib import contextmanager
from pathlib import Path
from typing import Any, Iterator
from urllib.parse import urlparse

from harness.redact import redact_obj

SPAN_JOB = "harness.job"
SPAN_OBSERVE = "harness.observe"
SPAN_JUDGE = "harness.judge"
SPAN_POLICY = "harness.policy"
SPAN_GENERATE = "harness.generate"
SPAN_EVAL = "harness.eval"

_ALLOWED_HOSTS = {"localhost", "127.0.0.1", "::1"}


def otlp_endpoint() -> str | None:
    raw = os.environ.get("OTEL_EXPORTER_OTLP_ENDPOINT", "").strip()
    if not raw:
        return None
    parsed = urlparse(raw if "://" in raw else "http://" + raw)
    host = parsed.hostname or ""
    allow_remote = os.environ.get("OTEL_ALLOW_REMOTE", "0") == "1"
    if host not in _ALLOWED_HOSTS and not allow_remote:
        return None
    return raw


class RecSpan:
    def __init__(self, attrs: dict[str, Any]) -> None:
        self._attrs = attrs

    def set_attribute(self, key: str, value: Any) -> None:
        self._attrs[key] = value


@contextmanager
def span(name: str, kind: str = "CHAIN", attrs: dict | None = None) -> Iterator[RecSpan]:
    """Yield a span-like object. Records to JSONL on exit; OTel if configured later."""
    rec_attrs: dict[str, Any] = dict(attrs or {})
    handle = RecSpan(rec_attrs)
    try:
        yield handle
    finally:
        rec = {"name": name, "kind": kind, "attributes": redact_obj(rec_attrs)}
        path = Path(os.environ.get("HARNESS_SPAN_LOG", "evals/spans.jsonl"))
        try:
            path.parent.mkdir(parents=True, exist_ok=True)
            with path.open("a", encoding="utf-8") as fh:
                fh.write(json.dumps(rec) + "\n")
        except OSError:
            pass


def phoenix_enabled() -> bool:
    if otlp_endpoint() is None and os.environ.get("PHOENIX_LAUNCH", "0") != "1":
        return False
    try:
        import phoenix.otel  # noqa: F401
    except ImportError:
        return False
    return True
