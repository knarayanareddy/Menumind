# DESIGN.md — persisted design system
## UI UX Pro Max lockfile (do not let the model re-roll this)

Owner: **Camille Voss** (UI/UX, anti-slop)  
Method: UI UX Pro Max — industry rules + anti-patterns, then **persist**.  
If a later agent “makes it pop,” it has violated this file.

These three products are **operator instruments**, not consumer SaaS, not crypto, not wellness. They share one chrome family so a single FastAPI app can switch skins without a theme rewrite. Each skin has a **signal colour** used only for status, never as a gradient wash.

---

## 0. Banned (AI slop fingerprint)

If any of these appear in a PR, reject it.

- Purple, indigo, violet, fuchsia, “AI” lilac (`#7C3AED`, `#8B5CF6`, `#6366F1`, `#A78BFA`, `#C084FC`)
- Purple→blue or aurora gradients, mesh gradients, glassmorphism, glow, neon
- Inter, Roboto, Poppins, Arial, Space Grotesk, Nunito as the **unintentional** default
- Three feature cards with thin-line icons in the demo UI
- Hero, CTA “Get started”, emoji as icons, 3D blobs, isometric “AI brain”
- `rounded-2xl` / 16–24px radius as the default
- Gray-200 border + soft shadow on every card
- Dark mode for its own sake
- “Shield / padlock / sparkle” as brand
- Centered marketing layout for an operator tool
- Copy: “unleash”, “supercharge”, “powered by AI”, “magic”

**Inter is not evil.** It is the *un-choice*. We chose something else.

---

## 1. Product types (Pro Max industry mapping)

| Skin | Product type | Style priority | Mood | Anti-patterns extra |
|---|---|---|---|---|
| Shared chrome | Internal ops tool | Swiss / industrial / dense | Quiet, paper, ink | Playful fonts, neon, gamification |
| ListGuard | Trust & safety console | Dense operational | Newsroom / intake desk | Cyber-green matrix, purple SOC, skull icons |
| ClauseWindow | Legal document bench | Editorial, paper | Clerk’s desk | “AI lawyer” robot, glass cards, gradient Analyze |
| MenuMind | Catalog production (B2B onboarding) | Production / ticket printer | Kitchen rail, not Instagram | Chalkboard script, avocado, terracotta wellness, foodie stock photos |
| Exhibit | Evidence pack / clerk file | Editorial document | Quiet paper, limitations first | Neon trace waterfall, “compliant” toast, purple observability |

We are **not** “SaaS landing”. Pattern = **console + work surface**, not bento marketing.

---

## 2. Shared tokens

```css
:root {
  /* paper + ink — warm, not Tailwind slate */
  --paper: #F3EFE7;
  --paper-2: #E8E2D6;
  --ink: #1C1915;
  --ink-soft: #5C564C;
  --rule: rgba(28, 25, 21, 0.14);
  --rule-strong: rgba(28, 25, 21, 0.4);

  /* status — never rely on colour alone; always a word */
  --queue: #A15C07;     /* ochre */
  --block: #9B2C1F;     /* oxide */
  --allow: #3F5A2A;     /* dry olive — NOT mint, NOT neon green */
  --unknown: #C5A202;   /* signal yellow for “unknown allergen” chips, ink text on it */

  --focus: #1C1915;
  --radius: 2px;
  --space: 8px;
  --font-ui: "IBM Plex Sans", "Noto Sans", sans-serif;
  --font-mono: "IBM Plex Mono", ui-monospace, monospace;
  --font-doc: "Source Serif 4", "Iowan Old Style", "Georgia", serif;
}
```

Self-host or Google Fonts **IBM Plex Sans (400/500/600)**, **IBM Plex Mono (400/500)**, **Source Serif 4 (600)** for ClauseWindow titles only.

Why this pairing (Pro Max typography rules):
- Plex is an **instrument** face (IBM), tabular figures, not startup.
- Distinct from Inter’s fingerprint.
- Source Serif 4 only on legal document titles — editorial, not decorative script.

**Radius 2px.** Borders 1px `--rule`. **No drop shadows.** No gradients.

Spacing: 8px grid. Operator-dense: cards padding 12–16px, not 32.

---

## 3. Colour use (WCAG)

- Body text `ink` on `paper` — well above AA.
- `--ink-soft` only for meta (timestamps), never for primary labels.
- Status: **word + colour**. ALLOW / QUEUE / BLOCK in Plex Mono 11px uppercase tracking. Colourblind-safe because of the word.
- Do not put red body text on oxide backgrounds. Block chip = oxide **border** + oxide **word**, paper fill.
- Unknown allergen chip = `--unknown` background + `ink` text (ISO-ish warning, not pastel pill). Contrast check: `#1C1915` on `#C5A202` passes AA for large/bold; use font-weight 600.

