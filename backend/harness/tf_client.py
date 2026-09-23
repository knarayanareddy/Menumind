from __future__ import annotations

import time
from dataclasses import dataclass
from typing import Any, Literal

from harness import budgets
from harness.config import Settings
from harness.prices import euro_for


class TFConfigError(Exception):
    pass


class TFCallError(Exception):
    pass


@dataclass
class TFResponse:
    text: str
    model: str
    tokens_in: int
    tokens_out: int
    latency_ms: int
    euro: float


Purpose = Literal["observe", "judge", "generate"]


class TFClient:
    def __init__(self, settings: Settings) -> None:
        self.settings = settings

    def _model(self, purpose: Purpose) -> str:
        if purpose == "observe":
            return self.settings.tf_model_observe
        if purpose == "judge":
            return self.settings.tf_model_judge
        return self.settings.tf_model_generate

    def _timeout(self, purpose: Purpose) -> float:
        if purpose == "observe":
            return budgets.TF_TIMEOUT_OBSERVE_S
        return budgets.TF_TIMEOUT_JUDGE_S

    def complete(
        self,
        *,
        purpose: Purpose,
        messages: list[dict[str, Any]],
        json_schema: dict | None,
        max_tokens: int,
    ) -> TFResponse:
        if not self.settings.tf_api_key or not self.settings.tf_base_url:
            raise TFConfigError("token factory is not configured")
        from openai import OpenAI

        client = OpenAI(
            api_key=self.settings.tf_api_key,
            base_url=self.settings.tf_base_url,
            timeout=self._timeout(purpose),
        )
        kwargs: dict[str, Any] = {
            "model": self._model(purpose),
            "messages": messages,
            "max_tokens": max_tokens,
        }
        if json_schema is not None:
            kwargs["response_format"] = {
                "type": "json_schema",
                "json_schema": {
                    "name": "harness_answers",
                    "strict": True,
                    "schema": json_schema,
                },
            }
        t0 = time.perf_counter()
        try:
            resp = client.chat.completions.create(**kwargs)
        except Exception as exc:  # noqa: BLE001
            raise TFCallError(str(exc)) from exc
        latency_ms = int((time.perf_counter() - t0) * 1000)
        choice = resp.choices[0].message.content or ""
        usage = getattr(resp, "usage", None)
        tin = int(getattr(usage, "prompt_tokens", 0) or 0)
        tout = int(getattr(usage, "completion_tokens", 0) or 0)
        return TFResponse(
            text=choice,
            model=self._model(purpose),
            tokens_in=tin,
            tokens_out=tout,
            latency_ms=latency_ms,
            euro=euro_for(purpose=purpose, tokens_in=tin, tokens_out=tout),
        )
