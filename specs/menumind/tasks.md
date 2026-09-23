# MenuMind — Tasks (Supercharged Edition)

Execute in sequential order. Phase 0 is already validated in `app/`.

---

## Phase 0: Base Harness & Constitutional Law (Completed)
- [x] **T01** Shared SQLite receipts store with `actor=human` sign-off.
- [x] **T02** OpenTelemetry span collector emitting to `spans.jsonl`.
- [x] **T03** Pricing engine calculating token costs in Euros (`prices.py`).
- [x] **T04** 71/71 passing unit tests in `app/tests/`.

---

## Phase 1: Ingestion, Compaction & Token Factory Engine
- [ ] **T05** Configure `app/.env` with live Nebius Token Factory credentials:
  - `TF_MODEL_OBSERVE=Qwen/Qwen3-VL-30B-A3B`
  - `TF_MODEL_JUDGE=Qwen/Qwen3-8B`
- [ ] **T06** Wire `WinnowCompactor` into `app/skins/menumind/__init__.py` inside `observe()` to compress raw text in 1.4ms.
- [ ] **T07** Implement Tavily culinary search fallback in `observe()` for dishes matching `DANGER_FOODS` without explicit ingredient text.
- [ ] **T08** Connect `Qwen3-8B` to score EU-14 allergens via strict JSON schema questions (`questions()`).

---

## Phase 2: Fail-Closed Decision Policy & FlowGraph DAG
- [ ] **T09** Enforce strict FIC Reg 1169/2011 rule in `app/skins/menumind/policy.py`:
  - If `satay` or `peanut sauce` detected and `peanuts` not explicitly stated $\rightarrow$ force `allergens=["unknown"]`, `allergen_info_present=False`, reason `heuristic_satay`.
  - Disallow any code path from setting `publishable=True`.
- [ ] **T10** Wire `FlowGraph` DAG state machine in `pipeline.py` to record transitions: `intake` $\rightarrow$ `winnow_compaction` $\rightarrow$ `tf_judge` $\rightarrow$ `satay_trip` $\rightarrow$ `publish_locked`.
- [ ] **T11** Hook ElevenLabs audio notification: Trigger a short audio alert on `heuristic_satay` or `injection_or_jailbreak` events.

---

## Phase 3: Lovable UI & Operator Console
- [ ] **T12** Update `app/web/templates/home.html` and Lovable React client:
  - Add dark slate layout with high-contrast safety yellow (`#C5A202`) `UNKNOWN` allergen chips.
  - Render disabled `Publish to Takeaway.com` button with lock icon.
  - Embed live Mermaid state diagram visualizer (`agent-flow --mermaid`).

---

## Phase 4: Comparative Benchmarks & Eval Table
- [ ] **T13** Run all 17 gold fixtures in `app/evals/menumind/gold.jsonl` against Nebius Token Factory and Claude 3.5 Sonnet.
- [ ] **T14** Verify that `mm-satay-01` produces 0% false negatives (locked) and `mm-inject-01` produces 0% allow pass-through.
- [ ] **T15** Verify that `/eval` renders the 3-column comparative benchmark table proving 30× cost reduction and sub-100ms latency.
