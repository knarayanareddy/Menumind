# AGENTS.md: Operational Directives for AI Coding Agents

> **Audience:** Autonomous Coding Agents (Antigravity, Claude Code, Cursor, Codex).  
> **Mission:** Build, test, refine, or export any of the four products in `4PRD` with zero architectural deviation and strict compliance with the project constitution.

---

## 1. Prime Directives (Non-Negotiable Constitution)

1. **Axiom 1: Models Propose, Deterministic Code Decides**
   - You must NEVER write code where a foundation model directly calls external mutation tools (e.g. publishing to a database, banning a user, or executing an order) based on conversational output.
   - The model must ALWAYS be queried via `TFClient` with strict JSON schema questions (e.g. `NoulQ` or `ChoiceQ`).
   - The categorical scores returned by the model must be evaluated inside pure Python functions in `app/skins/<product>/policy.py`.

2. **Axiom 2: Fail-Closed by Law**
   - Missing or ambiguous information is strictly evaluated as `unknown`, NEVER as `safe` or `none`.
   - In `menumind`: An item without stated allergens has `allergen_info_present = False` and `allergens = ["unknown"]`. `publishable = False`.
   - In `listguard`: An ambiguous listing routes to `action = Action.queue`, never `Action.allow`.
   - In `clausewindow`: Playbook deviation flags `action = Action.queue` with reason `playbook_walkaway`.

3. **Axiom 3: Closed Categorical Sets**
   - Foundation models frequently invent categories or hallucinate labels. You must enforce closed categorical sets:
     - `menumind`: Exactly the 14 allergens specified in `allergens.json` (EU FIC Annex II). Any other string is a P0 bug.
     - `listguard`: Exactly the buckets defined in `buckets.json`.
     - `clausewindow`: Exactly the topic IDs defined in `topics.json`.

4. **Axiom 4: Immutable Receipts & Reviewer Identity**
   - Every execution creates a record in `evals/receipts.sqlite`.
   - When a human accepts or overrides an action, the receipt's actor must be stamped with `actor="human"` and the reviewer's name (from `NAMED_HUMAN`). Never emit an anonymous system override.

---

## 2. Directory Navigation for Agents

When instructed to work on a specific product, navigate to its dedicated specification tree and skin directory:

| Product | Specification & Tasks | Implementation Skin | Gold Benchmarks |
| :--- | :--- | :--- | :--- |
| **MenuMind** | `specs/menumind/` (`spec.md`, `tasks.md`) | `app/skins/menumind/` | `app/evals/menumind/gold.jsonl` |
| **ListGuard** | `specs/listguard/` (`spec.md`, `tasks.md`) | `app/skins/listguard/` | `app/evals/listguard/gold.jsonl` |
| **ClauseWindow** | `specs/clausewindow/` (`spec.md`, `tasks.md`) | `app/skins/clausewindow/` | `app/evals/clausewindow/gold.jsonl` |
| **Exhibit** | `specs/exhibit/` (`spec.md`, `tasks.md`) | `app/skins/exhibit/` | `app/evals/exhibit/gold.jsonl` |

The shared decision harness is located in `app/harness/`. **Do not modify the shared harness** unless you are fixing a cross-cutting bug that affects all skins.

---

## 3. Standard Agent Workflow: Extending a Product

When assigned a task for a product (e.g. implementing a new feature in `tasks.md`):

1. **Step 1: Check Acceptance Criteria in `spec.md`**
   - Read the corresponding User Story in `specs/<product>/spec.md`.
2. **Step 2: Implement within the Skin**
   - Add extraction fields in `app/skins/<product>/__init__.py` under `observe()`.
   - Add categorical questions in `questions()`.
   - Add policy decisions in `app/skins/<product>/policy.py`.
3. **Step 3: Run the Test Suite**
   - Execute:
     ```bash
     cd app && uv run pytest tests/test_skins_t12.py
     ```
   - Ensure all tests pass with 0 failures and 0 regressions.
4. **Step 4: Verify Against Gold Benchmarks**
   - Run the offline eval:
     ```bash
     SKIN=<product> uv run python -c "from harness.eval_runner import run_offline_gold; ..."
     ```
   - Confirm that hostile injection fixtures (`*-inject-01`) NEVER produce an `allow` recommendation.

---

## 4. How to Export an Isolated Standalone Repo

If the user asks: *"Extract MenuMind into its own standalone repository"*:
Execute:
```bash
python scripts/export_project.py <skin_name> <destination_path>
```
The export tool bundles:
- The standalone product code and assets
- The entire `harness/`, `web/`, and `tests/` directory
- A customized `pyproject.toml` and `.env.example` pre-configured for that skin
- Initializes a fresh Git repository ready for GitHub push
