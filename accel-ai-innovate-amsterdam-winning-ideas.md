# Accel AI Innovate: Amsterdam
## 20 ideas debated. 10 that can win. 23 September 2026.

**Event:** Future Founders — From Open Model to Real Product  
**Venue:** Prosus AI House, Gustav Mahlerplein 5  
**Constraint that kills most teams:** a working product, for a *named* customer, on **Nebius Token Factory**, with *measured* model advantage, in one day.

This brief is the output of a seven-persona expert panel. They reviewed 20 ideas, fought over scoring, and locked 10 that can survive a Nebius judge, an Accel partner, and a five-minute live pitch.

---

## 0. How to use this on Tuesday

| If your team is… | Build this |
|---|---|
| Strongest at post-training / evals | **#1 PlaybookForge** |
| Can name a marketplace or T&S operator | **#2 ListGuard** |
| Has a lawyer, GC, or contract corpus | **#3 ClauseWindow** |
| Has a SaaS support lead who will demo with you | **#4 TriageCascade** |
| Has a Dutch finance / accountant relationship | **#5 BTWvision** |
| Selling to overheid / has a capability memo | **#6 TenderScout** |
| Knows food-delivery ops (JET, iFood, Picnic) | **#7 CourierDesk** or **#8 MenuMind** |
| Pure builders, GitHub-native | **#9 MergeJudge** |
| Want the responsible-design scoring bonus | **#10 HireSignal** |

**Default pick if you have no customer lined up:** #4 TriageCascade or #8 MenuMind. Both demo in 90 seconds, both have a customer in the building, both produce a cost/quality table a Token Factory judge cannot ignore.

**Do not** ship a ChatGPT wrapper with a Token Factory API key taped on. That fails criterion 3 (measurable model advantage) and criterion 4 (Token Factory is the engine).

---

## 1. The brief, decoded

