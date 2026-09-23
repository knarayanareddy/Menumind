from __future__ import annotations

from typing import Protocol

from harness.types import (
    Answer,
    ChoiceA,
    ChoiceQ,
    NoulA,
    NoulQ,
    Question,
    ScoreA,
    ScoreQ,
)


class DecisionBackend(Protocol):
    name: str

    def decide(self, state: dict, questions: dict[str, Question]) -> dict[str, Answer]:
        ...


def json_schema_for(questions: dict[str, Question]) -> dict:
    properties: dict = {}
    required: list[str] = []
    for key, q in questions.items():
        required.append(key)
        if isinstance(q, ChoiceQ):
            properties[key] = {
                "type": "object",
                "additionalProperties": False,
                "required": ["value"],
                "properties": {
                    "value": {"type": "string", "enum": list(q.criteria.keys())},
                    "probabilities": {"type": "object"},
                },
            }
        elif isinstance(q, ScoreQ):
            properties[key] = {
                "type": "object",
                "additionalProperties": False,
                "required": ["value"],
                "properties": {
                    "value": {"type": "number"},
                    "label": {"type": "string"},
                },
            }
        elif isinstance(q, NoulQ):
            properties[key] = {
                "type": "object",
                "additionalProperties": False,
                "required": ["p_true"],
                "properties": {"p_true": {"type": "number", "minimum": 0, "maximum": 1}},
            }
    return {
        "type": "object",
        "additionalProperties": False,
        "required": required,
        "properties": properties,
    }


def queue_forcing_answers(questions: dict[str, Question]) -> dict[str, Answer]:
    out: dict[str, Answer] = {}
    for key, q in questions.items():
        if isinstance(q, ChoiceQ):
            value = "unknown" if "unknown" in q.criteria else next(iter(q.criteria))
            out[key] = ChoiceA(value=value, probabilities={value: 1.0})
        elif isinstance(q, ScoreQ):
            mid = (len(q.criteria) - 1) / 2 if q.criteria else 0.0
            label = q.criteria[int(round(mid))] if q.criteria else "unknown"
            out[key] = ScoreA(value=float(mid), label=label)
        elif isinstance(q, NoulQ):
            out[key] = NoulA(p_true=0.5)
    return out


def coerce_answers(raw: dict, questions: dict[str, Question]) -> dict[str, Answer]:
    """Drop unknown keys. Clip/validate. Invalid choice → unknown/first."""
    out: dict[str, Answer] = {}
    for key, q in questions.items():
        blob = raw.get(key) if isinstance(raw, dict) else None
        if not isinstance(blob, dict):
            blob = {}
        if isinstance(q, ChoiceQ):
            value = str(blob.get("value", ""))
            if value not in q.criteria:
                value = "unknown" if "unknown" in q.criteria else next(iter(q.criteria))
            probs = blob.get("probabilities") or {}
            if not isinstance(probs, dict):
                probs = {}
            clean = {}
            for k, v in probs.items():
                if k in q.criteria:
                    try:
                        clean[str(k)] = float(v)
                    except (TypeError, ValueError):
                        continue
            out[key] = ChoiceA(value=value, probabilities=clean)
        elif isinstance(q, ScoreQ):
            try:
                val = float(blob.get("value", 0))
            except (TypeError, ValueError):
                val = 0.0
            hi = max(len(q.criteria) - 1, 0)
            val = min(max(val, 0.0), float(hi))
            idx = int(round(val))
            label = q.criteria[idx] if q.criteria else str(val)
            out[key] = ScoreA(value=val, label=str(blob.get("label") or label))
        elif isinstance(q, NoulQ):
            try:
                p = float(blob.get("p_true", 0.5))
            except (TypeError, ValueError):
                p = 0.5
            out[key] = NoulA(p_true=min(max(p, 0.0), 1.0))
    return out
