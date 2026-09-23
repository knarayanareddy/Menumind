from __future__ import annotations

import dataclasses
import json
from datetime import datetime, timezone

from harness.pipeline import JobResult
from harness.receipts import new_id
from harness.types import Action, ObserveResult, PolicyResult, Receipt


def test_accept_persists_actor_on_receipt(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    jid = r.json()["id"]
    a = client.post(f"/jobs/{jid}/accept", headers={"accept": "application/json"})
    assert a.status_code == 200
    rec = client.get(f"/receipts/{jid}").json()
    assert rec["actor"] == "human"


def test_override_sets_queue(client):
    from web import app as webapp

    rid = new_id()
    rec = Receipt(
        id=rid,
        ts=datetime.now(timezone.utc).isoformat(),
        skin="stub",
        input_hash="a" * 64,
        model_ids={"observe": "passthrough", "judge": "unconfigured"},
        endpoint_ids={"observe": "", "judge": ""},
        flavor={"judge": "fast"},
        questions={},
        answers={},
        policy=PolicyResult(action=Action.allow, reason_codes=["ok"], human_required=False),
        actor="system",
    )
    webapp.receipts.put(rec)
    webapp.jobs[rid] = JobResult(
        id=rid,
        recommended=Action.allow,
        frozen_to_queue=False,
        policy=rec.policy,
        observe=ObserveResult(state={}, raw_model="passthrough"),
        answers={},
        questions={},
        receipt=rec,
        display={"title": "bike", "description": "used"},
    )
    o = client.post(f"/jobs/{rid}/override", headers={"accept": "application/json"})
    assert o.status_code == 200
    stored = client.get(f"/receipts/{rid}").json()
    assert stored["actor"] == "human"
    assert stored["policy"]["action"] == "queue"
    assert "human_override" in stored["policy"]["reason_codes"]


def test_exhibit_from_receipt_without_ram(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    jid = r.json()["id"]
    from web import app as webapp

    webapp.jobs.clear()
    p = client.get(f"/exhibit/{jid}")
    assert p.status_code == 200
    pack = p.json()
    assert pack["not_legal_advice"] is True
    assert pack["art50_transparency"]["disclosure_present"] is True
    assert "compliant" not in str(pack).lower()


def test_eval_offline_hostile_not_allow(client):
    r = client.get("/eval")
    assert r.status_code == 200
    assert "ex-inject-01" in r.text
    assert "n = 12" in r.text
    assert "Offline harness eval" in r.text
    html = r.text
    # ours hostile_to_allow is 0; do not invent proprietary numbers
    assert "n/a" in html


def test_observe_judge_defaults_differ(monkeypatch):
    monkeypatch.delenv("TF_MODEL_OBSERVE", raising=False)
    monkeypatch.delenv("TF_MODEL_JUDGE", raising=False)
    from harness.config import load_settings

    s = load_settings()
    assert s.tf_model_observe != s.tf_model_judge


def test_named_human_unset_visible(client):
    r = client.get("/")
    assert r.status_code == 200
    assert "named human unset" in r.text
    assert "Stub agent" in r.text


def test_action_word_uppercased_in_html(client):
    r = client.post("/jobs/hostile")
    assert r.status_code == 200
    assert "QUEUE" in r.text
    assert "You are the operator." in r.text


def test_token_fields_on_kill_and_accept_when_set(client, monkeypatch):
    from web import app as webapp

    monkeypatch.setattr(
        webapp,
        "settings",
        dataclasses.replace(webapp.settings, demo_token="secret-token"),
    )
    home = client.get("/")
    assert 'id="token_k"' in home.text
    r = client.post(
        "/jobs/hostile",
        headers={"X-Demo-Token": "secret-token", "accept": "application/json"},
    )
    assert r.status_code == 200
    jid = r.json()["id"]
    denied = client.post(f"/jobs/{jid}/accept", headers={"accept": "application/json"})
    assert denied.status_code == 401
    ok = client.post(
        f"/jobs/{jid}/accept",
        headers={"accept": "application/json", "X-Demo-Token": "secret-token"},
    )
    assert ok.status_code == 200


def test_job_page_from_receipt(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    jid = r.json()["id"]
    from web import app as webapp

    webapp.jobs.clear()
    page = client.get(f"/jobs/{jid}")
    assert page.status_code == 200
    assert "Accept" in page.text
    assert "You are the operator." in page.text


def test_policy_span_records_action(tmp_path, monkeypatch, client):
    log = tmp_path / "spans.jsonl"
    monkeypatch.setenv("HARNESS_SPAN_LOG", str(log))
    client.post("/jobs/hostile", headers={"accept": "application/json"})
    rows = [json.loads(line) for line in log.read_text(encoding="utf-8").splitlines() if line.strip()]
    policy = [row for row in rows if row["name"] == "harness.policy"]
    assert policy
    assert policy[-1]["attributes"].get("harness.action") in ("queue", "block")


def test_art50_chrome_not_listing_text(client):
    r = client.post("/jobs", json={"title": "x", "description": "a used bike"})
    pack = client.get(f"/exhibit/{r.json()['id']}").json()
    assert pack["art50_transparency"]["disclosure_present"] is True
    assert pack["art15_eval"]["metrics"].get("heuristic") is True


def test_hostile_fixture_id_from_skin(client):
    r = client.post("/jobs/hostile", headers={"accept": "application/json"})
    assert r.json()["fixture"] == "ex-inject-01"
    assert r.json()["action"] != "allow"
