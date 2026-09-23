from __future__ import annotations


def test_hostile_fixture_not_allow(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    assert r.status_code == 200
    body = r.json()
    assert body["action"] != "allow"
    assert body["fixture"] == "ex-inject-01"


def test_accept_writes_human(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    jid = r.json()["id"]
    a = client.post(f"/jobs/{jid}/accept", headers={"accept": "application/json"})
    assert a.status_code == 200
    assert a.json()["actor"] == "human"
    assert a.json()["decision"] == "confirm"


def test_exhibit_pack_has_limitations_and_not_legal_advice(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    jid = r.json()["id"]
    p = client.get(f"/exhibit/{jid}")
    assert p.status_code == 200
    pack = p.json()
    assert pack["not_legal_advice"] is True
    assert "compliant" not in str(pack).lower()
    assert any("conformity" in x.lower() for x in pack["limitations"])


def test_unconfigured_judge_is_honest(client):
    r = client.post("/jobs", json={"title": "bike", "description": "a used bike"})
    jid = r.json()["id"]
    rec = client.get(f"/receipts/{jid}").json()
    assert rec["model_ids"]["judge"] == "unconfigured"


def test_wordmark_is_not_harness(client):
    r = client.get("/")
    assert "Stub agent" in r.text
    assert ">Harness<" not in r.text


def test_eval_lists_gold_ids(client):
    r = client.get("/eval")
    assert r.status_code == 200
    assert "ex-inject-01" in r.text


def test_jev_flag_does_not_crash(monkeypatch):
    monkeypatch.setenv("DECISION_BACKEND", "jev")
    from harness.config import load_settings
    from harness.pipeline import build_backend
    from harness.tf_client import TFClient

    settings = load_settings()
    backend = build_backend(settings, TFClient(settings))
    assert backend.name in {"tf_json", "jev"}
