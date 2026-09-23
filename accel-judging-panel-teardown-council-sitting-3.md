# Accel AI Innovate — Judging Panel Teardown → Council Sitting 3
## The people who actually score you, tearing holes in Sittings 1 and 2.

**Date:** 21 September 2026  
**Rule of this document:** the council does not get to defend until §5. The panel speaks first.

---

## 0. Why this sitting exists

Sittings 1 and 2 were a **founders’ council**. They optimised for: what is interesting, what is 2026, what is a harness, what could be a company.

They did **not** simulate the people who will sit at the table at 16:00 with a printed rubric, seven other demos in their short-term memory, and a Nebius colleague who will veto anything that treats Token Factory as a sidecar.

This panel was assembled to match the published jury and the room:

> Winners are chosen by a panel, **including a Nebius Token Factory judge**, substance over showmanship.  
> Submission *before* the pitch: working product, **named customer**, model + TF architecture, **evidence of advantage**, short business case, live demo.  
> Top eight pitch. Five minutes.

If you do not survive the **written submission**, you do not pitch. Sitting 2 over-indexed on chalkboard wow.

---

## 1. The judging panel

Seven personas. Not the council. They do not care about Jev’s launch blog. They have seen forty “AI support inboxes” since 2023.

| Judge | Who they are in this room | What they actually score |
|---|---|---|
| **Anika Veld** | Accel principal, application-layer thesis. Europe fund. Monday-meeting test. | Is this a company I would take for 30 minutes next week? Global from day one, or a Dutch boutique? |
| **Dmitri “Dima” Kozlov** | Nebius Token Factory, inference + post-training. The named TF judge. | Is TF the engine? Dedicated endpoint? Fast vs Base? LoRA/distill? Open vs proprietary **on a number**? Or did they paste our base URL into OpenAI SDK and go to lunch? |
| **Isabel Moreira** | Prosus operator (iFood / classifieds / food delivery). This is **her house**. She has Zülküf Genç’s quote memorised: Prosus already runs TF to **200B tokens/day**, **26× cheaper** than proprietary, dedicated endpoints, autoscaling. | Do you know we already do this? Is your “named customer” a person, or our logo on a slide? |
| **Jonas Lind** | Lovable / product. Ships. | Can a human who is not you use it in 20 seconds? Is Lovable a crutch or a surface? |
| **Priya Raman** | BuilderBase submission reviewer. Reads the form. Does not watch the rehearsal. | Named customer field empty / “SMBs” / “a T&S lead we will text” = **incomplete**. Benchmark promised for 14:00 = **no evidence**. |
| **Markus Stein** | Responsible-design seat (EU counsel adjacent). Quiet. Lethal. | Risk tier stated? Irreversible actions gated? Or a SQLite “receipt” and a smile? |
| **Elena Rossi** | Independent technical founder, ex-hackathon winner. Proxy for “only possible now.” | If this shipped in 2024 with GPT-4, why are you here? |

### Hidden rubric (what they actually do, not the six bullets)

Published weights were treated as equal-ish. They are not.

| Published criterion | What happens in the room |
|---|---|
| Product and user value | Priya + Jonas: is there a **named human** and a **working click** |
| Problem and company potential | Anika: 60 seconds. Feature / consultancy / company. Veto possible. |
| Measurable model advantage | **Dima owns this.** Wrong baseline = zero. Jev-vs-Sonnet is the wrong baseline. |
| Technical execution + Token Factory | Dima + Isabel. Dedicated endpoint, model names, Fast/Base, LoRA or cascade **on TF**. |
| Demo clarity | Jonas + Elena. Dies if wifi, 429, live crawl, or a narrated video. |
| Responsible design | Markus. Binary fail if you auto-act on money, allergens, hiring rank, or weapons. |

**Priya’s gate, before anyone else scores:** if the submission lacks a named customer *or* a completed benchmark table, you are not in the top eight. The council’s “fill the table at 14:00” collides with a 15:00 submission. That is a process hole, not a product hole.

---

## 2. The panel reads Sittings 1 and 2 aloud

Isabel, after page 4 of Sitting 2:

> “They wrote 12,000 words and still do not have a customer. The default is a support inbox. We are sitting in Prosus AI House. We already spend 200 billion tokens a day on Token Factory to not do *this*. Next.”

