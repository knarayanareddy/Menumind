from __future__ import annotations

import os
import sys
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
os.environ.setdefault("ENV", "demo")
os.environ.setdefault("SKIN", "stub")
os.environ.setdefault("DEMO_TOKEN", "")
os.environ.setdefault("TF_API_KEY", "")
os.environ.setdefault("TF_BASE_URL", "")


@pytest.fixture()
def client(tmp_path, monkeypatch):
    monkeypatch.setenv("DEMO_TOKEN", "")
    from web import app as webapp

    webapp.UPLOADS = tmp_path / "uploads"
    webapp.UPLOADS.mkdir()
    webapp.DB = tmp_path / "r.sqlite"
    from harness.receipts import ReceiptStore

    webapp.receipts = ReceiptStore(webapp.DB)
    webapp.jobs.clear()
    webapp.kill.frozen = False
    from harness.rate_limit import RateLimiter

    webapp.limiter = RateLimiter()
    return TestClient(webapp.app, raise_server_exceptions=False)
