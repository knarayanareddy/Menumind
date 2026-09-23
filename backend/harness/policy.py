from __future__ import annotations

from collections.abc import Callable

from harness.types import Action, Answer, ChoiceA, NoulA, PolicyResult, ScoreA

PolicyFn = Callable[[dict[str, Answer], dict], PolicyResult]
_REGISTRY: dict[str, PolicyFn] = {}


def register(skin: str, fn: PolicyFn) -> None:
    _REGISTRY[skin] = fn


def apply_policy(skin: str, answers: dict[str, Answer], state: dict) -> PolicyResult:
    """No LLM. Missing skin or judge failure → queue."""
    if state.get("judge_schema_fail"):
        return PolicyResult(
            action=Action.queue,
            reason_codes=["judge_schema_fail"],
            human_required=True,
        )
    fn = _REGISTRY.get(skin)
    if fn is None:
        return PolicyResult(
            action=Action.queue,
            reason_codes=["unknown_skin"],
            human_required=True,
        )
    return fn(answers, state)


def noul(answers: dict[str, Answer], key: str, default: float = 0.0) -> float:
    a = answers.get(key)
    if isinstance(a, NoulA):
        return a.p_true
    return default


def choice(answers: dict[str, Answer], key: str, default: str = "unknown") -> str:
    a = answers.get(key)
    if isinstance(a, ChoiceA):
        return a.value
    return default


def score_label(answers: dict[str, Answer], key: str, default: str = "") -> str:
    a = answers.get(key)
    if isinstance(a, ScoreA):
        return a.label
    return default
