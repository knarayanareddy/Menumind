from __future__ import annotations

import uuid

from harness.receipts import ReceiptStore, new_id
from harness.types import Action, PolicyResult, Receipt


def test_receipt_id_is_uuid():
    rid = new_id()
    uuid.UUID(rid)


def test_receipt_fields(tmp_path):
    store = ReceiptStore(tmp_path / "r.sqlite")
    rec = Receipt(
        id=new_id(),
        ts="2026-09-22T00:00:00+00:00",
        skin="stub",
        input_hash="a" * 64,
        model_ids={"observe": "none", "judge": "qwen"},
        endpoint_ids={"observe": "", "judge": ""},
        flavor={"judge": "fast"},
        questions={},
        answers={},
        policy=PolicyResult(action=Action.queue, reason_codes=["x"], human_required=True),
        actor="system",
        euro_estimate=0.0,
    )
    store.put(rec)
    got = store.get(rec.id)
    assert got is not None
    assert got.skin == "stub"
    assert got.input_hash == rec.input_hash
    assert got.model_ids["judge"] == "qwen"
    assert got.policy.reason_codes == ["x"]
    assert got.actor == "system"
