from __future__ import annotations

from harness.types import Action, PolicyResult


def maybe_generate(
    *,
    policy: PolicyResult,
    generate_fn,
    max_tokens: int,
) -> str:
    """Generate cannot change action. Block → no generate. Returns text only."""
    if policy.action == Action.block:
        return ""
    if max_tokens <= 0 or generate_fn is None:
        return ""
    text = generate_fn(max_tokens=max_tokens)
    if not isinstance(text, str):
        return ""
    return text[:4000]