Dima, highlighting every Jev paragraph in yellow:

> “Jev is not on Token Factory. TypeSafe is not a partner. Vercel Gateway credits are not my product. If the *interesting* decision happens off my platform and I am used to write the consolation email, you have failed criterion 4. The brief said the engine is required **and central**.”

Anika, on the ‘harness is the company’ doctrine:

> “Accel just raised an application-layer fund. We are not here for your 300-line control plane. That is a GitHub repo. Who pays, for which job, in which vertical, globally? Sitting 2’s platform speech is how science projects talk.”

Priya, on the ten-idea portfolio:

> “This is a research memo. The team that arrives with ten options on Monday night loses to the team that arrived with one dirty PDF and a person who will let them use their name.”

Jonas:

> “MenuMind is the only one I can *see*. Everything else is an architecture diagram with a UI taped on. Also: substance over showmanship means I will not save you if the product is a toy, and I will not punish you if the UI is ugly. Stop designing for me. Design for Dima’s table.”

Markus:

> “HireSignal as a product is a high-risk system if it filters candidates. Calling it a prototype in the README does not make Article 6 go away. I will ask one question on stage. If the answer is mush, you are done.”

Elena:

> “TriageCascade shipped in every LangChain hackathon in 2023. ‘Jev makes it 2026’ is a sticker. Why-now has to be visible in the demo, not in a Forbes link from Saturday.”

---

## 3. Hole catalog (the panel’s list)

Numbered so the council must answer each in §5.

### H1. Jev was allowed to steal the brief
The brief: *at least one approved open-weight model served through Nebius Token Factory. Prove the edge your **model and infrastructure** choices give you.*

Sitting 2’s “need of the hour” ranking is Jev-first. That is a **strategic own-goal**. If Dima is on the panel, the winning comparison is:

> Vanilla open model on TF vs **your** TF architecture (cascade / LoRA / dedicated / Fast vs Base) vs a **proprietary** wrapper.

Prosus already published the proprietary-vs-TF number: **up to 26× cost**. Independent TF claim: **up to 3× cost-to-performance** (Artificial Analysis), Fast vs Base flavors, dedicated endpoints, 99.9% SLA.

Jev-vs-Sonnet is a TypeSafe ad. It does not score criterion 3 or 4.

**Jev is still allowed as an accelerator** — same bucket as Tavily and Lovable. Headline it and you teach Dima that TF was optional.

### H2. “Named customer” is fanfic
“Text a T&S lead tonight.” “You, last job.” “A GC in Zuidas.” Priya will read the field. A role without a **person who consented to be named** is not a named customer. Using “OLX” or “Just Eat Takeaway” without a human is worse — Isabel will experience it as logo-jacking in her house.

### H3. Default idea is the modal loser
TriageCascade is the highest-frequency AI demo on earth. Anika has sat through Fin, Ada, Forethought, and sixteen intern Zendesk bots. Dima: if Jev does the judgement, TF writes the reply — **the commodity part**. Elena: 2023. Jonas: inbox UIs all look the same at minute 4 of hour 1 of pitches.

Council optimised for *won’t fail*. Panels reward *cannot be confused with the other seven*.

### H4. Wrong benchmark, toy n, wrong deadline
- n=20 is a vibe, not evidence. At least freeze **n=40** and pre-run *something* before 09:30 so the submission is not empty.
- Baseline must include: (a) proprietary wrapper, (b) **the same TF model without your harness/LoRA**. (b) is what proves *your* choices. Council skipped (b) almost everywhere.
- Comparing quality to “GPT-5.6 Terra” you may not even call on Tuesday is a made-up row.
- Submission at 15:00 **includes** the evidence. “Fill at 14:00” is a 60-minute buffer to disaster.

### H5. Private-data ideas cannot be demoed honestly
TriageCascade, PlaybookForge, HireSignal, CourierDesk, KYCgate need **private** tickets, SOPs, CVs, order events, IDs. In a one-day hackathon you will fake them. Isabel and Priya can smell fixtures. Public-data paths (menus, public listings, public tenders, public contracts/CUAD, public PRs) survive paper review.

