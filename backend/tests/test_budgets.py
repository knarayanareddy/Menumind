from __future__ import annotations

import pytest

from harness.intake import IntakeError, ingest_bytes


def test_budgets_short_circuit_before_tf(tmp_path, monkeypatch):
    called = {"n": 0}

    def boom(*args, **kwargs):
        called["n"] += 1
        raise AssertionError("tf should not be called")

    monkeypatch.setattr("harness.tf_client.TFClient.complete", boom)
    with pytest.raises(IntakeError) as ei:
        ingest_bytes(b"A" * (8 * 1024 * 1024 + 50), tmp_path)
    assert ei.value.status == 413
    assert called["n"] == 0
