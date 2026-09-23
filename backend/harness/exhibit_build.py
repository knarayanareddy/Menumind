from __future__ import annotations

from datetime import datetime, timezone

from harness.eval_judges import deterministic_eval
from harness.exhibit_schema import (
    Art11,
    Art12,
    Art14,
    Art15,
    Art50,
    ExhibitPack,
    Reviewer,
    SpanRow,
    SystemInfo,
)
from harness.pipeline import JobResult, job_from_receipt
from harness.redact import redact
from harness.types import Receipt

# Chrome always shows "Model recommendation. You are the operator."
# Do not infer disclosure from attacker-controlled listing text.
CHROME_DISCLOSES_OPERATOR = True


def pack_from_job(job: JobResult, *, reviewer_name: str, reviewer_role: str, reviews: list[dict]) -> ExhibitPack:
    last = reviews[-1] if reviews else {}
    spans = [
        SpanRow(name="harness.observe", kind="LLM", model=job.receipt.model_ids.get("observe", "")),
        SpanRow(name="harness.judge", kind="LLM", model=job.receipt.model_ids.get("judge", "")),
        SpanRow(
            name="harness.policy",
            kind="CHAIN",
            action=job.policy.action.value,
        ),
    ]
    hostile = "injection_or_jailbreak" in job.policy.reason_codes
    ev = deterministic_eval(policy=job.policy, hostile=hostile, disclosure=CHROME_DISCLOSES_OPERATOR)
    return ExhibitPack(
        generated_at=datetime.now(timezone.utc).isoformat(),
        system=SystemInfo(
            name=job.receipt.skin,
            skin=job.receipt.skin,
            tf_models=dict(job.receipt.model_ids),
            tf_endpoints=dict(job.receipt.endpoint_ids),
        ),
        named_reviewer=Reviewer(name=reviewer_name, role=reviewer_role),
        art12_records=Art12(job_id=job.id, input_hash=job.receipt.input_hash, spans=spans),
        art14_review=Art14(
            actor=str(last.get("actor") or "system"),
            name=str(last.get("name") or ""),
            ts=str(last.get("ts") or ""),
            decision=str(last.get("decision") or ""),
            span_id=job.id,
        ),
        art15_eval=Art15(
            n=0,
            metrics={**ev, "unconfigured": job.unconfigured},
            judge_backend="heuristic" if job.unconfigured else "tf_json",
            judge_human_agreement_note="not measured this run; metrics.heuristic=true means deterministic fallback",
        ),
        art50_transparency=Art50(disclosure_present=CHROME_DISCLOSES_OPERATOR),
        art11_lineage=Art11(policy_id=f"{job.receipt.skin}-v1"),
    )


def pack_from_receipt(
    receipt: Receipt,
    *,
    reviewer_name: str,
    reviewer_role: str,
    reviews: list[dict],
) -> ExhibitPack:
    job = job_from_receipt(receipt, reviews)
    return pack_from_job(job, reviewer_name=reviewer_name, reviewer_role=reviewer_role, reviews=reviews)


def pack_json_safe(pack: ExhibitPack) -> dict:
    raw = pack.model_dump()
    return {
        **raw,
        "art12_records": {
            **raw["art12_records"],
            "input_hash": raw["art12_records"]["input_hash"],
        },
        "limitations": [redact(x) for x in raw["limitations"]],
    }