Source: [Luma event](https://luma.com/accel-ai-innovate-amsterdam), [BuilderBase](https://builderbase.com/event/accel-ai-innovate-amsterdam), [Nebius event page](https://nebius.com/events/accel-ai-innovate-amsterdam).

### What you must submit
1. A **working product**
2. A **named customer** and the problem it solves
3. The **model + Token Factory architecture**
4. **Evidence or a benchmark** of the advantage
5. A **short business case**
6. A **live demo**

Top eight pitch live, five minutes each. Winners by a panel that includes a **Nebius Token Factory judge**. Emphasis: substance over showmanship.

### Scoring (how this panel weighted the published criteria)

| Criterion | Weight | What the judges actually mean |
|---|---|---|
| Product and user value | 20 | A real person would pay / switch this week |
| Problem and company potential | 20 | Accel-shaped: global from day one, not a feature |
| Measurable model advantage | 20 | Table: quality, cost, latency, or adaptability vs a generic wrapper |
| Technical execution + Token Factory | 15 | TF is the engine: dedicated endpoint, LoRA, multi-model, EU zero-retention — not a sidecar |
| Demo clarity | 15 | 90-second wow, then architecture, then business |
| Responsible design | 10 | GDPR, EU AI Act, calibrated confidence, human-on-the-loop, no theatre |

### The sentence that wins
> “Here is a named customer. Here is the job they hate. Here is our Token Factory architecture. Here is the benchmark that a GPT-5.6 wrapper cannot match. Here is why this is only possible now. Here is the company.”

### Hard constraints the panel refused to break
- **At least one approved open-weight model on Nebius Token Factory.** Jev, Tavily, Lovable, ElevenLabs, n8n, Supabase, Modal, Vercel are accelerators — never the engine.
- **Buildable between 09:30 and 15:00.** If it needs a data partnership, a robot, or a week of labelling, it is dead.
- **Named customer ≠ “SMBs.”** A role + organisation. Ideally someone who can be quoted in the pitch.
- **Why only possible now** must be true in September 2026, not 2024.

---

## 2. The expert panel

Seven personas. They scored independently, then argued. Disagreements are preserved in §6.

| Persona | Lens | Will kill an idea if… |
|---|---|---|
| **Mira Kapoor** — Accel-style partner, European early-stage | TAM, why-now, willingness to pay, founder-market | It is a feature, a consultancy, or a local-only tool |
| **Niklas Berg** — Principal, inference & post-training | Token Factory as engine, LoRA, routing, EU residency, evals | TF is “just the LLM API” |
| **Amira El-Sayed** — Founding PM, 12 hackathon wins | 90-second wow, named user, live-demo survival | The demo needs a slide to be understood |
| **Dr. Pieter de Vries** — EU AI Act / GDPR counsel, Amsterdam | High-risk classification, logging, human oversight, data residency | It pretends regulation is a footnote |
| **Jules Okonkwo** — System One / agent-economics | Where Jev is a 100× unlock vs a sticker | Jev is used to generate text, or used where a regex would do |
| **Sofie Janssen** — Operator, ex-Just Eat Takeaway / Adyen NL | Who actually buys in Amsterdam, Prosus-shaped problems | No budget holder exists |
| **Kenji Mori** — One-day ship captain | Scope vs 5.5 hours of build | Fine-tune *and* multimodal *and* voice *and* a marketplace |

---

## 3. Technology landscape (September 2026)

### 3.1 Nebius Token Factory — required engine
Production inference + post-training for open weights. OpenAI-compatible API. EU or US zero-retention. LoRA and full fine-tune with one-click deploy. Dedicated endpoints, 99.9% SLA.

**Models the panel treats as Tuesday’s shortlist**

| Job | Model on TF | Why |
|---|---|---|
| 1M-context + native multimodal | **GLM-5.3-Flash** (Z.ai, MIT, 320B-A18B, Day 0 on TF 29 Aug) | Whole contract / repo / menu book in one window. No chunking. |
| Long-horizon coding / agents | **GLM-5.1** | Multi-hour agent loops, engineering-grade output |
| Cheap, fast, agentic router | **Nemotron 3 Nano 30B-A3B** | $0.06/$0.24 per MTok, JSON/tools, fully open |
| Coding patches | **Qwen3-Coder 30B or 480B** | LoRA-able, Eigen-optimised throughput |
| Vision invoices / listings / IDs | **Qwen3-VL 30B-A3B** (or GLM-5.3-Flash vision) | Native VL, 250+ tok/s on Eigen |
| Domain specialist you train in the morning | **Qwen3-8B / gpt-oss-20b** LoRA | Fine-tune is TF’s unfair advantage vs a closed API |
| Heavy reasoning fallback | **Qwen3-235B-A22B-Thinking** or **DeepSeek V3.2** | Only when Jev/Nemotron confidence is low |

**The Token Factory story the judge wants to hear:** dedicated endpoint + (LoRA or multi-model cascade) + EU zero-retention + a number.

### 3.2 Jev (TypeSafe) — six days old
Launched **15 September 2026**. First “System One” model: it does **not speak**. You send program state + typed questions (`Choice`, `Score`, `Noul`). It returns calibrated probabilities in **70–500 ms**, **$0.042 / M input, output free**, 0% schema errors by construction. Trained with RLCD, not RLHF.

Access paths that may work on Tuesday without a TypeSafe waitlist:
- **Vercel AI Gateway** (`typesafe-ai/jev`) — you get $120 Gateway credits
- **OpenRouter** `typesafe/jev-1.13`
- **Cloudflare Workers AI** `typesafe/jev`

**Fallback if Jev is 429’d:** Nemotron 3 Nano on Token Factory with JSON schema, used *the same way* (bounded questions, policy in code). You lose the 40–200× latency claim vs Jev, but you keep the cascade story *and* you stay 100% on TF. Design the product so Jev is an accelerator, not a single point of failure.

**Jules’s rule:** Jev decides. Token Factory generates, reasons, sees, and explains. Never the reverse.

### 3.3 Optional accelerators (use them, credit them)
- **Tavily** — search / extract / crawl / research. 8,000 credits/person. Ground anything that touches the live web.
- **Lovable** — UI in the first 90 minutes. Do not let it become the product.
- **ElevenLabs** — voice. 110k credits. Only if the job is actually spoken.
- **n8n** — execution layer (Jira, Slack, email, ERP). Accel already knows this company.
- **Supabase / Vercel / Modal** — data, frontend, burst compute.

### 3.4 Why-now chips you can play (all true this month)
1. Jev shipped **15 Sep 2026** — 8 days before the hackathon.
2. GLM-5.3-Flash, MIT, 1M context, multimodal, **Day 0 on Token Factory 29 Aug**.
3. EU AI Act **high-risk obligations live since 2 August 2026** (recruitment, credit, biometrics).
4. Token Factory LoRA → dedicated endpoint is hours, not a research project.
5. Prosus is the co-host, in their house, with iFood / OLX / PayU / Just Eat Takeaway in the family.

---

## 4. Scoring method

Each persona scored 1–10. Composite = weighted criteria, not a popularity contest. A 7.5+ composite is “can win.” Below 6.5 is “interesting, will lose to a team that shipped.”

---

## 5. Twenty ideas the panel reviewed

Short cards. Full treatment only for the ten that survived.

### A. Jev in combination with Token Factory

**I-01 TriageCascade** — Support ticket operating system. One Jev call asks 7 questions in parallel (department, urgency, churn-risk, toxicity, language, refund-entitlement, needs-human). Policy in code. Nemotron drafts. GLM-5.1 only if confidence < threshold.  
*Customer:* Head of Support, Dutch B2B SaaS.  
*Why now:* Jev’s parallel decisions make a 30-step agent ~12s vs ~5 min.  
**Composite 8.6 — ADVANCED**

**I-02 ListGuard** — Marketplace listing trust. Image (GLM-5.3-Flash / Qwen-VL) + text + Tavily brand/stolen-goods search → Jev `Choice{allow, review, reject}` + `Score` counterfeit + `Noul` weapons/animals/PII.  
*Customer:* OLX / Marktplaats Trust & Safety, or any EU classifieds lead.  
*Why now:* judgement at listing-ingestion speed; Prosus is in the room.  
**Composite 8.7 — ADVANCED**

**I-03 HireSignal** — Evidence-only hiring assistant. Jev scores *job-related evidence* (not people). Never ranks candidates. Human decides. Full logs. Built as the AI-Act-compliant layer after 2 Aug 2026.  
*Customer:* Talent lead at an EU scaleup that just switched off a US ranker.  
*Why now:* high-risk regime is live. Calibrated probabilities are the product.  
**Composite 7.7 — ADVANCED with caveats**

**I-04 BrowserClerk** — Jev picks DOM action + element; small TF model types text; code owns the loop. Back-office RPA (gemeente forms, supplier portals).  
*Why now:* published Jev computer-use pattern, 7.1s flight booking.  
**Composite 5.9 — KILLED (flaky live demo, Kenji + Amira veto)**

**I-05 ClaimFirst** — Insurance FNOL classification, missing-info detection, fraud-signal Score.  
**Composite 6.2 — KILLED (no insurer will give you claims data by lunch)**

**I-06 MergeJudge** — PR diff → Jev (secrets, auth-bypass, test-gap, scope-creep, “done” honesty) + Qwen3-Coder patch on TF.  
*Customer:* Staff engineer / platform lead.  
**Composite 7.8 — ADVANCED**

### B. Token Factory in isolation (Jev optional)

**I-07 PlaybookForge** — Upload a 40–200 page SOP. Auto-build an eval set. LoRA Qwen3-8B or gpt-oss-20b on TF. Deploy dedicated endpoint. Beat GPT-5.6 Terra on *their* eval by 15:00. Jev optional as a confidence gate.  
*Customer:* Ops director, 3PL, clinic network, or any company drowning in playbooks.  
*Why now:* TF post-training is the thing closed APIs will not do for you in a morning.  
**Composite 8.9 — ADVANCED**

**I-08 ClauseWindow** — Whole contract + playbook in GLM-5.3-Flash 1M context. Jev scores each clause (liability, termination, data-transfer, non-compete). EU zero-retention.  
*Customer:* GC at a Zuidas scaleup, or a boutique Amsterdam firm.  
**Composite 8.4 — ADVANCED**

**I-09 BTWvision** — Photo of a messy invoice → Qwen3-VL extract → Jev `Choice` over a closed Dutch VAT-code set (hallucinating a VAT code is *structurally impossible*) → journal-entry JSON.  
*Customer:* Partner at a small Amsterdam accountantskantoor, or controller at a scaleup.  
**Composite 8.1 — ADVANCED**

**I-10 RepoOracle** — Entire monorepo in 1M context Q&A.  
**Composite 6.0 — KILLED (devtool, weak company, Mira veto)**

**I-11 SpecialistCoder** — LoRA Qwen3-Coder on one customer’s stack (internal APIs, lint rules). Overlaps PlaybookForge. Folded into I-07.  
**Composite 6.8 — MERGED**

### C. Tavily-heavy

**I-12 TenderScout** — Tavily crawl TenderNed + TED → match against a capability memo in 1M context → Jev Score fit → draft outline on Qwen.  
*Customer:* BD lead at a Dutch scaleup that sells to overheid / EU institutions.  
**Composite 8.0 — ADVANCED**

**I-13 RegRadar** — Live EUR-Lex / AFM / DNB watcher.  
**Composite 6.1 — KILLED (crowded, demo is a newsletter)**

**I-14 DiligenceDesk** — PE associate research desk.  
**Composite 5.8 — KILLED (Perplexity/Hebbia clone, Mira + Amira)**

### D. Prosus-family verticals

**I-15 CourierDesk** — Real-time delivery exception agent. Jev next-action in 70ms (reroute, refund, voucher, call restaurant, compensate). TF writes NL/EN customer message.  
*Customer:* Ops manager, Just Eat Takeaway.nl or Picnic.  
**Composite 8.0 — ADVANCED**

**I-16 KYCgate** — ID + proof-of-address pack. VL extract + Jev Nouls (expired, mismatch, image-of-a-screen, PEP keyword) + TF analyst memo. EU residency.  
*Customer:* Risk ops, PayU or a Dutch EMI.  
**Composite 7.4 — waitlisted behind the ten (data + high-risk credit-adjacent)**

**I-17 MenuMind** — Photo or PDF of a restaurant menu → structured catalog, allergens, diet flags, 3 upsell lines. GLM-5.3-Flash vision + Jev completeness/allergen Nouls.  
*Customer:* iFood catalog / JET restaurant onboarding, or a single Amsterdam restaurant group.  
**Composite 8.2 — ADVANCED**

### E. Partner-stack plays

**I-18 VoiceField** — ElevenLabs hands-free field tech.  
**Composite 6.3 — KILLED (mic/noise demo risk, Kenji)**

**I-19 MotionOS** — Transcript → Jev extracts decisions/owners/due-dates → n8n executes.  
**Composite 7.3 — RUNNER-UP (partner-friendly, company is thin)**

**I-20 ModerationMesh** — Horizontal T&S API.  
**Composite 6.4 — KILLED (no named customer, Sofie + Mira)**

---

## 6. The debate (what they actually fought about)

### Fight 1 — “PlaybookForge is the Token Factory commercial.”
**Niklas:** “If a Nebius judge is on the panel, the team that *fine-tunes and deploys a dedicated endpoint before lunch* and then puts a before/after eval on stage wins criterion 3 and 4 on the spot. Closed APIs cannot do this.”  
**Kenji:** “LoRA is a two-hour risk. Bad data, failed job, you have nothing to demo.”  
**Resolution:** PlaybookForge stays #1 *if and only if* the architecture has a hot fallback: same UI, same eval, long-context GLM-5.3-Flash + prompt-cached playbook if the LoRA job slips. The product is the specialist. Fine-tune is the preferred engine, not the only one.

### Fight 2 — “ListGuard is politics, not product.”
**Sofie:** “We are in Prosus’s house. OLX and Marktplaats still drown in duplicate, stolen, and prohibited listings. A working classifier on 20 live listings is a company.”  
**Amira:** “Without OLX credentials you are classifying scraped junk. Demo dies.”  
**Resolution:** Demo on **public Marktplaats/eBay listings** the team captured that morning (Tavily extract) plus a synthetic ‘poison’ set (weapons, counterfeit, PII). Named customer = “T&S lead, European classifieds, Prosus family” — and one of you must message a real person Sunday night. If you cannot name a person, build MenuMind instead.

### Fight 3 — “Jev is a fad sticker.”
**Jules:** “If you call Jev and then ignore the probabilities, you have a blog post. The product *is* the confidence gate. Policy lives in code: `if churn_noul > 0.7 or impact >= 2: human`.”  
**Niklas:** “And if TypeSafe 429s you at 11:00, you are dead unless Nemotron on TF speaks the same schema.”  
**Resolution:** Every Jev idea ships a `DecisionBackend` interface: Jev | Nemotron-JSON. Benchmark both. That *is* the measurable advantage slide.

### Fight 4 — “HireSignal is radioactive.”
**Pieter:** “Annex III employment AI has been high-risk since 2 August. A team that *leans into* logging, human-in-command, evidence-only scoring, and ‘we do not rank humans’ will sweep responsible design. A team that ships a résumé ranker will be asked an uncomfortable question on stage.”  
**Mira:** “Accel does not want a compliance consultancy.”  
**Resolution:** HireSignal stays in the ten as the responsible-design weapon, but only as an *evidence extractor + calibrated questions*, never as a ranker. Company = “the hiring copilot that is legal to turn on in the EU in 2026.” If the team cannot explain Article 14 human oversight in one slide, pick TriageCascade.

### Fight 5 — “1M context is a party trick.”
**Niklas:** “Chunking is where contract tools silently fail. Putting the whole SPA + playbook in GLM-5.3-Flash is the first time the quality gap is *visible in a demo*.”  
**Amira:** “Only if you drop a real 80-page PDF and the heatmap appears in <15s. If you pre-chunk, you have conceded.”  
**Resolution:** ClauseWindow stays. Demo PDF is pre-loaded but *re-read live*. Latency number goes on the slide.

### Fight 6 — “Don’t build for Prosus, build a company.”
**Mira:** “CourierDesk and MenuMind are beautiful pilots. Accel writes cheques for the *platform* (every delivery network, every restaurant onboarding stack), not for a JET plugin.”  
**Sofie:** “You still need JET or Picnic as the named customer to get in the top eight.”  
**Resolution:** Prosus verticals are allowed — pitch the wedge, then the category.

---

## 7. The ten that can win

Ranked by composite. Each card is a Tuesday plan, not a vision deck.

---

### #1  PlaybookForge
**Composite 8.9** · Token Factory isolation, Jev optional · *Niklas’s favourite, Kenji’s conditional yes*

**One-liner.** Turn a company’s playbook into a specialist open model before lunch, then prove it beats a frontier wrapper on *their* eval.

**Named customer.** Ops / quality / clinical-governance lead who already lives in a 60-page SOP. Concrete Amsterdam-shaped names: a Schiphol 3PL shift manager, a multi-site dental group’s head of quality, a payments-ops lead. You must have the PDF on a USB by 09:00.

**Problem.** Generic models are fluent and wrong on internal policy. Staff Ctrl-F a PDF. Fine-tunes used to be a quarter. They are now a morning on Token Factory.

**Why only possible now.** TF LoRA + one-click dedicated endpoint. Eval loop in hours. Optional Jev gate so the specialist *knows when it does not know*.

**Architecture**
```
[Playbook PDF]
    → parse (TF GLM-5.3-Flash, 1M) → auto-generate Q/A eval (80 items)
    → LoRA Qwen3-8B or gpt-oss-20b on Token Factory
    → dedicated endpoint (EU, zero-retention)
    → Jev or Nemotron: Noul "does the playbook actually answer this?"
         low → GLM-5.1 thinking with playbook in context
         high → specialist answers
    → UI (Lovable/Vercel) + eval dashboard
```

**Measurable advantage (the slide that wins).**
| | GPT-5.6 wrapper | PlaybookForge |
|---|---|---|
| Accuracy on customer eval (n=80) | live number | live number |
| € / 1k queries | live | live |
| p50 latency | live | live |
| Data leaves EU? | often yes | no |
| Adaptable when SOP v1.4 lands | re-prompt | re-LoRA in 40 min |

**1-day build**
- 09:30–10:00 ingest PDF, generate eval, freeze the test set (do not train on it)
- 10:00–10:20 baseline GPT-5.6 + vanilla Qwen3-8B on the eval (so the delta is honest)
- 10:20–12:00 LoRA job on TF. **In parallel:** UI, fallback long-context path, Jev gate
- 12:00–13:30 deploy dedicated endpoint, run eval, screenshot the table
- 13:30–15:00 polish demo: “ask the playbook” + “SOP changed, we re-fit”
- If LoRA fails at 12:15: ship the long-context path, keep the eval table, still tell the TF story (1M window, EU, cheaper)

**Pitch angle.** “Closed models will never learn *your* operating system. We did, this morning, on Token Factory, and here is the scoreboard.”

**Company.** Vertical “policy-to-model” for regulated ops. Wedge: one SOP. Expand: every controlled document in the firm. Accel-shaped if you pick a vertical (aviation MRO, clinical, payments-ops) rather than “ChatPDF with LoRA.”

**Responsible design.** Customer data stays EU, zero-retention inference, answers cite playbook section, Jev Noul refuses when unsupported, human confirm on irreversible actions.

**Risks.** LoRA job fails (have fallback). Eval is too easy (include adversarial “not in playbook” items). Looks like a feature of Notion AI (kill that by making *adaptation* the product).

**Panel notes.** Mira 8, Niklas 10, Amira 8, Pieter 8, Jules 7, Sofie 8, Kenji 8.

---

### #2  ListGuard
**Composite 8.7** · Jev + VL + Tavily · *Sofie’s favourite, Prosus-room weapon*

**One-liner.** Trust & safety judgements at ingestion speed for classifieds and marketplaces — typed decisions, vision, live web evidence.

**Named customer.** Trust & Safety lead, **OLX / Marktplaats** (Prosus). Backup: a EU marketplace PM you can text tonight.

**Problem.** Moderators review after the listing is live. Counterfeit, stolen goods, weapons, duplicate farms, and PII leak through. LLM classifiers are slow, expensive, and invent labels. Image-only models miss the text tell. Text-only models miss the photo of a gun.

**Why only possible now.** Jev: thousands of bounded judgements/min with calibrated confidence. GLM-5.3-Flash: image+text in one model, 1M context for seller history. Tavily: “is this SKU reported stolen / is this luxury serial on a scam list?” Token Factory: EU data residency for user content.

**Architecture**
```
listing {title, description, photos, price, seller_age}
    → GLM-5.3-Flash VL (TF): caption, brand, condition, photo-vs-text consistency
    → Tavily search: brand+serial, stolen-goods, prohibited-item lists
    → Jev (parallel):
         Choice  policy_bucket {ok, counterfeit, stolen, weapon, animal, pii, spam, other}
         Score   counterfeit_risk  [clear authentic … obvious fake]
         Noul    photo_matches_text
         Noul    price_is_too_good
         Noul    needs_human
    → policy code: auto-reject / queue / allow
    → TF Qwen3-8B: one-sentence moderator rationale (only if queued)
```

**Measurable advantage.**
- 50 listings: Jev+TF vs GPT-5.6-with-vision vs human labels
- Cost per listing, p50 latency, invalid-label rate (Jev = 0 by construction)
- “We auto-acted on 72%, queued 21%, never invented a policy category”

**1-day build.** Scrape 40 public listings before 09:30. Hand-label a 20-item gold set. Poison 8 of them. Ship a moderator inbox UI: incoming card, signals, decision, rationale. Live-paste a new listing during the pitch.

**Pitch angle.** “Moderation is a decision problem that we have been wasting System-2 models on. Here is System One on the listing, Token Factory on the evidence, and a queue your T&S lead can run.”

**Company.** Horizontal T&S decisioning for marketplaces, then apps, then ads. Wedge is classifieds because Prosus *is* the distribution.

**Responsible design.** No biometric emotion. Seller-facing explanation. Appeal path. Log every auto-action. Conservative on weapons/animals (always human). EU hosting.

**Risks.** Looks like a student classifier if the gold set is cute. Must show *cost × latency × calibrated abstention*, not just F1.

**Panel notes.** Mira 9, Niklas 8, Amira 8, Pieter 8, Jules 9, Sofie 10, Kenji 8.

---

### #3  ClauseWindow
**Composite 8.4** · 1M-context TF, Jev as clause scorer

**One-liner.** First-pass review of a full EU commercial contract in one window — no chunking, no US data path, every clause scored.

**Named customer.** General Counsel or Head of Legal Ops at a scaleup in Zuidas / South Axis. Backup: partner at a 15-lawyer Amsterdam firm.

**Problem.** First pass on an 80-page SPA/DPA/MSA is 4–6 hours. Chunked GPT tools miss cross-references (“as defined in Schedule 4”) and quietly drop the liability cap. US endpoints are a non-starter for many NL firms.

**Why only possible now.** GLM-5.3-Flash 1M context, Day 0 on Token Factory, MIT, zero-retention, multimodal (scanned PDFs). Jev scores clauses without inventing a legal theory.

**Architecture**
```
PDF → text (keep layout)
    → GLM-5.3-Flash (TF, EU): section map + defined-terms table (one shot, full doc)
    → per clause, Jev:
         Choice  topic {liability, termination, IP, data_transfer, noncompete, payment, other}
         Score   deviation_from_playbook
         Noul    contains_unilateral_right
         Noul    transfers_data_outside_EEA
    → heatmap UI + “3 things I would not sign”
    → TF thinking model: redline suggestion only on clauses Jev marked ≥ threshold
```

**Measurable advantage.** Same 80-page PDF: chunked GPT-5.6 vs one-shot GLM-5.3-Flash. Metric: did it catch the liability cap in Schedule 4? Cost. Latency. Hallucinated clause rate.

**1-day build.** Bring 2 real (anonymised) contracts + 1 playbook. Pre-compute is allowed; re-run the catch-the-cap test live.

**Pitch angle.** “Chunking is a silent failure mode. We stopped chunking.”

**Company.** EU-native Ironclad/SpotDraft. Wedge: first-pass commercial review. Expand: playbook-aware negotiation.

**Responsible design.** Not legal advice. Human signs. Citations to clause IDs. EU-only inference. No training on customer contracts.

**Risks.** Legal-tech graveyard. Survive by *demoing a miss the wrapper makes*. Pieter will ask “are you giving legal advice?” — have the sentence ready.

**Panel notes.** Mira 8, Niklas 9, Amira 8, Pieter 9, Jules 7, Sofie 8, Kenji 8.

---

### #4  TriageCascade
**Composite 8.6** · Purest Jev + TF cascade · *Amira’s safest wow, Jules’s textbook*

**One-liner.** A support agent that spends 90% of its money on 10% of tickets — because a System One model decides, and Token Factory only speaks when it must.

**Named customer.** Head of Support at a B2B SaaS (Mollie, MessageBird, a Tooling HQ in Amsterdam, or *your* last company). Bring 30 real anonymised tickets.

**Problem.** Every ticket hits a frontier model. Cost explodes. Latency explodes. The model still misroutes. Humans get junk and emergencies in the same pile.

**Why only possible now.** Jev: 7 questions, one 70–500ms call, output free. Forbes (19 Sep 2026): 10k decisions/day ≈ $120 on Jev vs ~$35k on Sonnet-class. Token Factory Nemotron/Qwen for the draft. GLM-5.1 only on the tail.

**Architecture**
```
ticket
    → Jev parallel:
         Choice department {billing, technical, sales, abuse, other}
         Score  business_impact [none, inconvenience, revenue-loss]
         Noul   threatens_churn
         Noul   is_urgent
         Noul   contains_pii
         Noul   customer_is_angry
         Noul   can_auto_resolve
    → POLICY IN CODE (not in the prompt)
         if churn>0.7 or impact>=2: human + GLM-5.1 brief
         elif can_auto_resolve>0.85 and impact==0: Nemotron draft, send
         else: Nemotron draft, human one-click
    → Tavily: only if technical and docs likely
    → dashboard: % auto, €/ticket, abstention, vs GPT-5.6-does-everything
```

**Measurable advantage.** This is the cleanest scoreboard of the ten. Reproduce the cost model live on 30 tickets. Show **zero invalid departments** (schema). Show the 3 tickets Jev refused to auto-send — that refusal *is* responsible design.

**1-day build.** 09:30 schema + policy tests (no API). 10:30 Jev + Nemotron backends. 12:00 UI inbox. 13:00 benchmark harness. 14:00 live ticket paste.

**Pitch angle.** “Agents are expensive because we use System 2 for System 1 work. We stopped.”

**Company.** The cascade as a product: Support first, then trust, then ops. This is the company Jules thinks TypeSafe *cannot* sell (they sell the model). You sell the operating system.

**Responsible design.** PII Noul → redact before generate. Angry+churn → always human. Logs. No silent refunds.

**Risks.** Looks like “yet another support GPT” until the cost table appears — **open with the table, then the inbox.**

**Panel notes.** Mira 8, Niklas 9, Amira 10, Pieter 8, Jules 10, Sofie 8, Kenji 9.

---

### #5  BTWvision
**Composite 8.1** · VL + Jev closed Choice · *the Dutch-named-customer idea*

**One-liner.** Photograph an invoice. Get a VAT-correct journal entry. The VAT code cannot be hallucinated, because it is a typed Choice.

**Named customer.** Partner at a small Amsterdam accountantskantoor, or the controller at a 40-person scaleup still in Exact/Twinfield.

**Problem.** NL/EU VAT is a graveyard of reverse-charge, KOR, OSS, intra-community, and Peppol. OCR+GPT invents codes. Accountants re-type. One wrong 21% vs 0% is a Belastingdienst letter.

**Why only possible now.** Qwen3-VL / GLM-5.3-Flash vision on TF. Jev `Choice` over a **closed set of BTW codes** — invalid code rate = 0. EU zero-retention for financial documents.

**Architecture**
```
image
    → Qwen3-VL (TF): merchant, IBAN, totals, line items, dates (no VAT code from the LM)
    → Jev:
         Choice  btw_code  {21, 9, 0_ic, 0_export, reverse_charge, vrijgesteld, out_of_scope, unknown}
         Choice  doc_type  {invoice, credit, receipt, other}
         Noul    math_adds_up
         Noul    iban_present
         Score   image_quality
    → if unknown or math fails: human
    else: Exact/Twinfield-shaped JSON
```

**Measurable advantage.** 15 photographed invoices (supermarket, restaurant, AWS, a German supplier, a credit note). GPT-5.6 vision vs BTWvision: **wrong VAT code count**. That number is the pitch.

**1-day build.** Shoot the 15 invoices tonight. Hard-code the BTW Choice set from a Belastingdienst table. UI: camera → ledger row → red/green.

**Pitch angle.** “Language models should not be allowed to invent tax codes. We took that ability away.”

**Company.** EU bookkeeping copilot. Wedge: VAT-correct capture. Expand: bank rec, ICP listing, Peppol.

**Responsible design.** Accountant signs. Unknown is a first-class output. Documents stay EU. No training on customer invoices.

**Risks.** Looks small-TAM until you say “every EU SME.” Keep the company slide on **EU e-invoicing mandate**, not “OCR for Netherlands.”

**Panel notes.** Mira 7, Niklas 8, Amira 9, Pieter 9, Jules 8, Sofie 9, Kenji 8.

---

### #6  TenderScout
**Composite 8.0** · Tavily + 1M context

**One-liner.** Watch EU/NL public procurement, score fit against *your* capability memo, draft the outline — while the window is still open.

**Named customer.** BD / public-sector lead at a Dutch scaleup that already bids (climate tech, health IT, infra software, security).

**Problem.** TenderNed + TED are noisy. Teams miss in-window tenders or spend two days on a no-fit. Generic search doesn’t know your past bids.

**Why only possible now.** Tavily crawl/research at agent latency. GLM-5.3-Flash 1M: whole tender + your last three bids + capability memo. Jev Score `fit` + Noul `disqualifying_requirement`.

**Architecture**
```
Tavily crawl TenderNed/TED (and customer’s keyword list)
    → extract full notice
    → GLM-5.3-Flash (TF): requirements table vs capability memo (one shot)
    → Jev Score fit, Noul must_have_missing, Choice bid/no-bid/ask
    → if bid: Qwen draft outline + evidence quotes
    → digest UI: 5 tenders, traffic lights, deadline countdown
```

**Measurable advantage.** Same 5 live tenders: intern-with-ChatGPT vs TenderScout. Metric: disqualifiers caught, minutes to first outline, hallucination of a requirement that is not in the notice.

**1-day build.** Pick one sector. Pull 8 live notices this morning. Customer memo can be 2 pages you write with them at breakfast.

**Pitch angle.** “Public money is sitting in unstructured PDFs with 12-day windows. We read all of them against your company, every morning.”

**Company.** GovTech / GovSales OS for European vendors. Accel-shaped if you go pan-EU (TED), not just NL.

**Responsible design.** Quotes the notice. Never invents certifications you don’t have (Jev Noul on each must-have). Human submits the bid.

**Risks.** Demo depends on live sites. Cache 8 notices. Don’t crawl during the pitch.

**Panel notes.** Mira 8, Niklas 7, Amira 8, Pieter 7, Jules 7, Sofie 8, Kenji 8.

---

### #7  CourierDesk
**Composite 8.0** · Jev real-time + TF generation · *Prosus ops wedge*

**One-liner.** The 70ms decision layer for delivery exceptions — then a bilingual customer message from Token Factory.

**Named customer.** Ops manager, **Just Eat Takeaway.nl**, Picnic, or a regional fleet. If you cannot name a person, do not build this — build MenuMind.

**Problem.** Rain, restaurant closed, missing drink, rider cancelled. Today: macros + humans. Latency matters. Wrong compensation is margin. Wrong tone is churn.

**Why only possible now.** Jev at 2Hz-ish judgement. Nemotron for NL/EN copy at Token Factory prices. Policy (max voucher, never refund twice) in code.

**Architecture**
```
event {order, delay_min, item_missing, weather, customer_tier, prior_comps}
    → Jev:
         Choice action {wait, reroute, voucher, refund_item, refund_order, call_merchant, human}
         Score  customer_risk
         Noul   weather_is_cause
         Noul   merchant_at_fault
    → policy caps
    → Qwen3-8B (TF): message in customer language, citing the action
    → n8n: push to stubbed “dispatch” + Slack
```

**Measurable advantage.** 20 replayed exceptions. vs “GPT decides everything.” Metrics: policy-violation rate (should be 0), decision latency, € compensated vs human gold.

**1-day build.** Invent a realistic event schema. 20 fixtures. Map UI of Amsterdam with 3 live events. Do not try to hit production JET APIs.

**Pitch angle.** “Delivery networks don’t need a novelist. They need a judge, then a sentence.”

**Company.** Exception OS for last-mile. Wedge: food. Expand: grocery, parcels, field service.

**Responsible design.** Compensation caps. Human on medical/allergy missing-items. No emotion recognition on riders.

**Risks.** Toy simulator look. Survive with ugly-but-real event JSON and a policy-violation counter at 0.

**Panel notes.** Mira 8, Niklas 8, Amira 8, Pieter 7, Jules 9, Sofie 10, Kenji 7.

---

### #8  MenuMind
**Composite 8.2** · Multimodal TF, insanely demoable · *Amira + Sofie coalition*

**One-liner.** Point a phone at a menu. Get a structured, allergen-aware catalog a delivery platform can ingest.

**Named customer.** Restaurant-onboarding lead at **iFood** or **Just Eat Takeaway**, *or* the owner of a 6-site Amsterdam group still sending PDFs to Thuisbezorgd.

**Problem.** Onboarding a restaurant is still humans typing. Photos of chalkboards. PDFs in Dutch/Turkish/Arabic. Allergen law is unforgiving. Bad catalogs = failed orders.

**Why only possible now.** GLM-5.3-Flash native multimodal, MIT, 1M (whole photo-menu book). Jev Nouls for “allergen stated?”, “price readable?”, “photo matches item?”. TF EU path for restaurant IP.

**Architecture**
```
image/PDF
    → GLM-5.3-Flash VL (TF): items, prices, sections, language
    → Jev per item:
         Noul allergen_info_present
         Noul price_is_unambiguous
         Choice diet {none, veg, vegan, halal, unknown}
         Score  ocr_confidence
    → unknown/missing → queue for restaurant
    → Qwen: 3 upsell lines in NL
    → export JSON (JET/iFood shaped)
```

**Measurable advantage.** 5 real menus (photograph tonight in De Pijp). Item-F1 vs GPT-5.6 vision. Allergen-miss count (this is the responsible-design kill-shot). Seconds to catalog.

**1-day build.** This is the fastest wow of the ten. Lovable UI: upload → catalog grid → red flags. Live chalkboard photo on stage.

**Pitch angle.** “Every delivery network’s onboarding team is a data-entry team. We ended that, and we refuse to invent an allergen.”

**Company.** Menu → structured commerce graph. Wedge: delivery onboarding. Expand: POS, dietary search, ghost kitchens. Prosus distribution is the unfair start.

**Responsible design.** Missing allergen ≠ “none.” Unknown diet ≠ vegan. Human restaurant confirm before go-live.

**Risks.** Looks like a weekend OCR toy. The allergen refusal + platform JSON + Prosus customer is what makes it a company.

**Panel notes.** Mira 8, Niklas 8, Amira 10, Pieter 8, Jules 7, Sofie 9, Kenji 9.

---

### #9  MergeJudge
**Composite 7.8** · Jev + Qwen3-Coder · *the builders’ idea*

**One-liner.** A merge gate that cannot hallucinate a verdict — then a coder model that proposes the fix.

**Named customer.** Staff engineer / Head of Platform at a scaleup shipping 40 PRs/day. Backup: your own repo, with a real teammate as the named user.

**Problem.** CI is syntactic. Humans are tired. LLM review bots write essays and miss the auth hole. “Looks good to me” is not a decision.

**Why only possible now.** Jev on the diff: bounded questions, calibrated. Qwen3-Coder on TF (LoRA-able later on the company’s lint rules). Policy: secrets always block.

**Architecture**
```
diff + PR title + CI status
    → Jev:
         Noul introduces_secret
         Noul authz_changed_without_test
         Noul claims_done_but_tests_missing
         Score  blast_radius [local, service, platform]
         Choice verdict {allow, request_changes, block}
    → if not allow: Qwen3-Coder (TF) patch or test stub
    → GitHub Action stub + UI
```

**Measurable advantage.** 15 real PRs (some toxic: committed `.env`, missing auth test). vs GitHub Copilot-review / GPT-5.6. Metrics: secret catch rate, false-block rate, latency, €/PR.

**1-day build.** Don’t integrate real GitHub until last. Fixture diffs. One live PR at 14:30.

**Pitch angle.** “Review is a verdict, not a paragraph. Generation comes after the verdict, on Token Factory, and only if we blocked you.”

**Company.** Devtools merge-gate. Crowded. Wins the room more easily than it wins Accel — unless you verticalise (PCI / HIPAA / AI-Act logging of model changes).

**Responsible design.** Never auto-merge. Secrets = block, no exceptions. Logs. No training on private diffs (EU TF).

**Risks.** Mira thinks this is a feature of GitHub. Counter: **verdict-first, generate-second**, company-specific LoRA tomorrow.

**Panel notes.** Mira 6, Niklas 9, Amira 8, Pieter 7, Jules 8, Sofie 6, Kenji 9.

---

### #10 HireSignal
**Composite 7.7** · Jev + TF · *Pieter’s hill to die on*

**One-liner.** An EU-legal hiring copilot: evidence in, calibrated questions out, a human always hires. No ranking. No emotion. No black box.

**Named customer.** Head of Talent at an EU company that disabled a US AI ranker after 2 August 2026.

**Problem.** High-risk employment AI obligations are **live**. Most tools still output a ranked list and a vibe. That is now a €35M / 7% problem. Teams need *something* that is actually legal to turn on.

**Why only possible now.** AI Act high-risk live since **2 Aug 2026**. Jev’s calibrated probabilities + schema-bounded outputs are the first model class that maps onto Article 14 oversight (you can set a threshold; you can log the question; you cannot get a made-up competency). Token Factory: EU processing, audit-friendly.

**Architecture**
```
JD (structured must-haves) + CV + work sample
    → GLM-5.3-Flash (TF): extract *evidence spans only*
    → Jev, one question per must-have:
         Noul evidence_of_{requirement}
         Score strength_of_evidence [absent, mentioned, demonstrated]
    → NO composite rank, NO “culture fit”, NO emotion
    → UI: requirement grid, quotes, blanks in red
    → human decision + reason code (logged)
    → TF: interview questions only for blanks, not a verdict
```

**Measurable advantage.** 10 anonymised CVs. vs a ranker LLM. Metrics: invented-experience rate (target 0), time-to-shortlist, and a **conformity-lite checklist** the wrapper fails.

**1-day build.** One JD, 10 CVs (anonymised, diverse, with two planted hallucinations). Grid UI. Log viewer. Do **not** show a leaderboard of humans.

**Pitch angle.** “The hiring agents that won hackathons in 2024 became illegal in 2026. This is the one you can switch on.”

**Company.** “Compliant hiring infrastructure for the EU.” Risky as a standalone Accel company (Mira: “compliance is a feature”). Wins **this room** because responsible design is a published criterion and almost nobody will take it seriously.

**Responsible design.** This *is* the product. No emotion recognition (already prohibited). Human-in-command. Candidate notification. Logs. Bias: report evidence-coverage by proxy only if you have time; otherwise say you are not scoring people.

**Risks.** High-risk provider duties if you “place on the market.” For a hackathon: label it a **decision-support prototype**, deployer = the named customer, you are not auto-rejecting. Pieter will hug you. Mira will ask about TAM — answer: every EU employer that currently uses a ranker.

**Panel notes.** Mira 6, Niklas 7, Amira 7, Pieter 10, Jules 9, Sofie 7, Kenji 7.

---

## 8. Honourable mentions (do not build unless the ten are a bad fit)

| Idea | Why it almost made it | Why it dies on Tuesday |
|---|---|---|
| MotionOS (n8n) | Accel knows n8n; demo is pretty | Company is “Zapier with a transcript” |
| KYCgate | PayU in the Prosus family | High-risk (credit-adjacent) + you will not get ID images |
| BrowserClerk | Jev’s flashiest published demo | Live DOM demos fail on stage |
| TraceDistill | Beautiful TF story | It’s PlaybookForge with worse UX |

---

## 9. What “winning architecture” looks like on the slide

Every top-ten idea is the same machine in different clothes. Steal this diagram.

```
                    ┌─ Jev / Nemotron-JSON ─ typed decisions, 70–500ms
 User / event  ──► ─┤
                    │  Token Factory
                    │   ├─ small/fast   Qwen3-8B, Nemotron Nano, gpt-oss-20b
                    │   ├─ vision/long  GLM-5.3-Flash (1M, multimodal)
                    │   ├─ think/code   GLM-5.1 / Qwen3-Coder / DeepSeek
                    │   └─ specialist   LoRA dedicated endpoint (EU, 0-retention)
                    │
                    ├─ Tavily  (only if the web can change the decision)
                    └─ policy in CODE  (thresholds, caps, never-do lists)
                           │
                           ▼
                    human-on-the-loop for irreversible / low-confidence
```

**Four numbers the Nebius judge should see**
1. Quality on a frozen eval vs a closed wrapper  
2. € per 1k jobs  
3. p50 latency  
4. % of cases abstained / sent to human  

If you cannot produce those four by 14:30, you do not have criterion 3.

---

## 10. Recommended default (if you must pick tonight)

**Build #4 TriageCascade with a PlaybookForge spine.**

Meaning:
- Named customer = a support lead you can actually text (or yourself, last job, 30 real tickets).
- Engine = Token Factory cascade (Nemotron + Qwen + GLM-5.1), EU endpoint.
- Accelerator = Jev behind a `DecisionBackend` interface.
- Advantage = the cost/latency/abstention table on 30 tickets.
- Stretch = LoRA Qwen3-8B on their macros/macros-that-work if the data is there by 11:00.
- UI = Lovable/Vercel inbox. Execution = n8n stub.
- Responsible = PII gate, churn gate, no silent money movement.

Why this default: it is the only idea that is simultaneously (a) Jev’s textbook use, (b) TF-central even if Jev dies, (c) demo-bulletproof, (d) a company Accel understands (agent economics), (e) buildable solo.

**If a Prosus operator will sit with you at breakfast, switch to #2 ListGuard or #8 MenuMind.** Distribution in the building is worth a criterion of company potential.

**If you already have a 60-page SOP and you can babysit a LoRA job, switch to #1 PlaybookForge.** That is the Token Factory judge’s love language.

---

## 11. Five-minute pitch skeleton (use for all ten)

| Clock | What | Do not |
|---|---|---|
| 0:00–0:20 | Named human, named pain, one number (“6 hours”, “€35k/month”, “12-day tender window”) | “AI is transforming…” |
| 0:20–1:50 | **Live demo.** One input, one output, one refusal (the refusal shows responsible design) | Narrate slides over a video |
| 1:50–3:10 | Architecture. Point at Token Factory. Say the model names. Show the cascade. | “We use several LLMs” |
| 3:10–4:10 | **The table.** Quality / cost / latency / abstention vs GPT-5.6 wrapper. One sentence on why-now (Jev date, 1M context, LoRA-in-hours, AI Act 2 Aug) | Benchmarks you did not run |
| 4:10–4:45 | Business: who pays, wedge → category, why this is a company | TAM from a blog |
| 4:45–5:00 | Ask: credits, intro to the named customer’s boss, or Accel follow-up. Sit down. | New feature ideas |

---

## 12. Anti-patterns (the panel’s kill list)

1. **Token Factory as a GPT substitute.** Same prompt, different base URL. Instant criterion-3 fail.  
2. **Jev as the only model.** Violates the brief. Also Jev cannot write.  
3. **“SMBs in Europe.”** Not a named customer.  
4. **Voice on a laptop mic in AI House.**  
5. **Live crawl during the pitch.** Cache it.  
6. **Ranking humans, scoring credit, emotion.** Pieter will end you, and he should.  
7. **Fine-tune with no held-out eval.** The TF judge will ask.  
8. **Lovable-only. Pretty UI, dumb guts.**  
9. **Five models because the brief listed five jobs.** One cascade, two or three models, a reason for each.  
10. **Starting at 09:30 without fixtures.** Gold set, PDFs, invoices, tickets, menus — tonight.

---

## 13. Tonight’s checklist (21–22 September)

- [ ] Pick one of the ten using the table in §0. Do not hybridise two verticals.
- [ ] Text the named customer. Get a PDF / 30 tickets / 5 menus / 8 listings. If they don’t reply by Monday noon, switch to MenuMind or TriageCascade with *your* last-job data.
- [ ] Create the frozen eval (20–80 items) *before* you write product code.
- [ ] Confirm Token Factory access, a model that is actually up (GLM-5.3-Flash, Qwen3-8B, Nemotron Nano, Qwen3-VL), and EU endpoint.
- [ ] Jev: try Vercel AI Gateway and OpenRouter tonight. Wrap behind `DecisionBackend`. Implement Nemotron-JSON fallback before you sleep.
- [ ] Shoot the photos / export the PDFs / anonymise the tickets.
- [ ] Write the four-number table *empty*, with the rows you will fill at 14:00.
- [ ] Draft the 20-second opening with a real name in it.

---

## 14. Sources the panel used

- Event: [Luma](https://luma.com/accel-ai-innovate-amsterdam), [BuilderBase](https://builderbase.com/event/accel-ai-innovate-amsterdam), [Nebius](https://nebius.com/events/accel-ai-innovate-amsterdam)
- Token Factory: [fine-tune model list](https://docs.tokenfactory.nebius.com/post-training/models), [Eigen partnership](https://nebius.com/blog/posts/nebius-and-eigen-ai-partner-to-accelerate-frontier-open-source-ai-inference), GLM-5.3-Flash Day 0 on TF (29 Aug 2026)
- Jev: [DataCamp explainer](https://www.datacamp.com/blog/system-one-models-jev), [Forbes, 19 Sep 2026](https://www.forbes.com/sites/josipamajic/2026/09/19/jev-cuts-ai-decision-costs-100x-and-vercel-cloudflare-rushed-to-add-it/), [Forbes, 20 Sep 2026](https://www.forbes.com/sites/johnwerner/2026/09/20/it-doesnt-have-to-speak-jev-shows-value-of-judgment-models/), TypeSafe launch 15 Sep 2026
- Prosus family context: iFood, OLX, PayU, Just Eat Takeaway (event co-host)
- EU AI Act high-risk employment: obligations live 2 Aug 2026, Annex III

---

*Panel sat 21 September 2026. Rankings assume a solo or two-person technical team that can ship. If you already have a domain and a customer, ignore the default and take the matching row in §0. Substance over showmanship.*
