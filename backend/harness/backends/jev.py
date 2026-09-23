from __future__ import annotations

import json
import logging
import os
import httpx

from harness import budgets
from harness.decisions import coerce_answers, queue_forcing_answers
from harness.types import Answer, Question

logger = logging.getLogger(__name__)

LOCAL_LAYA_URL = "http://127.0.0.1:5123/v1"
CLOUD_JEV_URL = "https://api.typesafe.ai/v1"


class JevBackend:
    """Jev & Laya-MLX System 1 Decision Backend.

    Routes typed categorical questions to:
    1. Local Apple Silicon Metal Laya-MLX (port 5123) for sub-30ms offline inference.
    2. Cloud TypeSafe Jev API (api.typesafe.ai) via JEV_API_KEY.
    3. Fail-closed queue_forcing_answers on timeout or error.
    """

    name = "jev"

    def __init__(self, api_key: str = "", base_url: str = "") -> None:
        self.api_key = api_key or os.environ.get("JEV_API_KEY", "")
        self.base_url = base_url or os.environ.get("JEV_BASE_URL", CLOUD_JEV_URL)

    def decide(self, state: dict, questions: dict[str, Question]) -> dict[str, Answer]:
        # Try local Apple Silicon Metal Laya-MLX first
        try:
            with httpx.Client(timeout=0.8) as client:
                resp = client.post(
                    f"{LOCAL_LAYA_URL}/decide",
                    json={"state": state, "questions": {k: q.model_dump() for k, q in questions.items()}},
                )
                if resp.status_code == 200:
                    raw = resp.json()
                    if isinstance(raw, dict):
                        return coerce_answers(raw, questions)
        except Exception:
            pass

        # Try Cloud TypeSafe Jev API
        if self.api_key:
            try:
                headers = {
                    "Authorization": f"Bearer {self.api_key}",
                    "Content-Type": "application/json",
                }
                payload = {
                    "model": "jev-latest",
                    "state": state,
                    "questions": {k: q.model_dump() for k, q in questions.items()},
                }
                with httpx.Client(timeout=budgets.TF_TIMEOUT_JUDGE_S) as client:
                    resp = client.post(
                        f"{self.base_url}/decide",
                        json=payload,
                        headers=headers,
                    )
                    if resp.status_code == 200:
                        raw = resp.json()
                        if isinstance(raw, dict) and "answers" in raw:
                            return coerce_answers(raw["answers"], questions)
                        if isinstance(raw, dict):
                            return coerce_answers(raw, questions)
            except Exception as e:
                logger.warning(f"Jev API call failed: {e}")

        # Fail-closed default
        return queue_forcing_answers(questions)
