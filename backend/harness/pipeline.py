from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime, timezone
from typing import Any

from harness.backends.tf_json import TfJsonBackend
from harness.config import Settings
from harness.decisions import DecisionBackend, queue_forcing_answers
from harness.generate import maybe_generate
from harness.observe import passthrough
from harness.otel import SPAN_GENERATE, SPAN_JOB, SPAN_JUDGE, SPAN_OBSERVE, SPAN_POLICY, span
from harness.policy import apply_policy
from harness.prices import euro_for
from harness.receipts import ReceiptStore, new_id
from harness.tf_client import TFClient
from harness.types import Action, ObserveResult, PolicyResult, Receipt


@dataclass
class JobResult:
    id: str
    recommended: Action
    frozen_to_queue: bool
    policy: PolicyResult
    observe: ObserveResult
    answers: dict
    questions: dict
    receipt: Receipt
    generate_text: str = ""
    display: dict[str, Any] = field(default_factory=dict)
    unconfigured: bool = False
    reviews: list[dict] = field(default_factory=list)


class KillState:
    def __init__(self) -> None:
        self.frozen = False

    def toggle(self) -> bool:
        self.frozen = not self.frozen
        return self.frozen


def build_backend(settings: Settings, client: TFClient) -> DecisionBackend:
    if settings.decision_backend == "jev":
        try:
            from harness.backends.jev import JevBackend

            return JevBackend(api_key=settings.jev_api_key, base_url=settings.jev_base_url)
        except Exception:
            pass
    return TfJsonBackend(client)


def run_job(
    *,
    settings: Settings,
    skin_mod,
    payload: dict,
    input_hash: str,
    receipts: ReceiptStore,
    client: TFClient | None,
    backend: DecisionBackend | None,
    kill: KillState,
    eval_mode: bool = False,
) -> JobResult:
    questions = skin_mod.questions()
    unconfigured = not bool(settings.tf_api_key and settings.tf_base_url)

    with span(SPAN_JOB, "CHAIN", {"skin": getattr(skin_mod, "NAME", ""), "input_hash": input_hash}):
        with span(SPAN_OBSERVE, "LLM", {}):
            observe: ObserveResult = (
                skin_mod.observe(payload) if hasattr(skin_mod, "observe") else passthrough(payload)
            )
        state = dict(observe.state)
        schema_fail = False

        with span(SPAN_JUDGE, "LLM", {"unconfigured": unconfigured}):
            if unconfigured or backend is None:
                answers = queue_forcing_answers(questions)
                schema_fail = True
                state["judge_schema_fail"] = True
                state["judge_unconfigured"] = unconfigured
            else:
                answers = backend.decide(state, questions)
                schema_fail = bool(state.get("judge_schema_fail"))

        recommended = Action.queue
        frozen_to_queue = False
        with span(SPAN_POLICY, "CHAIN", {}) as policy_span:
            policy = apply_policy(skin_mod.NAME, answers, state)
            recommended = policy.action
            if kill.frozen and recommended == Action.allow and not eval_mode:
                policy = PolicyResult(
                    action=Action.queue,
                    reason_codes=list(policy.reason_codes) + ["kill_switch"],
                    human_required=True,
                    notes=policy.notes,
                )
                frozen_to_queue = True
            policy_span.set_attribute("harness.action", policy.action.value)
            policy_span.set_attribute("harness.reason_codes", ",".join(policy.reason_codes))

        gen_text = ""
        if hasattr(skin_mod, "generate") and policy.action != Action.block:
            cap = int(getattr(skin_mod, "GENERATE_MAX_TOKENS", 0) or 0)
            with span(SPAN_GENERATE, "LLM", {}):
                gen_text = maybe_generate(
                    policy=policy,
                    generate_fn=lambda max_tokens: skin_mod.generate(
                        state, answers, policy, max_tokens=max_tokens
                    ),
                    max_tokens=cap,
                )

    rid = new_id()
    judge_model = "unconfigured" if unconfigured else settings.tf_model_judge
    observe_model = observe.raw_model if observe.raw_model else ("unconfigured" if unconfigured else settings.tf_model_observe)
    receipt = Receipt(
        id=rid,
        ts=datetime.now(timezone.utc).isoformat(),
        skin=skin_mod.NAME,
        input_hash=input_hash,
        model_ids={
            "observe": observe_model,
            "judge": judge_model,
            "generate": settings.tf_model_generate if gen_text else "",
        },
        endpoint_ids={
            "observe": settings.tf_endpoint_observe,
            "judge": settings.tf_endpoint_judge,
        },
        flavor={
            "observe": "vl_or_long",
            "judge": "fast",
        },
        questions=questions,
        answers=answers,
        policy=policy,
        actor="system",
        euro_estimate=round(
            euro_for(purpose="observe", tokens_in=observe.tokens_in, tokens_out=observe.tokens_out),
            6,
        ),
        judge_schema_fail=schema_fail,
    )
    receipts.put(receipt)
    display = {}
    if hasattr(skin_mod, "display"):
        display = skin_mod.display(payload, state, answers, policy)
    return JobResult(
        id=rid,
        recommended=recommended,
        frozen_to_queue=frozen_to_queue,
        policy=policy,
        observe=observe,
        answers=answers,
        questions=questions,
        receipt=receipt,
        generate_text=gen_text,
        display=display,
        unconfigured=unconfigured,
    )


def job_from_receipt(receipt: Receipt, reviews: list[dict] | None = None) -> JobResult:
    """Rebuild a job from sqlite when RAM forgot it."""
    unconfigured = receipt.model_ids.get("judge") == "unconfigured"
    return JobResult(
        id=receipt.id,
        recommended=receipt.policy.action,
        frozen_to_queue="kill_switch" in receipt.policy.reason_codes,
        policy=receipt.policy,
        observe=ObserveResult(state={}, raw_model=receipt.model_ids.get("observe", "")),
        answers=receipt.answers,
        questions=receipt.questions,
        receipt=receipt,
        display={"title": receipt.skin, "description": ""},
        unconfigured=unconfigured,
        reviews=list(reviews or []),
    )
