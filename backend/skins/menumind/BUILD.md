# MenuMind — domain-expert multi-agent construction

You are building **only** MenuMind on the existing harness in `app/`. Phase 0 is **done**. Start at **T12**. `SKIN=menumind`. Do not implement another skin. **Publish stays disabled.**

If the tree contains indigo, Inter-as-unchoice, a URL-fetch field, or `|safe`, delete it and restart.

If the named human is a **single café owner**, stop. This skin is platform onboarding / multi-site only.

---

## 0. Multi-agent protocol

| Seat | Owns | Veto |
|---|---|---|
| **Catalog safety (Markus)** | Satay opener; unknown ≠ none; peanut FN = 0 | Empty allergen set on satay; enabling Publish |
| **Platform pitch (Anika)** | First 15s category sentence | “OCR for restaurants” |
| **Closed-set engineer (Dima)** | `allergens.json` exact 14 ids; multi-label Nouls | Invented 15th allergen; exclusive Choice for allergens |
| **Heuristic owner** | `heuristic_satay` in **code**; vegan guard in **code** | Inferring peanuts at observe-time |
| **Anti-slop (Camille)** | Kitchen tickets; UNKNOWN yellow `#C5A202` + ink + word UNKNOWN | Red pills, chalkboard, avocado, purple |
| **SecOps (Marta)** | No URL fetch; chips from enum; CSV `=+@-` escape | Raw model strings as chip labels |
| **Demo (Jonas)** | Satay photo → UNKNOWN chip → export JSON → table | Skipping satay |

**Loop:** spec → failing test → code → ORIGIN.md killed-list.

---

## 1. What already exists (do not rebuild)

| Path | Status |
|---|---|
| `app/harness/` | Phase 0 + sittings 7–8 |
| `app/skins/menumind/allergens.json` | EU-14 + animal_derived + unknown sentinel |
| `app/skins/menumind/policy.py` | injection → queue; satay heuristic; vegan+animal → diet unknown; **never live**; publishable False |
| `app/skins/menumind/__init__.py` | 14 Nouls + diet + injection; observe **does not infer** peanuts; `HOSTILE_FIXTURE=mm-inject-01`; `SATAY_FIXTURE` |
| `app/evals/menumind/gold.jsonl` | Seed satay, inject, stated-peanuts |
| UI | UNKNOWN chip class + disabled Publish already in shared templates |

---

## 2. Environment

```
SKIN=menumind
NAMED_HUMAN=...     # platform onboarding / multi-site operator
NAMED_ROLE=...
TF_MODEL_OBSERVE=<VL>
TF_MODEL_JUDGE=Qwen/Qwen3-8B
DEMO_TOKEN=
AUTO_ALLOW=0
ENV=demo
```

Observe ≠ judge. Without TF: queue + unconfigured. Still must not emit `allergens=[]` meaning none.

---

## 3. Build order

Sunday: T0 consent (**stop if café**); T1 VL+judge live; T2 photograph ≥5 menus including satay **with no allergen print**; T3 gold n≥40 items, tag peanut FN risk; T4 do not paraphrase allergen ids.

### T12 — Observe VL items JSON (passthrough exists; wire VL)

Output: `{language, items: [{name, section, price_cents, currency, raw_text, stated_allergens, allergen_info_present}]}`.

**Observe may fill `stated_allergens` only from text on the menu.** If the word is not there: `stated_allergens=[]` AND `allergen_info_present=false`. It must **not** infer peanuts from “satay”. Inference is judge + **code**.

Stop-the-line: PDF/text-only menus if VL dies. Do not cut satay or publish lock.

### T13 — Judge 14 Nouls + diet + injection

Threshold ≥0.5 → include. If `allergen_info_present < 0.5` AND no allergen Noul ≥0.5 → state `unknown`, not empty.

If 14 Nouls too slow by 12:00: amend spec/plan to peanuts/milk/gluten + `unknown`. Write the amendment. Minimum viable **safety**, not a silent cut.

### T14 — Policy (exists; lock tests)

```
if injection >= 0.5: queue all items, freeze publish
satay regex on name/raw_text AND peanuts < 0.5 AND info < 0.5
    → force unknown + reason heuristic_satay
if any item unknown or not allergen_info_present: catalog_status=queue, publish_disabled
if diet==vegan and animal allergens possible: rewrite diet=unknown in code
never catalog_status=live on Tuesday
```

Regex: `\bsatay\b|\bsate\b|\bpeanut sauce\b`.

Tests: satay ↛ empty allergens; inject ↛ publishable; vegan+milk rewritten.

Peanut FN > 0 at T16 → force unknown on `danger_foods.txt` (satay, pesto, tiramisu, gomae) and **declare the heuristic**.

### T15 — UI

- Kitchen-ticket grid. UNKNOWN chips: yellow + ink + **UNKNOWN**, weight 600.
- Publish button **visible, disabled**, label exactly: `Publish (disabled — catalog not live on Tuesday)`.
- Manual chip editor may add `peanuts`; still does not enable Publish.
- One-click hostile = `mm-inject-01`. 90s script **opens** `mm-satay-01` (Article V exception — written in spec).
- lang=`nl` on the item grid if the menu is NL.

### T16–T17 — Eval + export

Export JSON schema spec §8. `catalog_status: queue`. `publishable: false`. Escape `=+@-`.

Fail build if peanut FN > 0 on labelled rows OR any `publishable=true` on unknown. Invented allergen = 0.

### T18–T20 — Freeze

Rehearse: satay photo → unknown → export → table. First 15s: platforms, not OCR. Do not enable Publish. Do not add upsell if T16 is red.

---

## 4. Pitch constraint (Anika)

First 15s named platform/multi-site human. Last 30s: “catalog graph, sold to platforms, EU-14 as control.” Never OCR.

## 5. Tests

```
cd app && SKIN=menumind pytest -q
```

Keep `test_skins_t12.py` satay/inject/vegan cases.
