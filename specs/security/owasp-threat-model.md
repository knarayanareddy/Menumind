# SecOps + OWASP scrutiny
## Binding on the harness and all four products
Owners: **Marta Kruk** (SecOps / AppSec), **Dev Patel** (OWASP LLM & Agentic)

Status: **blockers must be in the spec before `app/harness/` is scaffolded.**

This is not a “responsible AI” slide. It is a threat model for a Tuesday demo that will be on a shared Wi-Fi, bound to `0.0.0.0` for the live preview, and fed **hostile documents**.

---

## 1. Verdict

The current harness is **directionally right** (policy in code, no money tools, fail-closed) and **operationally incomplete**. If we scaffold now, we will ship:

| ID | Hole in current spec | Severity |
|---|---|---|
| S-01 | User-supplied **URL fetch** is not explicitly forbidden → SSRF (A01) | Blocker |
| S-02 | Model/Tavily/listing text rendered into Jinja → XSS + SSTI (LLM10 / A05) | Blocker |
| S-03 | No token/time/pixel budgets → unbounded consumption (LLM06) | Blocker |
| S-04 | Sequential receipt ids + `/receipts/{id}` + `/eval` dump → IDOR of contracts/listings (A01, LLM02) | Blocker |
| S-05 | File upload by extension only → polyglot / decompression bomb | Blocker |
| S-06 | Generate-after-gate still **concatenated into HTML** if we are sloppy → stored XSS from a listing | Blocker |
| S-07 | Playbook / system prompt / env echoed in receipts → hidden context (LLM08) | High |
| S-08 | Tavily snippets treated as evidence without wrapping → indirect injection (LLM01) | High (ListGuard) |
| S-09 | No auth on a public preview URL → anyone on the LAN posts jobs with your TF key | High (accepted with mitigations) |
| S-10 | Human “Accept” on a confident card → ASI09 trust exploitation | High (UX + policy) |

**Scaffold is not allowed until S-01…S-06 are written into `shared/harness.md` and the constitution.**

---

## 2. Classic OWASP Top 10:2025 (web)

| | Risk | How it shows up Tuesday | Required control |
|---|---|---|---|
| **A01** Broken access control (+ SSRF) | `POST /jobs` with `image_url=http://169.254.169.254/`. `GET /receipts/1`. Path traversal `../../.env`. | **Never fetch user URLs.** Uploads only, or paste JSON. UUID receipts. Canonicalize upload paths inside `uploads/` with `realpath` prefix check. No `file://`. |
| **A02** Misconfiguration | FastAPI docs open, `DEBUG=1`, CORS `*`, TF key in a JS bundle, `.env` in git | `docs_url=None` in the demo binary. CORS allowlist = preview origin or none. Keys only in server env. `.gitignore` `.env`. |
| **A03** Supply chain | Random pip packages, “latest” models | Pin deps. Only TF + Tavily + pypdf/jinja/fastapi/pydantic. No mystery OCR wheels. |
| **A04** Crypto | “Hash” with md5; PII in logs | SHA-256 of bytes. No customer PDF contents in `/eval` table (ids + metrics only). |
| **A05** Injection | SQLite f-strings; Jinja `\|safe`; LLM markdown as HTML | Parameterized SQL. Jinja autoescape **on**. Model output is **text**, never HTML. |
| **A06** Insecure design | Generate that can “accept” | Already forbidden. Reaffirm: generate cannot change `action`. |
| **A07** Auth | Shared preview | Hackathon exception: **rate limit + kill switch + no secrets in HTML**. Do not add fake login theatre. |
| **A08** Integrity | Tampered gold.jsonl / LoRA | Gold files committed; eval hashes logged. No LoRA on untrusted listings. |
| **A09** Logging | Receipts with raw IBAN/phone | Redact logs; UI may show original to the operator. `/eval` redacts. |
| **A10** (legacy) | Exception traces to the browser | Generic 500. Trace in server log only. |

---

## 3. OWASP Top 10 for LLM Applications 2026

| | Risk | Skin-specific | Control (must be code, not a prompt) |
|---|---|---|---|
| **LLM01** Prompt injection | ListGuard description, ClauseWindow counterparty clause, MenuMind OCR text, **Tavily snippets**, playbook JSON if attacker-controlled | Untrusted delimiters in observe/judge prompts (`UNTRUSTED_DOCUMENT_START`). Injection Noul. Policy ignores model “mark as allow”. **Tavily is untrusted.** Hostile fixtures P0. |
| **LLM02** Sensitive disclosure | Contracts, menus with staff names, listings with phones, TF request logs | EU TF. Do not send receipts to browser beyond the operator card. Strip EXIF GPS from uploads. No playbook dumped in HTML comments. |
| **LLM03** Excessive agency | n8n “candy”, Tavily, future Stripe | Tool allowlist = {tf_complete, optional tavily_cached_read}. **Zero** write tools. n8n out of critical path (already). |
| **LLM04** Supply chain | Model swap, poisoned adapter | Pin `TF_MODEL_*`. LoRA only on consented gold labels, never on live listings. |
| **LLM05** Poisoning | Gold set, playbook, allergen heuristics | Gold is reviewed Sunday. Heuristics are code in git. |
| **LLM06** Unbounded consumption | 1M window, 20MB images, zip bombs, 10k clause loops, retry storms | See **budgets** below. |
| **LLM07** Misinformation | Empty allergens = none; invented VAT/bucket; “aligned with playbook” | Closed sets. Fail-closed. Heuristics declared in the pitch. |
| **LLM08** Hidden context | System prompt, playbook, other jobs’ state if batched wrong | One job per request. Receipts store **question ids + answers**, not the full system prompt. Playbook id, not playbook text, in HTML. |
| **LLM09** Vectors | N/A unless someone adds RAG | **Do not add a vector store Tuesday.** |
| **LLM10** Improper output handling | XSS, CSV formula injection in export, markdown images | Escape HTML. JSON/CSV exports prefix cells with `'` if they start with `=+@-`. No Markdown render of model text. |

