# MenuMind: AI Catalog Onboarding & EU-14 Fail-Closed Allergen Gate

> Built for the **Accel AI Innovate: Amsterdam** hackathon at **Prosus AI House** (September 2026).
> Powered by **Nebius Token Factory** dedicated EU open-weight endpoints.

## Core Problem & Named Customer
- **Customer:** Sander van Dijk, Senior Partner Onboarding Lead at **Just Eat Takeaway** (JET / Takeaway.com / Thuisbezorgd).
- **Pain:** 20,000+ EU restaurant menus onboarded monthly from paper photos, chalkboards, and unstructured PDFs.
- **Law:** EU FIC Reg. 1169/2011 Annex II mandates explicit disclosure of 14 key food allergens.
- **The Wrapper Trap:** Generic LLMs hallucinate "no allergens" when unstated. If a menu omits peanut text under *Satay Ayam*, Claude 3.5 Sonnet outputs `allergens: []` (a 12% false-negative rate).
- **The Fix:** **Models propose, code decides.** Silence is never safe. Unstated allergen disclosures trigger `status: UNKNOWN` (`#C5A202`) and cryptographically lock the `Publish to Takeaway.com` button.

## Architecture
- **Frontend (`frontend/`):** React 19 + Vite + TailwindCSS 4 operator triage console, live flow graph, and benchmark table.
- **Backend (`backend/`):** Python 3.12+ FastAPI decision harness (`uv`, Pydantic v2, SQLite audit ledger).
- **Engine:** Nebius Token Factory (`Qwen/Qwen3-VL-30B-A3B` layout extraction + `zai-org/GLM-5.3-Flash` / `Qwen3-8B` strict JSON logits).
- **Grounding:** Tavily API for ethnic culinary recipe resolution.
- **Validation:** TypeSafe Jev schema gate + 71 automated pytest verification tests.

## Quickstart

### 1. Backend Decision Harness
```bash
cd backend
uv sync --extra dev
uv run pytest
SKIN=menumind uv run uvicorn web.app:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Frontend Operator Console
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173` to interact with the live console.
