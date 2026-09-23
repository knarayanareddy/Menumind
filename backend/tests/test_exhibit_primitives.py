from __future__ import annotations

import json
from pathlib import Path

from harness.eval_judges import deterministic_eval, eval_questions
from harness.exhibit_schema import DEFAULT_LIMITATIONS, ExhibitPack
from harness.otel import SPAN_JUDGE, otlp_endpoint, span
from harness.redact import redact, redact_obj
from harness.types import Action, PolicyResult


def test_pack_requires_limitations_and_not_legal_advice():
    pack = ExhibitPack(
        generated_at="2026-09-22T00:00:00+00:00",
        system={"name": "stub-agent", "skin": "exhibit"},
        named_reviewer={"name": "Maya", "role": "Head of AI Platform"},
        art12_records={"job_id": "00000000-0000-0000-0000-000000000001", "input_hash": "ab"},
        art14_review={"actor": "human", "name": "Maya", "decision": "confirm_queue"},
        art15_eval={"n": 0},
        art50_transparency={"disclosure_present": True},
    )
    blob = json.loads(pack.model_dump_json())
    assert blob["not_legal_advice"] is True
    assert "compliant" not in json.dumps(blob).lower()
    for line in DEFAULT_LIMITATIONS:
        assert line in blob["limitations"]


def test_otlp_rejects_metadata_host(monkeypatch):
    monkeypatch.setenv("OTEL_EXPORTER_OTLP_ENDPOINT", "http://169.254.169.254/v1/traces")
    monkeypatch.setenv("OTEL_ALLOW_REMOTE", "0")
    assert otlp_endpoint() is None


def test_span_jsonl_redacts(tmp_path, monkeypatch):
    log = tmp_path / "spans.jsonl"
    monkeypatch.setenv("HARNESS_SPAN_LOG", str(log))
    with span(SPAN_JUDGE, "LLM", {"input": "pay NL91ABNA0417164300"}):
        pass
    row = json.loads(log.read_text(encoding="utf-8").splitlines()[-1])
    assert "[IBAN]" in row["attributes"]["input"]
    assert "NL91ABNA0417164300" not in row["attributes"]["input"]


def test_eval_questions_closed_set():
    q = eval_questions()
    assert "unknown" in q["eval_bucket"].criteria
    assert "compliant" not in q["eval_bucket"].criteria


def test_deterministic_eval_hostile_not_allow():
    policy = PolicyResult(action=Action.queue, reason_codes=["injection_or_jailbreak"], human_required=True)
    out = deterministic_eval(policy=policy, hostile=True, disclosure=True)
    assert out["injection_caught"] == 1.0
    assert out["heuristic"] is True


def test_redact_keys():
    assert "[REDACTED]" in redact("TF_API_KEY=sk-secret")
    assert "sk-secret" not in redact("TF_API_KEY=sk-secret")
    assert redact_obj({"email": "a@b.nl"})["email"] == "[EMAIL]"
