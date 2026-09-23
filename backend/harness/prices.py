"""€ / million tokens. Edit Tuesday morning from the TF console. Do not invent live numbers."""

# Placeholder until console prices are pasted. Eval will still compute using these.
PER_MTOK_EUR = {
    "observe_in": 0.40,
    "observe_out": 1.20,
    "judge_in": 0.05,
    "judge_out": 0.20,
    "generate_in": 0.10,
    "generate_out": 0.30,
}


def euro_for(*, purpose: str, tokens_in: int, tokens_out: int) -> float:
    pin = PER_MTOK_EUR.get(f"{purpose}_in", 0.10)
    pout = PER_MTOK_EUR.get(f"{purpose}_out", 0.30)
    return (tokens_in / 1_000_000.0) * pin + (tokens_out / 1_000_000.0) * pout
