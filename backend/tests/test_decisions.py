from __future__ import annotations

from harness.decisions import coerce_answers, json_schema_for, queue_forcing_answers
from harness.types import ChoiceA, ChoiceQ, NoulA, NoulQ, ScoreQ


def _qs():
    return {
        "bucket": ChoiceQ(
            instructions="x",
            criteria={"ok": "ok", "hostile": "h", "unknown": "u"},
        ),
        "injection": NoulQ(instructions="inj"),
        "risk": ScoreQ(instructions="r", criteria=["low", "mid", "high"]),
    }


def test_choice_unknown_forced_queue():
    qs = _qs()
    out = coerce_answers({"bucket": {"value": "not-a-label"}}, qs)
    assert isinstance(out["bucket"], ChoiceA)
    assert out["bucket"].value == "unknown"
    forced = queue_forcing_answers(qs)
    assert forced["injection"].p_true == 0.5


def test_schema_enum_closed():
    schema = json_schema_for(_qs())
    enum = schema["properties"]["bucket"]["properties"]["value"]["enum"]
    assert "ok" in enum and "made_up" not in enum


def test_noul_clipped():
    out = coerce_answers({"injection": {"p_true": 4}}, _qs())
    assert isinstance(out["injection"], NoulA)
    assert out["injection"].p_true == 1.0