Skin accents (1% of pixels):
- ListGuard: oxide + ochre only on action chips.
- ClauseWindow: walkaway underline in oxide; aligned = ink; no navy wash.
- MenuMind: saffron `#C2410C` only on “not publishable” rail, not as a header bar.

---

## 4. Layout (all skins)

```
┌─────────────────────────────────────────────────────────┐
│  wordmark (plain text)     skin     kill     /eval      │  40px, paper-2, 1px rule bottom
├───────────────┬─────────────────────────────────────────┤
│               │                                         │
│  INTAKE       │  WORK SURFACE                           │
│  320px        │  cards / heatmap / grid                 │
│  drop / paste │                                         │
│               │                                         │
├───────────────┴─────────────────────────────────────────┤
│  receipt strip: id · models · € · ms                    │  mono 12px
└─────────────────────────────────────────────────────────┘
```

- No sidebar icons. Text nav.
- Wordmark is the product name in Plex, weight 500, no logo SVG.
- Kill switch is a **real switch** with a label “Recommendations frozen” — not a cute power icon.
- `/eval` is a **table**, not charts. Tabular lining via Plex Mono. No Recharts candy.

Empty intake: one line. “Drop a listing screenshot or paste JSON.” No illustration.

Loading: a mono line `observing…` / `judging…` with elapsed ms. No skeleton shimmer (shimmer = slop).

Error: ink on paper, the sentence, what to do. No toast stack.

---

## 5. Motion

- Default: **none**.
- `prefers-reduced-motion: reduce` respected (there is nothing to reduce).
- Kill switch: instant. No 300ms “smooth”.
- New card: no bounce.

---

## 6. Copy (voice)

Operator English. Short. No marketing.

| Don’t | Do |
|---|---|
| Powered by AI | GLM-5.3-Flash · EU endpoint |
| Looks good! | ALLOW — recommendation |
| Unleash moderation | Drop a listing |
| Magic redline | Walkaway vs playbook |
| Delicious menus | Not publishable — allergen unknown |

Footer of every page: risk-tier sentence from the product spec, 12px ink-soft.

Named human: top bar, `for {{NAME}}, {{ROLE}}` — Priya can screenshot this.

---

## 7. Skin-specific UI

### ListGuard
- Card = photo 96×96 left, not a banner image.
- Title in Plex 16/600. Price in Plex Mono.
- Description **truncated 4 lines**, expand. Render as text (injection strings must be visible, not executed).
- Bucket chip: mono, paper fill, rule border.
- Accept is a **button that looks like a button** (ink fill, paper text). Override is a text button.
- Never a full-width green success state.

### ClauseWindow
- Reading column `max-width: 68ch`. Source Serif for the quote, Plex for chrome.
- Heatmap = left rail of clause locators; walkaway = oxide left border 3px, not a red wash over the text (still readable).
- Banner at top, persistent: “Not legal advice.”
- Download is “redlines.json”, not “Export insights”.

### MenuMind
- Grid of items like a **kitchen ticket**, not a recipe blog.
- Allergen chips: unknown = yellow + ink + the word UNKNOWN. Stated allergens = ink border, no fill.
- Publish control: visible, **disabled**, label “Publish (disabled — catalog not live on Tuesday)”.
- Satay row should be obvious without a tooltip tour.

---

## 8. Accessibility (Pro Max UX guidelines we keep)

- Focus: 2px solid `ink` offset 2px. Never remove outline.
- Hit targets ≥ 24px on Accept (hackathon desktop; still don’t use 12px ghost links).
- Forms: `<label>` bound to inputs. Drop zone is a `<button>` or labelled file input, not a clickable div-only.
- Keyboard: tab through cards, Enter accepts, Esc does not silently allow.
- `/eval` table: `<table>`, `<th scope>`, not div-grid.
- Language: `lang="en"` (or `nl` if the menu is NL — set on the item grid).
- Do not convey action by colour alone.

---

## 9. Implementation notes (so the agent cannot “improve” it)

- One CSS file `app/web/static/app.css`. No Tailwind CDN (Tailwind defaults + purple examples are how slop leaks). If Tailwind is used, only with **these tokens** in `@theme`, and no `bg-gradient-to-r`, no `purple-`, no `indigo-`.
- **Preferred: no Tailwind.** Hand CSS, 200 lines. Faster to police.
- No shadcn unless themed to this file; default shadcn is zinc+radius-md = slop-adjacent.
- Screenshots for the pitch: paper background, no browser plugin clutter, 1440×900.

---

## 10. Pre-delivery checklist (Camille)

- [ ] No purple/indigo in computed CSS
- [ ] No Inter in the font stack
- [ ] No gradient
- [ ] No box-shadow
- [ ] Word ALLOW/QUEUE/BLOCK visible without colour
- [ ] Contrast AA on chips and body
- [ ] Focus visible
- [ ] Empty, loading, error states exist
- [ ] Named human in the chrome
- [ ] Risk-tier sentence in the footer
- [ ] Eval is a real `<table>`
- [ ] Model output not rendered as HTML
