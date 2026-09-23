from __future__ import annotations

from enum import Enum
from typing import Any, Literal

from pydantic import BaseModel, Field


class Action(str, Enum):
    allow = "allow"
    queue = "queue"
    block = "block"


class ChoiceQ(BaseModel):
    kind: Literal["choice"] = "choice"
    instructions: str
    criteria: dict[str, str]


class ScoreQ(BaseModel):
    kind: Literal["score"] = "score"
    instructions: str
    criteria: list[str]


class NoulQ(BaseModel):
    kind: Literal["noul"] = "noul"
    instructions: str


Question = ChoiceQ | ScoreQ | NoulQ


class ChoiceA(BaseModel):
    kind: Literal["choice"] = "choice"
    value: str
    probabilities: dict[str, float] = Field(default_factory=dict)


class ScoreA(BaseModel):
    kind: Literal["score"] = "score"
    value: float
    label: str


class NoulA(BaseModel):
    kind: Literal["noul"] = "noul"
    p_true: float


Answer = ChoiceA | ScoreA | NoulA


class ObserveResult(BaseModel):
    state: dict[str, Any]
    raw_model: str
    tokens_in: int = 0
    tokens_out: int = 0
    latency_ms: int = 0


class PolicyResult(BaseModel):
    action: Action
    reason_codes: list[str]
    human_required: bool
    notes: str = ""


class Receipt(BaseModel):
    id: str
    ts: str
    skin: str
    input_hash: str
    model_ids: dict[str, str]
    endpoint_ids: dict[str, str]
    flavor: dict[str, str]
    questions: dict[str, Question]
    answers: dict[str, Answer]
    policy: PolicyResult
    actor: str = "system"
    euro_estimate: float = 0.0
    judge_schema_fail: bool = False