### H6. LoRA-in-a-morning is a hero narrative, not a plan
Kenji already flagged this. The panel is harsher: no consent to train on a customer SOP, possible eval contamination, job may not finish, **adapter vs base on the same TF model** is the only honest LoRA story — and you still need the fallback. PlaybookForge as *the* product is a bet on a batch job.

### H7. 1M context is not free wow
GLM-5.3-Flash thinking is on by default. 80 pages × thinking × pitch-time latency can blow the 15-second heatmap. Cost of the window can erase the “cheaper than Claude” slide if you don’t measure it. Dima will ask TTFT and €/doc. If you don’t have them, you used 1M as a brand name.

### H8. Platform talk is off-thesis for Accel
“The harness is the company” is Owen being right about **software** and Anika being right about **capital**. This event’s prize is a Founders Pack and a line to Accel. Application-layer vertical, or you are a clever repo.

### H9. Prosus-as-distribution is a daydream
Isabel: “I will not be your go-to-market.” A wedge that *rhymes* with iFood/OLX/JET is fine. A pitch that says “Prosus will distribute us” in Prosus’s building is how you get a polite zero on company potential.

### H10. Local TAM dressed as global
BTWvision (Dutch VAT), TenderScout (TenderNed), parts of HireSignal (EU-only compliance consultancy). Accel’s published line for this series: *thinking globally from the start.* NL can be the wedge. It cannot be the company slide. ViDA-as-urgency was already caught — good — but the company slide still has to survive Anika.

### H11. Responsible-design theatre
A receipt table is not Article 12. A confirm button is not Article 14 if the default is auto-send. HireSignal as “legal to turn on” is a claim Markus will not let stand. MenuMind auto-publishing a catalog with a missed peanut is a physical-harm fail. CourierDesk auto-refund is money. ListGuard auto-ban of a seller is a person.

### H12. Security holes the council named and then under-weighted
- Scraping Marktplaats/OLX for ListGuard: GDPR + ToS. Isabel will ask.
- Ticket/listing/CV injection: sitting 2 mentioned it; none of the ten *made the injection fixture the opening of the demo*.
- Training on customer SOPs without a DPA: PlaybookForge.
- Shell/coder without sandbox: MergeJudge.

### H13. Partner-stack hypocrisy
Council said “use partners.” Default TriageCascade barely uses Tavily. TenderScout uses Tavily well and was ranked sleepy. Lovable was “don’t let it become the product” — correct — then no product surface was specified except “inbox.” Dima does not extra-credit n8n. He extra-credits **dedicated endpoints**.

### H14. Fast vs Base, distillation, dedicated endpoints — unused TF surface
Token Factory’s own pitch: dedicated endpoints, Fast vs Base, up to 3× cost-to-performance, LoRA **and** distillation (up to 70% cost/latency cut in their lifecycle copy), EU/US zero-retention, isolation.

Council used: “call a model” + maybe LoRA. That is 20% of the product they are judging you on.

### H15. Five-minute pitch skeleton is a TED talk
20s problem, 90s demo, 80s architecture, 60s table, 35s business, 15s ask. In practice the demo will overrun, Dima will steal the architecture, Anika will ask TAM, and you will never show the table. **Table must be visible during the demo, not after.**

### H16. Ten ideas is indecision
The user asked for ten. The panel does not care. A team that has not killed eight of them by Sunday night is not a founding team.

### H17. “You last job” as customer fails founder-intent
This event is *Future Founders*. Anika: “Are you still building this in March, or is it a support-inbox you will abandon when you go back to work?” MenuMind, MergeJudge, HireSignal fail this harder than a vertical the founders have lived.

### H18. Measurable advantage vs closed models can *lose*
If your open cascade is worse on quality and you only win on €, **say that**. Dima prefers an honest cost win with a quality floor to a fake F1. Council assumed they would beat GPT on quality. On n=20 labelled by themselves, they will. That is not science; that is self-dealing.

---

## 4. Idea-by-idea: judge votes (advance / salvage / kill)

Legend: **IN** = can make top eight if executed. **SALVAGE** = only with listed surgery. **OUT** = do not build for *this* jury.

