# Agent prompt — MenuMind only

Copy everything below the line into a **new session** whose working directory is this repository.

---

You are the **MenuMind** build agent. This repository is a shared Accel AI Innovate workspace: one Python harness, four product skins. **Your job is MenuMind only.** Do not implement ListGuard, ClauseWindow, or the Exhibit *skin*. Pack export may stay. **Publish stays disabled.** There is no Tuesday path that sets a catalog to `live`.

If the named human is a **single café owner**, stop. This product is platform onboarding / multi-site only.

## Explore first

Read **in this order**:

1. `app/skins/menumind/ORIGIN.md`
2. `app/skins/menumind/BUILD.md`
3. `specs/constitution.md`
4. `specs/shared/harness.md`
5. `specs/design/MASTER.md`
6. `specs/security/owasp-threat-model.md`
7. `specs/menumind/spec.md` then `plan.md` then `tasks.md`
8. `app/skins/menumind/` (`allergens.json`, `policy.py`, `__init__.py`)
9. `app/README.md`

## What is already present

- Shared harness + paper/ink operator UI. Phase 0 **done**.
- MenuMind T12 **started**: EU-14 `allergens.json` (do not paraphrase ids), 14 Nouls + diet + injection, observe **does not infer peanuts from “satay”**, policy with `heuristic_satay`, vegan guard, `publishable=False`, `HOSTILE_FIXTURE=mm-inject-01`, `SATAY_FIXTURE` for the 90s opener.
- Seed gold: `app/evals/menumind/gold.jsonl` (satay, inject, stated-peanuts). Not n≥40 items yet.
- Shared UI already has UNKNOWN chip (yellow `#C5A202` + ink + word UNKNOWN) and a disabled Publish button. **Not red pills.**
- Tests: `cd app && pytest -q` (`test_skins_t12.py`: satay ↛ empty allergens; inject ↛ publishable; vegan+milk rewritten).
- Set `SKIN=menumind`.

## How to proceed

Staff as catalog safety (Markus) + Anika pitch + closed-set engineer + heuristic owner + Camille + SecOps (see `BUILD.md`). Spec → failing test → code.

1. `cp app/.env.example app/.env`. `SKIN=menumind`. VL observe ≠ JSON judge. Named human = platform / multi-site. Never commit `.env`.
2. Sunday: photograph ≥5 menus including satay **with no printed allergen**. Pad gold to n≥40 items; tag peanut FN risk rows.
3. T12–T13: wire TF VL observe to the existing schema. Observe fills `stated_allergens` **only from printed text**. If 14 Nouls are too slow by 12:00, amend `plan.md` to peanuts/milk/gluten + unknown — do not silently cut safety. Do not cut satay or the publish lock.
4. T14: keep satay regex `\bsatay\b|\bsate\b|\bpeanut sauce\b` in **code**. Missing info → `unknown`, never `[]` meaning none. Peanut FN > 0 → `danger_foods.txt` heuristic and **declare it**.
5. T15: kitchen-ticket grid, not a recipe blog. No chalkboard/avocado/purple. Manual chips may add `peanuts` and still must not enable Publish. Label: `Publish (disabled — catalog not live on Tuesday)`.
6. **Article V exception (written):** 90s demo **opens** `mm-satay-01` (physical harm). One-click hostile remains `mm-inject-01` and is in gold, never publishable. Do not “fix” this back to inject-first.
7. Export JSON spec §8; escape cells starting `=+@-`. Fail build if peanut FN > 0 or `publishable=true` on unknown. Invented allergen = 0.
8. Pitch: first 15s named platform human; last 30s “catalog graph, sold to platforms, EU-14 as control.” Never “OCR for restaurants.”

## Hard rules

- Token Factory is the engine. Models propose; code decides. Closed EU-14.
- Never fetch user URLs. No `|safe`. DEMO_TOKEN empty if set.
- Without TF: queue + `judge=unconfigured`. Still must not emit empty-set “no allergens.”
- Do not enable Publish. Do not auto-push to Thuisbezorgd/JET/iFood. Do not build another skin.

## Done when

`SKIN=menumind pytest -q` green; satay → UNKNOWN not empty; inject not publishable; Publish disabled in the UI; 90s script satay → export → `/eval`; first 15s is platforms, not OCR.
