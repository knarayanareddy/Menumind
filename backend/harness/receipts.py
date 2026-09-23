from __future__ import annotations

import sqlite3
import uuid
from pathlib import Path

from datetime import datetime, timezone

from harness.types import Receipt


def new_id() -> str:
    return str(uuid.uuid4())


class ReceiptStore:
    def __init__(self, db_path: Path) -> None:
        self.db_path = db_path
        db_path.parent.mkdir(parents=True, exist_ok=True)
        with self._conn() as con:
            con.execute(
                """
                CREATE TABLE IF NOT EXISTS receipts (
                    id TEXT PRIMARY KEY,
                    ts TEXT NOT NULL,
                    skin TEXT NOT NULL,
                    body TEXT NOT NULL
                )
                """
            )
            con.execute(
                """
                CREATE TABLE IF NOT EXISTS reviews (
                    id TEXT PRIMARY KEY,
                    receipt_id TEXT NOT NULL,
                    ts TEXT NOT NULL,
                    actor TEXT NOT NULL,
                    name TEXT NOT NULL,
                    decision TEXT NOT NULL
                )
                """
            )

    def _conn(self) -> sqlite3.Connection:
        con = sqlite3.connect(self.db_path)
        con.row_factory = sqlite3.Row
        return con

    def put(self, receipt: Receipt) -> None:
        with self._conn() as con:
            con.execute(
                "INSERT INTO receipts (id, ts, skin, body) VALUES (?, ?, ?, ?)",
                (receipt.id, receipt.ts, receipt.skin, receipt.model_dump_json()),
            )

    def update(self, receipt: Receipt) -> None:
        with self._conn() as con:
            cur = con.execute(
                "UPDATE receipts SET ts = ?, skin = ?, body = ? WHERE id = ?",
                (receipt.ts, receipt.skin, receipt.model_dump_json(), receipt.id),
            )
            if cur.rowcount == 0:
                raise KeyError(receipt.id)

    def get(self, receipt_id: str) -> Receipt | None:
        with self._conn() as con:
            row = con.execute(
                "SELECT body FROM receipts WHERE id = ?", (receipt_id,)
            ).fetchone()
        if row is None:
            return None
        return Receipt.model_validate_json(row["body"])

    def add_review(self, receipt_id: str, *, name: str, decision: str) -> dict:
        if self.get(receipt_id) is None:
            raise KeyError(receipt_id)
        rid = new_id()
        ts = datetime.now(timezone.utc).isoformat()
        with self._conn() as con:
            con.execute(
                "INSERT INTO reviews (id, receipt_id, ts, actor, name, decision) VALUES (?, ?, ?, ?, ?, ?)",
                (rid, receipt_id, ts, "human", name, decision),
            )
        return {
            "id": rid,
            "receipt_id": receipt_id,
            "ts": ts,
            "actor": "human",
            "name": name,
            "decision": decision,
        }

    def get_reviews(self, receipt_id: str) -> list[dict]:
        with self._conn() as con:
            rows = con.execute(
                "SELECT id, receipt_id, ts, actor, name, decision FROM reviews WHERE receipt_id = ? ORDER BY ts",
                (receipt_id,),
            ).fetchall()
        return [dict(r) for r in rows]