| Idea | Anika | Dima | Isabel | Jonas | Priya | Markus | Elena | Verdict |
|---|---|---|---|---|---|---|---|---|
| TriageCascade | OUT (seen it) | SALVAGE (only if TF does the judge too) | OUT (toy vs 200B tok/day) | SALVAGE | SALVAGE (private data) | IN | OUT (2023) | **SALVAGE, demoted** |
| PlaybookForge | SALVAGE (vertical or die) | **IN** | SALVAGE | OUT (scoreboard-not-product) | SALVAGE (consent) | IN | IN (LoRA-in-hours) | **IN, if public/consented corpus** |
| ListGuard | IN (app layer) | SALVAGE (TF vision must be the judge’s peer, not Jev’s) | **IN** (if no logo-jack) | IN | SALVAGE (public listings, named human) | SALVAGE (no auto-ban people) | IN | **IN, front-runner if public data + person** |
| ClauseWindow | SALVAGE (legaltech graveyard) | **IN** (1M is our Day-0 story) | — | IN if heatmap | SALVAGE (need a GC name *or* a public contract + a lawyer who agrees) | IN (not legal advice) | IN (1M) | **IN, if latency measured** |
| BTWvision | OUT unless EU-not-NL slide | IN (VL + closed decode) | — | **IN** | IN (accountant name) | **IN** | SALVAGE (old pain) | **SALVAGE — wedge NL, company EU** |
| TenderScout | SALVAGE (pan-EU or boutique) | — | — | OUT (sleepy) | IN (public data!) | IN | SALVAGE | **SALVAGE — paper-strong, pitch-weak** |
| CourierDesk | OUT w/o operator | SALVAGE | OUT (don’t use our ops as fanfic) | SALVAGE | OUT (fake events) | SALVAGE | SALVAGE | **OUT unless named ops human** |
| MenuMind | OUT as OCR; SALVAGE as catalog-for-platforms | IN (VL) | **IN** if sold *to* onboarding, not “a café” | **IN** | IN (public menus) | SALVAGE (allergen default fail-closed) | SALVAGE | **IN as Tuesday vehicle, Anika-risk** |
| MergeJudge | **OUT** | SALVAGE | OUT | IN | IN (public PRs) | IN | SALVAGE | **OUT for this jury** |
| HireSignal | **OUT** | — | OUT | OUT | OUT (CVs) | **OUT as product** (high-risk claim) | OUT | **OUT. Steal controls only.** |

Panel’s **IN pile** after surgery: **ListGuard, ClauseWindow, PlaybookForge (consented/public corpus), MenuMind (platform catalog, fail-closed allergens).**  
BTWvision and TenderScout survive as second-string if a named professional is in the room.  
TriageCascade survives only if the *judge step is also a TF model* and the customer is real. It is no longer the default.

---

## 5. Memo to the council (verbatim)

From: Judging panel  
To: Kapoor, Berg, El-Sayed, de Vries, Okonkwo, Janssen, Mori, Solanki, Hale  
Re: Your ten, your default, your Jev religion

1. Kill HireSignal and MergeJudge as products for 23 September.  
2. Demote TriageCascade from default. It is the modal demo. Dima will not score a TypeSafe ad. Isabel will not score a toy inbox in a house that already burns 200B TF tokens/day.  
3. Jev is an optional accelerator. The **headline advantage** is Token Factory: dedicated endpoint, Fast vs Base, open vs proprietary cost (cite the 26× *as the bar you are chasing, not as your number*), LoRA or distillation vs the **same** base model, EU isolation. If Jev is in the architecture diagram, it is a box the size of Tavily, not the title.  
4. Named customer is a **person**. Get the name by Monday 18:00 or pick a public-data idea and interview a human who will let you use their name. Logo-jacking Prosus brands in this building is scored as a negative.  
5. Public data beats private fixtures. Menus, listings, tenders, CUAD/public contracts, public diffs.  
6. Benchmark: three columns minimum — proprietary wrapper, vanilla TF model, **your** TF system. Pre-run a slice before kickoff. Put the table **on the demo screen**.  
7. Use Fast vs Base or a dedicated endpoint or a LoRA/distill **or you did not use Token Factory, you used an API.**  
8. Application layer vertical. Harness in the repo, not on the company slide.  
9. Global from day one on the business slide even if the wedge is Amsterdam.  
10. Injection fixture opens the demo. Allergen/money/weapons/hiring: fail-closed or Markus fails you.  
11. Five minutes: one person, one dirty input, one refusal, one table. Dima gets 45 seconds of architecture, not 80.  
12. Pick **one**. Sunday night.

