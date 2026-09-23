# MenuMind — how this idea was conceived, and what it survived

**This file is for an agent in a MenuMind-only session.** Do not reopen killed ideas. Do not turn this into ListGuard, ClauseWindow, or Exhibit. Do not ship a second skin.

Source of truth (read in this order before writing code):

1. `specs/constitution.md`
2. `specs/shared/harness.md`
3. `specs/design/MASTER.md`
4. `specs/security/owasp-threat-model.md`
5. `specs/menumind/spec.md` → `plan.md` → `tasks.md`
6. This file + `BUILD.md`

If code disagrees with a spec, the spec wins until you change the spec first (Article IX).

---

## 1. Conception

Onboarding restaurants onto delivery networks is still humans typing from PDFs and chalkboards. Allergen law (FIC Reg. 1169/2011 Annex II) is unforgiving. Models that invent “no allergens” create **physical harm**.

**Job:** photo or PDF in → item grid with prices, diet flags, **EU-14 multi-label or unknown** → JSON export. Missing allergen info ≠ none. Publish is fail-closed. **There is no Tuesday path that sets a catalog to live.**

**Wedge:** EU-14 + delivery platform onboarding. **Category:** menu → commerce graph (sold to **platforms**, not “OCR for restaurants”).

**Why now:** native multimodal open models on TF cheap enough for every onboarding. Closed allergen set so a model cannot emit a 15th allergen or “none” from silence.

Conceived as Accel AI Innovate Amsterdam (23 Sep 2026). Anika-risk: if the first 15 seconds sound like OCR, you lose. Pitch catalog graph to platforms.

---

## 2. What the jury did to it

Survived as rank 4 — **only** if the named human is platform onboarding / multi-site restaurant, **not a café owner**. If the only human is a café, **stop and do not build this skin** (tasks T0). In *this* session we assume that gate passed.

| Seat | What they did |
|---|---|
| **Anika** | First 15s: named **platform / multi-site** human. Last 30s: catalog graph, EU-14 as control. Never “OCR for restaurants.” |
| **Markus** | Satay with no printed allergen is the opener (**physical harm > injection**). Article V exception: 90s script opens `mm-satay-01`; one-click hostile remains `mm-inject-01`; inject is in gold and never publishable. |
| **Camille** | Kitchen-ticket grid, not a recipe blog. UNKNOWN chip = yellow `#C5A202` + **ink** + the word UNKNOWN, weight 600. **Not red pills.** Publish visible and **disabled**. No chalkboard, avocado, terracotta wellness. |
| **Dima** | Closed EU-14. Invented allergen string = P0 bug. Multi-label (not exclusive Choice). |
| **Jonas** | Hold export JSON. Satay row readable without a tooltip. Not-publishable rail = saffron, not a red wash. |
| **Priya** | n≥40 **items**. Peanut-class false-negative = 0. Publishable=true on unknown = 0. |
| **Marta** | No fetch-menu-from-URL. Chips from our enum, not raw model strings. Export cells cannot start with `=+@-` unescaped. |
| **Kenji** | If 14 Nouls are too slow: spec amendment to peanuts/milk/gluten + unknown — **write the amendment in plan.md**. Do not cut fail-closed publish or satay. |

**Killed:** auto-publish to Thuisbezorgd/JET/iFood, POS sync, guessing handwritten prices, calories/CO₂, consumer diet app, enabling Publish on Tuesday.

---

## 3. Sittings that already happened (do not re-litigate)

| Sitting | Outcome for MenuMind |
|---|---|
| Judging-panel teardown | Fail-closed allergens. Irreversible publish → does not exist Tuesday. |
| Security/UX | Empty allergen set is LLM07 (safety), not only XSS. |
| Sitting 6–8 | Harness Phase 0 **done**. Pack layer available. Honest unconfigured judge. |
| Sitting 9 | Plan’s “red unknown chips” **failed** Camille — yellow+ink. Satay opener written as Article V exception. Seeds `mm-satay-01`, `mm-inject-01`. Skip T5–T11. |

---

## 4. Monday 18:00 (resolved for this session)

This session **is** MenuMind. If you discover the named human is a single café, stop. Do not quietly become ListGuard in this folder.

---

## 5. Risk-tier sentence (footer, unchanged)

> Limited-risk decision support for catalog onboarding. Missing allergen means unknown, never none. Nothing goes live without a human. A missed peanut is treated as a product bug.
