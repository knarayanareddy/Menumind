from __future__ import annotations

import dataclasses

from harness.config import Settings
from harness.eval_runner import redact


def test_health(client):
    r = client.get("/health")
    assert r.status_code == 200
    assert r.text == "ok"


def test_csp_header_present(client):
    r = client.get("/")
    assert r.status_code == 200
    csp = r.headers.get("content-security-policy", "")
    assert "default-src 'self'" in csp
    assert r.headers.get("x-content-type-options") == "nosniff"
    assert "7C3AED" not in r.text
    assert "Inter" not in r.text
    assert "gradient" not in r.text.lower()


def test_rejects_url_fetch(client):
    r = client.post("/jobs", json={"url": "http://127.0.0.1/latest/meta-data"})
    assert r.status_code == 400


def test_upload_rejects_html_polyglot(client):
    r = client.post(
        "/jobs",
        files={"upload": ("x.png", b"<script>alert(1)</script>", "image/png")},
    )
    assert r.status_code in (400, 413)


def test_upload_rejects_oversize(client):
    r = client.post(
        "/jobs",
        files={"upload": ("big.txt", b"A" * (8 * 1024 * 1024 + 10), "text/plain")},
    )
    assert r.status_code == 413


def test_jinja_escapes_script_in_description(client):
    r = client.post(
        "/jobs",
        data={"json_text": '{"title":"t","description":"<script>alert(1)</script>"}'},
        headers={"accept": "text/html"},
    )
    assert r.status_code == 200
    assert "<script>alert(1)</script>" not in r.text
    assert "alert(1)" in r.text


def test_demo_token_required_when_set(client, monkeypatch):
    from web import app as webapp

    monkeypatch.setattr(
        webapp,
        "settings",
        dataclasses.replace(webapp.settings, demo_token="secret-token"),
    )
    r = client.post("/jobs", json={"title": "x"})
    assert r.status_code == 401
    r2 = client.post(
        "/jobs",
        json={"title": "x", "description": "hello"},
        headers={"X-Demo-Token": "secret-token"},
    )
    assert r2.status_code == 200


def test_eval_page_does_not_contain_raw_iban_fixture(client, tmp_path, monkeypatch):
    from web import app as webapp

    report_dir = tmp_path / "stub"
    report_dir.mkdir()
    (report_dir / "last_report.json").write_text(
        '{"skin":"stub","n":1,"metrics":{},"fixture_ids":["lg-pii-01"],'
        '"notes":"NL91ABNA0417164300 should not survive"}',
        encoding="utf-8",
    )
    monkeypatch.setattr(webapp, "EVALS", tmp_path)
    r = client.get("/eval")
    assert r.status_code == 200
    assert "NL91ABNA0417164300" not in r.text
    assert "[IBAN]" in r.text or "lg-pii-01" in r.text


def test_receipt_json_uuid(client):
    r = client.post("/jobs", json={"title": "bike", "description": "a used bike"})
    assert r.status_code == 200
    jid = r.json()["id"]
    rec = client.get(f"/receipts/{jid}")
    assert rec.status_code == 200
    import uuid

    uuid.UUID(rec.json()["id"])


def test_redact_iban():
    assert "[IBAN]" in redact("pay to NL91ABNA0417164300 please")