---

## 6. Council Sitting 3 — reassessment

The council was not allowed to interrupt. They now answer the holes and re-rank.

### 6.1 Pleas the council withdrew
- **Jules:** “I over-weighted Jev as why-now. For *this* jury the why-now is open models on TF reaching proprietary quality at a fraction of cost, plus 1M multimodal Day-0, plus LoRA in hours. Jev remains the right *primitive* for bounded decisions — implement it as Nemotron-JSON **on TF first**. If Jev is reachable, A/B it. Do not headline it.”
- **Owen:** “The harness stays in the repo. It comes off the pitch. Anika is right.”
- **Amira:** “I over-weighted chalkboard gasp. Priya’s paper gate matters more. Public data + a name gets you into the eight. Then Jonas.”
- **Mira:** “Defaulting to the crowded thing because it ‘is a company’ was cowardice. Better a sharp application-layer wedge.”
- **Sofie:** “I will not let anyone say Prosus is the customer. Rhyme with the family. Name a human.”
- **Niklas:** “I under-sold Fast/Base, dedicated endpoints, distillation. Sitting 3 architecture must show at least two TF-native knobs.”

### 6.2 Hole-by-hole answers

| Hole | Council response |
|---|---|
| H1 Jev stole the brief | **Accepted.** Decision layer = Nemotron 3 Nano JSON on TF (or Qwen3-8B schema). Jev is A/B, not title. |
| H2 Named customer fanfic | **Accepted.** Gate: a person who replied in writing, or do not submit that idea. |
| H3 Modal loser default | **Accepted.** TriageCascade off the throne. |
| H4 Toy benchmark | **Accepted.** Three-column table, n≥40 frozen, slice pre-run Sunday, table on demo screen. Baseline (b) = same TF model, no harness/LoRA. |
| H5 Private data | **Accepted.** Prefer public-data ideas unless the person sends files. |
| H6 LoRA heroics | **Accepted.** LoRA is a *bonus row* in the table, not the only path. Distillation if LoRA slips. Long-context fallback remains. |
| H7 1M unpaid | **Accepted.** Measure TTFT and €/doc on the actual PDF Sunday night. If p50 > 12s, pre-warm and say so; don’t pretend it’s magic. |
| H8 Platform vs app | **Accepted.** Pitch the vertical. |
| H9 Prosus GTM | **Accepted.** No logo-jack. |
| H10 Local TAM | **Accepted.** NL wedge, EU/global category sentence mandatory. |
| H11 Theatre | **Accepted.** Fail-closed defaults. Markus’s irreversible list. |
| H12 Scrape/injection | **Accepted.** Public pages you are allowed to view; no bulk scrape pitch. Injection card **opens** demo. |
| H13 Partners | **Accepted.** Tavily where the web can change the decision. Dedicated TF endpoint always. Lovable as surface only. |
| H14 Unused TF surface | **Accepted.** Minimum two of: dedicated endpoint, Fast vs Base split (judge vs generate), LoRA/distill, 1M model. |
| H15 Pitch bloat | **Accepted.** New skeleton in §8. |
| H16 Ten ideas | **Accepted.** Three remain. Seven killed for Tuesday. |
| H17 Founder intent | **Accepted.** Pick a vertical you will still touch in March. |
| H18 Fake quality wins | **Accepted.** Honest cost/abstention wins beat self-labelled F1. |

### 6.3 Kills (Tuesday)

| Killed | Why the panel won |
|---|---|
| HireSignal | High-risk claim, private CVs, Accel-wrong, Markus OUT |
| MergeJudge | Anika OUT — GitHub feature |
| CourierDesk | No fake events in Isabel’s house |
| TriageCascade **as default** | Modal 2023 demo; TF not central if Jev judges |
| “Harness company” as the pitch | Off Accel thesis |

Controls from HireSignal (no composite human score, evidence spans) remain as *patterns* inside other products.

### 6.4 The three that survive the panel

Only three. The council was forced.

---

#### SURVIVOR A — ListGuard (application-layer, public data, Prosus-rhyme)
**Status:** Tuesday front-runner **if** a human with a marketplace/T&S/ops title replies, *or* you interview two sellers/moderators Monday and they let you name them.

