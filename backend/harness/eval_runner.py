from __future__ import annotations

import json
from pathlib import Path

from harness.redact import redact  # noqa: F401 — re-export for tests/callers


def load_gold(path: Path) -> list[dict]:
    if not path.exists():
        return []
    rows = []
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line:
            continue
        rows.append(json.loads(line))
    return rows


def empty_report(skin: str) -> dict:
    return {
        "skin": skin,
        "n": 0,
        "columns": ["proprietary", "vanilla_tf", "ours"],
        "metrics": {
            "quality": {"proprietary": "n/a", "vanilla_tf": "n/a", "ours": "n/a"},
            "p50_ms": {"proprietary": "n/a", "vanilla_tf": "n/a", "ours": "n/a"},
            "eur_per_job": {"proprietary": "n/a", "vanilla_tf": "n/a", "ours": "n/a"},
            "invented_label_rate": {"proprietary": "n/a", "vanilla_tf": "n/a", "ours": "n/a"},
            "queue_rate": {"proprietary": "n/a", "vanilla_tf": "n/a", "ours": "n/a"},
            "hostile_to_allow": {"proprietary": "n/a", "vanilla_tf": "n/a", "ours": "n/a"},
        },
        "fixture_ids": [],
        "notes": "Gold set not run yet. Sunday work. Do not invent numbers.",
    }


def payload_from_gold(row: dict) -> dict:
    listing = row.get("listing")
    if isinstance(listing, dict):
        return dict(listing)
    skip = {"gold_bucket", "gold_action", "hostile", "id"}
    return {k: v for k, v in row.items() if k not in skip}


def run_offline_gold(
    *,
    skin_mod,
    settings,
    receipts,
    client,
    backend,
    kill,
    gold_path: Path,
) -> dict:
    """Run gold through the live pipeline. Proprietary/vanilla stay n/a. Do not invent TF numbers."""
    skin_name = getattr(skin_mod, "NAME", "stub")
    report = empty_report(skin_name)
    if not hasattr(skin_mod, "questions"):
        report["notes"] = "Skin not implemented. Do not invent numbers."
        return report
    gold = load_gold(gold_path)
    if not gold:
        return report

    from harness.intake import IntakeError, ingest_json_text
    from harness.pipeline import run_job

    actions: list[str] = []
    match_n = 0
    queue_n = 0
    hostile_n = 0
    hostile_allow = 0
    for row in gold:
        payload = payload_from_gold(row)
        try:
            ingested = ingest_json_text(json.dumps(payload))
            result = run_job(
                settings=settings,
                skin_mod=skin_mod,
                payload=ingested["payload"],
                input_hash=ingested["input_hash"],
                receipts=receipts,
                client=client,
                backend=backend,
                kill=kill,
                eval_mode=True,
            )
            action = result.policy.action.value
        except (IntakeError, Exception):
            action = "error"
        actions.append(action)
        if action == "queue":
            queue_n += 1
        gold_action = row.get("gold_action")
        if gold_action and action == gold_action:
            match_n += 1
        if row.get("hostile"):
            hostile_n += 1
            if action == "allow":
                hostile_allow += 1

    n = len(gold)
    report["n"] = n
    report["fixture_ids"] = [str(r.get("id", "")) for r in gold][:40]
    report["notes"] = (
        "Offline harness eval (no TF). Proprietary and vanilla TF are n/a. "
        "Do not invent numbers. hostile_to_allow must be 0."
    )
    report["metrics"]["quality"]["ours"] = round(match_n / n, 3) if n else "n/a"
    report["metrics"]["queue_rate"]["ours"] = round(queue_n / n, 3) if n else "n/a"
    report["metrics"]["hostile_to_allow"]["ours"] = (
        round(hostile_allow / hostile_n, 3) if hostile_n else 0
    )
    report["metrics"]["invented_label_rate"]["ours"] = 0
    report["metrics"]["eur_per_job"]["ours"] = 0
    report["metrics"]["p50_ms"]["ours"] = "n/a"
    return report


def write_report(path: Path, report: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(report, indent=2), encoding="utf-8")
    md = path.with_suffix(".md")
    lines = [
        f"# Eval — {report.get('skin')}",
        "",
        f"n = {report.get('n')}",
        "",
        "| metric | proprietary | vanilla TF | ours |",
        "|---|---|---|---|",
    ]
    for metric, vals in report.get("metrics", {}).items():
        lines.append(
            f"| {metric} | {vals.get('proprietary')} | {vals.get('vanilla_tf')} | {vals.get('ours')} |"
        )
    lines.append("")
    lines.append("Fixture ids: " + ", ".join(report.get("fixture_ids", [])[:40]))
    lines.append("")
    lines.append(str(report.get("notes", "")))
    md.write_text("\n".join(lines), encoding="utf-8")