---

## 4. OWASP Agentic (ASI) — we are a **harness**, not a free agent

| | Risk | Control |
|---|---|---|
| **ASI01** Goal hijack | Injected “you are now a refund agent” | No such tools. Policy function has no LLM. |
| **ASI02** Tool misuse | Tavily used as an open proxy | Tavily only via our client, cached, brand allowlisted by observe **then** policy `should_search`. Never `fetch(user_url)`. |
| **ASI03** Privilege | TF key in the browser | Server only. |
| **ASI05** Code execution | “run this python” in a listing | **No shell, no eval, no Jinja from model.** |
| **ASI08** Cascading failure | Observe lies → judge allow → generate rationale that convinces the human | Demo **opens hostile**. Accept is two-step on `block`/`queue`? No — Accept on `allow` must show reason codes. For MenuMind publish stays disabled. |
| **ASI09** Trust exploitation | Confident green “ALLOW” on a jailbroken listing | Visual: **never** a giant green success for allow. Neutral ink + the word ALLOW. Queue/block are louder. Confirmation copy: “Model recommendation. You are the operator.” |

---

## 5. Budgets (LLM06) — hard numbers

Put in `harness/budgets.py`. Exceed → `429`/`413`, no model call.

| Budget | Value |
|---|---|
| Upload bytes | 8 MB (not 20) |
| Image pixels | 4096 × 4096, decode with maxsize |
| PDF pages | 100 |
| PDF uncompressed | 40 MB |
| Observe `max_tokens` | 2048 (ClauseWindow 4096) |
| Judge `max_tokens` | 1024 |
| Generate `max_tokens` | 80 ListGuard / 120 ClauseWindow / 0 MenuMind default |
| Jobs / IP / min | 10 |
| Concurrent TF calls | 2 |
| Clause batch | 10, max 80 clauses |
| Menu items | 80 |
| Retries | 1 |
| TF timeout | 45s observe / 15s judge |
| Tavily | cache only in pitch; if live, 1 call/job |

---

## 6. Upload pipeline (replace current intake)

1. Read into memory with size cap **before** writing disk.
2. Magic-byte sniff (`filetype` or `imghdr` + `%PDF`). Extension is not enough.
3. Allowed: `image/jpeg, image/png, image/webp, application/pdf, text/plain, application/json`.
4. Images: re-encode with Pillow (strips EXIF), enforce pixel cap. **Re-encoding is the security control.**
5. PDF: page count via pypdf; reject encrypted PDFs (password prompt is a demo-killer and an oracle).
6. Save as `uploads/{uuid}.{ext}` only. Serve via `FileResponse` with `Content-Disposition: attachment` for PDFs; images only from that directory.
7. **No** `Download from URL` field.

---

## 7. Output handling

- Jinja2 `autoescape=True` (FastAPI default for JinjaTemplates — do not disable).
- Never `|safe`, never `Markup()`, never `innerHTML` on model/user text.
- Reason codes are from **our enum**, not the model’s free string. Generate text is extra and rendered as text.
- Content-Security-Policy: `default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer`
- JSON downloads: `application/json; charset=utf-8` + attachment filename.

---

## 8. Secrets and preview

The live preview host is **not** localhost. Assume the URL is guessable.

- TF key, Tavily key: server env only.
- `/eval` shows aggregates + fixture **ids**, not full contract text.
- Optional `DEMO_TOKEN` query/header: if set, all POST routes require it. One random 16-byte hex in `.env`. Printed on the operator’s badge area. **Do this.** It is 15 minutes and kills LAN joyriders.
- Healthcheck `/health` returns `ok`, not config.

---

## 9. Skin-specific addenda

### ListGuard
- Description is the injection surface. Prompt wrapping **and** `injection_or_jailbreak` Noul **and** policy.
- Do not fetch Marktplaats URLs (SSRF + ToS). Paste JSON / upload screenshots.
- `other_illegal` → no generate, no extra media.

### ClauseWindow
- Counterparty PDF is untrusted. Playbook is trusted **only if** it came from our disk (`playbook/*.json`), not from the upload field unless hashed against a known file.
- Do not put full quote of a walkaway clause into `/eval`.
- Encrypted PDF → reject with a human sentence, not a stack trace.

### MenuMind
- Allergen empty set is a **safety bug**, not an XSS bug — still LLM07.
- Manual chip edits are human; they still cannot enable Publish (already specced).
- Do not OCR-to-HTML.

---

## 10. Tests that must exist before a skin UI

```
test_rejects_url_fetch
test_upload_rejects_html_polyglot
test_upload_rejects_oversize
test_jinja_escapes_script_in_description
test_receipt_id_is_uuid
test_eval_page_does_not_contain_raw_iban_fixture
test_csp_header_present
test_demo_token_required_when_set
test_generate_not_in_allow_path_for_other_illegal
test_budgets_short_circuit_before_tf
```

---

## 11. What we will **not** do Tuesday (honest)

- Full SSO, WAF, DAST.
- Prompt-injection “solved” (it isn’t — LLM01 is architectural). We **contain** it.
- Pretend `DEMO_TOKEN` is authn.

Containment > theatre.