**Panel surgery applied**
- Headline: **Qwen3-VL or GLM-5.3-Flash on a TF dedicated endpoint** classifies listing image+text. Nemotron-JSON on TF does the policy Choice/Score/Noul. Tavily only when a brand/serial is present (cached).
- Jev optional A/B in the table, never the title.
- No “OLX is our customer.” Named human, or “built against public listings + [Name], former marketplace moderator.”
- Do not auto-ban sellers. Auto-**queue** listings. Weapons/animals → human.
- Demo **opens** with the injection listing.
- Company slide: ingestion control plane for marketplaces **globally** (EU wedge: DSA illegal-goods duties — this *is* 2026). Anika gets DSA, not “NL classifieds.”
- Two TF knobs: dedicated EU endpoint + Fast (Nemotron judge) vs Base/VL (observe).
- Benchmark columns: GPT-vision wrapper | vanilla TF-VL | ListGuard. Metrics: policy-bucket accuracy, illegal-label invention rate (must be 0), p50, €/listing, % queued.

**Why it survives all seven:** Anika (app layer, DSA why-now), Dima (VL+Fast/Base on TF), Isabel (rhyme, no logo-jack), Jonas (inbox of cards), Priya (public data), Markus (queue not punish persons), Elena (injection + full-inventory economics).

---

#### SURVIVOR B — ClauseWindow (1M TF Day-0 story, public corpus possible)
**Status:** Front-runner **if** you have a lawyer’s name **or** use a public contract (CUAD / EDGAR / Dutch KvK filing) plus a lawyer who agrees to be the named user of the playbook.

**Panel surgery applied**
- Headline: **GLM-5.3-Flash 1M on TF dedicated EU endpoint**, whole document, no chunking. Playbook as **control** (code + Nemotron-JSON questions), not as a prompt-only vibe.
- Measure TTFT and €/doc Sunday. If slow, pre-warm; show the number anyway — Dima respects measured slowness more than fake speed.
- Output: heatmap + **python-docx tracked changes**. Chatbot-over-PDF is OUT.
- Baseline: chunked proprietary | chunked TF | **one-shot 1M TF**. The catch: Schedule-4-style trap.
- Not legal advice. Human signs. No training on the doc.
- Company: EU-native first-pass **redline** (global category: playbook-aware review). NL/EU data-residency as wedge, not as the whole TAM.
- Jev optional. CUAD taxonomy as closed Choice set on TF.

**Why it survives:** Dima’s Day-0 1M model, Elena’s why-now, Markus’s “not advice,” Jonas’s heatmap, Priya if the PDF is real. Anika remains sceptical (legaltech cemetery) — you need the Word file and a named GC/lawyer to keep her.

---

#### SURVIVOR C — PlaybookForge-as-spine, not as the product
**Status:** Build **only** as the adaptation row inside A or B (or BTWvision if an accountant is named). Do not pitch “fine-tune as a service.”

**Panel surgery applied**
- Corpus must be **consented** or public (policy PDF, playbook the lawyer emailed, DSA article, allergen regulation, VAT table).
- Table row: vanilla TF-8B | LoRA TF-8B | proprietary. If LoRA misses 12:00, drop the row, keep dedicated endpoint + long-context.
- Distillation is the TF-native backup story (their own “up to 70%”).
- Never the title of the pitch.

---

#### Second-string (only with a named professional in the room)
- **MenuMind** — if you need Jonas to pull you into the eight and you will spend 90s on “sold to platform onboarding / allergen fail-closed / EU 14 closed set / TF-VL.” Anika risk. Allergen default = unknown, never none. Do not auto-publish.
- **BTWvision** — if a named accountant exists. Company slide = EU VAT decisioning, not Dutch OCR. Math in code. ViDA is tailwind not fuse.
- **TenderScout** — strongest *paper* (public data, Tavily partner, named BD). Weakest *pitch*. Only if Anika gets pan-EU TED and Elena gets a 41-hour deadline card.

---

### 6.5 Revised ranking for *this jury*

