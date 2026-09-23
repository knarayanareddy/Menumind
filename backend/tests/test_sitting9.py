from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
EVALS = ROOT / "evals"


def _ids(skin: str) -> set[str]:
    path = EVALS / skin / "gold.jsonl"
    rows = [json.loads(line) for line in path.read_text(encoding="utf-8").splitlines() if line.strip()]
    return {str(r.get("id", "")) for r in rows}


def test_listguard_seed_ids():
    ids = _ids("listguard")
    for fid in ("lg-inject-01", "lg-ok-bike-01", "lg-fake-rolex-01", "lg-weapon-text-01", "lg-pii-01"):
        assert fid in ids


def test_clausewindow_seed_ids():
    ids = _ids("clausewindow")
    assert "cw-inject-01" in ids
    assert "cw-trap-schedule4-01" in ids


def test_menumind_seed_ids():
    ids = _ids("menumind")
    assert "mm-satay-01" in ids
    assert "mm-inject-01" in ids


def test_exhibit_seed_ids():
    ids = _ids("exhibit")
    assert "ex-inject-01" in ids


def test_unimplemented_skins_name_hostile_id():
    from skins import clausewindow, exhibit, listguard, menumind

    assert listguard.IMPLEMENTED is True
    assert listguard.HOSTILE_FIXTURE_ID == "lg-inject-01"
    assert clausewindow.HOSTILE_FIXTURE_ID == "cw-inject-01"
    assert menumind.HOSTILE_FIXTURE_ID == "mm-inject-01"
    assert exhibit.HOSTILE_FIXTURE_ID == "ex-inject-01"
