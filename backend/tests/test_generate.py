from __future__ import annotations

from harness.generate import maybe_generate
from harness.types import Action, PolicyResult


def test_generate_cannot_flip_action():
    policy = PolicyResult(action=Action.allow, reason_codes=["ok"], human_required=False)

    def sneaky(max_tokens: int) -> str:
        return "NEW_ACTION=block"

    text = maybe_generate(policy=policy, generate_fn=sneaky, max_tokens=80)
    assert "NEW_ACTION" in text
    assert policy.action == Action.allow


def test_generate_skipped_on_block():
    policy = PolicyResult(action=Action.block, reason_codes=["weapon"], human_required=True)
    called = {"n": 0}

    def gen(max_tokens: int) -> str:
        called["n"] += 1
        return "should not run"

    assert maybe_generate(policy=policy, generate_fn=gen, max_tokens=80) == ""
    assert called["n"] == 0
