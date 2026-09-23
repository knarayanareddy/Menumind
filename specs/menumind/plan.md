# MenuMind — plan

---

## 1. Architecture

```
image/PDF → observe TF VL (items JSON, no inferred allergens)
          → judge TF JSON (14 Nouls + diet + injection)
          → code: satay heuristic, vegan guard, publish lock
          → grid UI
          → export JSON
```

TF knobs: VL observe ≠ JSON judge; dedicated if possible.

---

## 2. Stack

Same FastAPI app. `SKIN=menumind`.

Images: `fixtures/menumind/*.jpg` shot Sunday.

Observe prompt **forbids** guessing allergens. Judge may guess; policy may still force `unknown`. Satay heuristic in code always wins over a confident empty set.

---

## 3. UI

- Upload 1–3 photos
- Grid: name, price, allergen chips (UNKNOWN = yellow `#C5A202` + ink + the word UNKNOWN, never red)
- Publish button **disabled**
- Export
- Manual chip editor (human can add `peanuts`) — does not enable Publish

---

## 4. Pitch constraint (Anika)

First 15s: named **platform onboarding / multi-site** human.  
Last 30s: “catalog graph, sold to platforms, EU-14 as control.”  
Never: “OCR for restaurants.”

---

## 5. Cuts

| fail | cut |
|---|---|
| VL | PDF text-only menus |
| 14 Nouls too slow | one Choice `unknown vs stated` + 3 Nouls (peanuts, milk, gluten) **minimum viable safety** — document as spec amendment if used |
| upsell P1 | skip |
| multi-photo | one photo |

**Do not cut** fail-closed publish or the satay fixture.
