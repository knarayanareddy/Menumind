from __future__ import annotations

from harness.types import ObserveResult


def passthrough(state: dict, model: str = "none") -> ObserveResult:
    """Default observe: do not call TF. Skins replace this."""
    return ObserveResult(state=state, raw_model=model, tokens_in=0, tokens_out=0, latency_ms=0)