| Rank | Idea | Role |
|---|---|---|
| **1** | **ListGuard** (TF-VL + TF-judge, public listings, named human, DSA) | Best joint of company × TF × room × public data |
| **2** | **ClauseWindow** (1M dedicated, measured latency, Word redline, named lawyer) | Best pure TF story |
| **3** | **MenuMind** (fail-closed, platform customer, not a café) | Best Priya+Jonas survival if ListGuard has no human |
| — | PlaybookForge | Spine/row only |
| — | BTWvision / TenderScout | Second-string with a named pro |
| **DQ** | HireSignal, MergeJudge, CourierDesk-without-ops, TriageCascade-as-default, Jev-as-title | Panel OUT |

**New default if no customer has replied by Monday 18:00:**  
**ListGuard on public listings** + two interviewed humans (even sellers or ex-mods) who agree to be named + injection-first demo + three-column TF table.  
If you cannot get two humans: **ClauseWindow on a public 80-page filing** + one lawyer (friend, brother, LinkedIn) who agrees to be named as the user of a 2-page playbook you wrote with them Monday night.

Do **not** fall back to a support inbox.

---

## 7. What “using Token Factory” must look like on the architecture slide (Dima’s template)

He will look for this shape. Steal it.

```
[Input] 
   → Dedicated TF endpoint (EU, zero-retention)
        Fast flavor:  Nemotron Nano / Qwen3-8B   → JSON decisions (schema)
        VL / 1M:      GLM-5.3-Flash or Qwen3-VL  → observe
        Optional:     LoRA adapter on Qwen3-8B   → specialist (row in table)
   → Policy in code (allow | queue | block)
   → Generate only after gate, on TF (not on Jev, not on GPT)
   → Tavily (cached) only if a fact can change the gate
   → Log: model id, endpoint id, flavor, tokens in/out, €, decision

Table on screen:
              proprietary | vanilla TF | ours (TF)
 quality
 p50 / TTFT
 € / job
 invented labels
 % abstain/queue
```

If Jev appears, it is a fourth column, not a replacement for the Fast-flavor TF judge.

---

## 8. Five-minute skeleton, panel-revised

| Clock | Who you are pleasing | Content |
|---|---|---|
| 0:00–0:15 | Priya, Anika | “This is [Name], [title]. They do [job]. It costs them [number].” |
| 0:15–1:30 | Jonas, Elena, Markus | Dirty input. **Injection or trap first.** Refusal. Then a clean success. Table already visible. |
| 1:30–2:15 | Dima, Isabel | Architecture: dedicated endpoint, two flavors, model names, one number vs proprietary and vs vanilla TF. |
| 2:15–2:50 | Anika | Wedge → global category. Who pays. Why you will still build this in March. |
| 2:50–3:30 | buffer for their questions | You will not finish your script. Protect the table and the name. |

You will be interrupted. Design for interruption.

---

## 9. Sunday–Monday gate (the panel’s, not the council’s)

If any box is unchecked Monday 18:00, change idea.

- [ ] One idea, not three
- [ ] A human has **written** that you may use their name and role
- [ ] Corpus is public or consented (files in a folder)
- [ ] Frozen eval n≥40 with traps / injection / “not in playbook”
- [ ] Three-column table has **at least a 10-row pre-run** (can finish the rest Tuesday)
- [ ] TF dedicated endpoint **or** a written fallback if credits don’t allow dedicated (still name Fast vs Base)
- [ ] Decision layer implemented on **TF JSON**, Jev behind a flag
- [ ] Irreversible actions: queue/block, never auto-money / auto-ban-person / auto-publish-allergen
- [ ] Demo opens on the hostile fixture
- [ ] Company sentence is global; wedge may be EU/NL
- [ ] No Prosus logo as customer

---

## 10. The panel’s last word

**Isabel:** “If you walk into my house and show me a chatbot, I will think about 200 billion tokens and I will not hear you.”

**Dima:** “If your architecture diagram has Token Factory on the right and TypeSafe in the middle, you have misunderstood the invitation.”

**Anika:** “If you cannot say the person’s name, the category, and why you are the founder, you are not a Future Founder. You are a hackathon team.”

**Priya:** “The form is the first demo.”

---

*Panel adjourned. Council Sitting 3 accepted the memo. Ten became three. Jev was demoted. Token Factory was put back in the middle. The default is no longer a support inbox.*
