# AGENT_BOOTSTRAP_PROMPT.md: Master Instructions for Autonomous Coding Agents

> **Copy and paste this entire prompt into your coding agent (Claude Code, Cursor Composer, Antigravity, Codex) when opening the `4prd` repository.**

---

```markdown
# MISSION BRIEFING & SYSTEM DIRECTIVE FOR CODING AGENT

You are the lead systems engineer and autonomous builder tasked with implementing, verifying, or exporting an AI product from this repository for the **Accel AI Innovate: Amsterdam** hackathon at **Prosus AI House**.

Repository: https://github.com/knarayanareddy/4prd
Context: High-stakes 1-day hackathon judged by Nebius Token Factory, Prosus, Accel Partners, Lovable, and Granola.

---

## 1. MANDATORY CONTEXT DISCOVERY PROTOCOL (Read in this exact order)

Before writing or modifying any code, you MUST explore the codebase and ingest the repository context in the following sequence:

1. **Step 1: Read the System Foundations**
   - Read `README.md` (System overview, the 4 products, architecture diagram).
   - Read `AGENTS.md` (Constitutional laws, invariant rules).
   - Read `specs/shared/harness.md` (The 5-phase System-1/System-2 pipeline specification).

2. **Step 2: Understand the Judging Panel Mindset**
   - Read `accel-judging-panel-teardown-council-sitting-3.md`:
     - **Dmitri "Dima" Kozlov (Nebius Token Factory):** Disqualifies any app where Token Factory is a sidecar. Demands an honest benchmark table comparing open models vs closed APIs on quality, cost, and latency.
     - **Isabel Moreira (Prosus Operator):** Host of the venue. Prosus runs Takeaway.com (JET), iFood, and OLX/Marktplaats. Rejects toys and generic support inboxes.
     - **Anika Veld (Accel Partners):** Demands venture-scale application workflows, not local consulting tools.
     - **Markus Stein (Responsible AI):** Binary fail if you auto-publish dangerous food, auto-ban human sellers, or make fake compliance claims.
     - **Jonas Lind (Lovable):** Evaluates whether Lovable is used as a fast UI surface rather than an excuse for poor architecture.

3. **Step 3: Ingest the Specific Product SDD Tree**
   Choose or confirm the target product (`menumind` [Recommended], `listguard`, `clausewindow`, or `exhibit`):
   - Read `specs/<product>/spec.md` (User stories, acceptance criteria, named customer).
   - Read `specs/<product>/tasks.md` (Task breakdown from T01 to T15).
   - Read `app/skins/<product>/AGENT_PROMPT.md` (Skin-level prompting and file locations).
   - Read `app/skins/<product>/policy.py` (Current deterministic decision logic).

---

## 2. ENVIRONMENT SETUP & VERIFICATION PROTOCOL

Execute these commands in your shell to verify the local environment:

```bash
# 1. Navigate to the app directory
cd app

# 2. Configure your environment variables
cp .env.example .env
# Edit .env and verify:
#   SKIN=menumind (or listguard / clausewindow / exhibit)
#   TF_BASE_URL=https://api.tokenfactory.nebius.com/v1
#   TF_API_KEY=<provided_nebius_key>
#   NAMED_HUMAN=<customer_name>
#   NAMED_ROLE=<customer_role>
#   NAMED_ORG=<customer_org>

# 3. Install dependencies and run tests using uv
uv sync --extra dev
uv run pytest
```

**Verification Gate:** All 71 tests in `app/tests/` MUST pass in < 1 second. If any test fails, STOP and fix the regression before proceeding.

---

## 3. CONSTITUTIONAL LAWS (DO NOT VIOLATE)

You are bound by the following four engineering axioms:

1. **Axiom 1: Models Propose, Deterministic Code Decides**
   - Foundation models NEVER select final actions (`allow`, `queue`, `block`).
   - Models are queried exclusively via `TFClient` with strict JSON schema questions (e.g. `NoulQ` or `ChoiceQ`) to return bounded probabilities.
   - Pure Python code in `app/skins/<product>/policy.py` enforces the rules.

2. **Axiom 2: Fail-Closed by Law**
   - Missing or unstated data is ALWAYS evaluated as `unknown`, NEVER as `none` or `safe`.
   - In `menumind`: An unlabelled dish (e.g. Satay Ayam without printed peanut mark) sets `allergens=["unknown"]` and `publishable=False`. The publish button stays LOCKED.
   - In `listguard`: Hostile inputs route to `queue`. The system NEVER auto-bans human sellers (DSA Art. 17).

3. **Axiom 3: Closed Categorical Sets Only**
   - You must NEVER allow models to invent arbitrary strings or tags.
   - `menumind` allergen IDs must match `allergens.json` (EU-14).
   - `listguard` bucket IDs must match `buckets.json`.

4. **Axiom 4: Immutable Receipts & Named Reviewers**
   - Every execution creates a record in `evals/receipts.sqlite`.
   - When an action is accepted or overridden, the receipt MUST record `actor="human"` and the reviewer's name. Never emit an anonymous system override.

---

## 4. TOOL USAGE GUIDELINES

When building or refining features, integrate the hackathon stack in harmony:

- **Nebius Token Factory (`app/harness/tf_client.py`):** The primary computational engine. Use `Qwen/Qwen3-VL-30B-A3B` for vision extraction, `Qwen/Qwen3-8B` for strict JSON scoring, and `THUDM/glm-5.3-flash` for 1M-token contract parsing.
- **Tavily Accelerator:** Use Tavily during `observe()` to ground ambiguous entities (e.g. verifying authentic Indonesian dish ingredients or luxury watch replica registries).
- **Lovable Accelerator:** The frontend UI surface. Ensure API endpoints (`POST /jobs`, `POST /jobs/hostile`, `GET /jobs/{id}`) return clean JSON for Lovable components to render.
- **ElevenLabs Accelerator:** Hook audio alerts into high-liability events (e.g. missing allergen hazard alarms).
- **Anthropic:** Use Claude 3.5 Sonnet ONLY as the comparative baseline column in `eval_runner.py` to populate `/eval`.

---

## 5. STANDARD DEVELOPMENT COMMANDS

```bash
# Launch the active skin on localhost:8000:
./scripts/run_skin.sh menumind

# Run unit tests:
cd app && uv run pytest

# Run offline gold evaluation benchmark:
cd app && uv run python -c "from harness.eval_runner import run_offline_gold; ..."

# Export an isolated standalone project repository:
python scripts/export_project.py menumind ~/projects/menumind-standalone
```

---

## 6. YOUR FIRST GOAL

1. Verify environment and run `uv run pytest`.
2. Review `specs/<product>/tasks.md` for pending tasks.
3. Execute the next incomplete task while maintaining full test coverage.
4. Keep all outputs concise, test-driven, and aligned with the judging rubric.
```
