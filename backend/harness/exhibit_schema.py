from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field

PACK_VERSION = "0.1"

DEFAULT_LIMITATIONS = [
    "Does not classify the system under the AI Act.",
    "Does not constitute a conformity assessment or CE marking.",
    "Eval judges are not calibrated to a human set unless n>0 is shown.",
    "Retention, EU region, and AX audit history were not demonstrated.",
]


class Reviewer(BaseModel):
    name: str = ""
    role: str = ""


class SpanRow(BaseModel):
    name: str
    kind: str
    latency_ms: int = 0
    model: str = ""
    tokens_in: int = 0
    tokens_out: int = 0
    action: str = ""


class Art12(BaseModel):
    job_id: str
    input_hash: str
    spans: list[SpanRow] = Field(default_factory=list)


class Art14(BaseModel):
    actor: str = "system"
    name: str = ""
    ts: str = ""
    decision: str = ""
    span_id: str = ""


class Art15(BaseModel):
    dataset_id: str = "gold"
    n: int = 0
    metrics: dict[str, Any] = Field(default_factory=dict)
    judge_backend: str = "tf_json"
    judge_human_agreement_n: int = 0
    judge_human_agreement_note: str = "not measured this run"


class Art50(BaseModel):
    disclosure_present: bool = False


class Art72(BaseModel):
    status: str = "stub"
    note: str = "AX monitors not connected this run"


class Art11(BaseModel):
    prompt_versions: list[str] = Field(default_factory=list)
    policy_id: str = ""


class SystemInfo(BaseModel):
    name: str = "stub-agent"
    skin: str = "exhibit"
    tf_models: dict[str, str] = Field(default_factory=dict)
    tf_endpoints: dict[str, str] = Field(default_factory=dict)


class ExhibitPack(BaseModel):
    pack_version: str = PACK_VERSION
    generated_at: str
    not_legal_advice: bool = True
    system: SystemInfo
    named_reviewer: Reviewer
    art12_records: Art12
    art14_review: Art14
    art15_eval: Art15
    art50_transparency: Art50
    art72_post_market: Art72 = Field(default_factory=Art72)
    art11_lineage: Art11 = Field(default_factory=Art11)
    limitations: list[str] = Field(default_factory=lambda: list(DEFAULT_LIMITATIONS))
