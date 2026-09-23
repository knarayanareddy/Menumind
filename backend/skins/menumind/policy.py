"""Catalog safety. Missing allergen means unknown, never none. Publish stays off."""

from __future__ import annotations

import json
import re
from pathlib import Path

from harness.policy import choice, noul
from harness.types import Action, Answer, PolicyResult

_ALLERGENS = json.loads((Path(__file__).parent / "allergens.json").read_text(encoding="utf-8"))
EU14 = list(_ALLERGENS["ids"])
ANIMAL = set(_ALLERGENS["animal_derived"])
SATAY = re.compile(r"\bsatay\b|\bsate\b|\bpeanut sauce\b", re.I)
_DANGER_FOODS = tuple(
    line.strip().casefold()
    for line in (Path(__file__).parent / "danger_foods.txt").read_text(encoding="utf-8").splitlines()
    if line.strip() and not line.lstrip().startswith("#")
)
DANGER_FOODS = re.compile(r"(?:" + "|".join(re.escape(x) for x in _DANGER_FOODS) + r")", re.I)


def _text(state: dict) -> str:
    parts = [str(state.get("name") or ""), str(state.get("raw_text") or ""), str(state.get("text") or "")]
    for item in state.get("items") or []:
        if isinstance(item, dict):
            parts.append(str(item.get("name") or ""))
            parts.append(str(item.get("raw_text") or ""))
    return " ".join(parts)


def policy_menumind(answers: dict[str, Answer], state: dict) -> PolicyResult:
    inj = noul(answers, "injection")
    info = noul(answers, "allergen_info_present")
    diet = choice(answers, "diet", default="unknown")
    present = [aid for aid in EU14 if noul(answers, aid) >= 0.5]
    text = _text(state)
    reasons: list[str] = []

    if inj >= 0.5:
        return PolicyResult(
            action=Action.queue,
            reason_codes=["injection_or_jailbreak"],
            human_required=True,
            notes="publish_disabled",
        )

    if SATAY.search(text) and "peanuts" not in present and info < 0.5:
        reasons.append("heuristic_satay")
        present = []
        info = 0.0
    elif DANGER_FOODS.search(text) and not present and info < 0.5:
        reasons.append("heuristic_danger_food")
        present = []
        info = 0.0

    if diet == "vegan" and (set(present) & ANIMAL or info < 0.5):
        diet = "unknown"
        reasons.append("vegan_guard")
        state["diet"] = diet

    unknown = info < 0.5 and not present
    if unknown:
        reasons.append("allergen_unknown")
        state["allergens"] = ["unknown"]
        state["allergen_info_present"] = False
    else:
        state["allergens"] = present
        state["allergen_info_present"] = info >= 0.5

    state["publishable"] = False
    state["catalog_status"] = "queue"
    if not reasons:
        reasons.append("catalog_queue")
    return PolicyResult(
        action=Action.queue,
        reason_codes=reasons,
        human_required=True,
        notes="Publish disabled — catalog not live on Tuesday.",
    )
