# Remediation plan: Menumind

All tasks below are future work only. Entry baseline: the prototype reviewed in [REVIEW.md](REVIEW.md) at pinned SHA `542fe2c9eccf7ad5093a62ba13be1306f8152521`, with a synthetic-heavy frontend, an observed token-gated backend intake path, and an observed queue-only policy that forces `publishable = False`. Exit target: independently observed routing, safety, security, operational and usability evidence sufficient for an explicitly approved pilot, not a certification or production-readiness claim.

## Task dependency table

| Task | Purpose | Depends on | Unblocks |
| --- | --- | --- | --- |
| MM-T01 | Separate synthetic/demo paths from observed backend paths | owner availability | MM-T02, MM-T03 |
| MM-T02 | Define and verify the real decision contract against the queue-only policy boundary | MM-T01 | MM-T04, MM-T05 |
| MM-T03 | Validate service/auth/data/control boundaries | MM-T01 | MM-T04, MM-T05 |
| MM-T04 | Add meaningful UI/integration test gates | MM-T02, MM-T03 | MM-T05 |
| MM-T05 | Rehearse release, rollback, recovery and independent acceptance | MM-T02, MM-T03, MM-T04 | pilot/no-pilot owner decision |

## Phase 0 — boundary map and claim control

**Entry gate:** reviewed prototype only; owner agrees that current evidence does not prove live publication.

**Exit gate:** every operator-visible claim is tagged as synthetic or observed, and the backend/policy/publisher path is traced without inference gaps.

### MM-T01 — Trace the console to the policy and label synthetic state (MM-01, MM-02)

**Prerequisites:** product owner, engineering owner, and qualified food-safety reviewer available for scope decisions.

**Observed paths:** `frontend/src/components/MenuMindConsole.tsx`, `frontend/src/App.tsx`, `backend/web/app.py`, `backend/skins/menumind/policy.py`.

**Proposed paths:** `docs/menumind/flow-map.md`, `docs/menumind/demo-boundary.md`.

**Owner / approvers:** engineering owner leads; product owner approves operator-facing wording; food-safety reviewer approves any safety-related labels.

1. Trace each visible console action, fixture load, receipt view, kill-switch interaction and publish-status message to an exact observed backend route and policy call site; where no route exists, record that gap explicitly instead of inferring hidden wiring.
2. Label all synthetic menus, seeded receipts, pipeline timings, canned outputs and simulation-only states in the UI and supporting docs so an operator cannot confuse them with observed backend outcomes.
3. Record the exact current publication boundary, including whether this revision is queue-only and whether any downstream publisher action exists at all; if no real publish path is observed, say that publishing is not implemented or not verified.

**Expected output:** a verified flow map and demo-boundary note that distinguishes fixture-backed behavior from observed backend behavior.

**Verification:** an independent reviewer follows one synthetic menu from UI selection through the traced backend path and confirms which steps are simulated, which are server-backed, and whether any publish action actually occurs.

**Release gate:** no demo, pilot or owner-facing status update may describe “live extraction”, “live receipt”, or “publish gate” behavior until this trace exists and labels are applied.

**Rollback trigger / rollback path:** if new labels or traces contradict a current demo narrative, revert external claims to “synthetic prototype” and remove any unsupported live wording until corrected.

**Recovery expectation:** after rollback, the team can still run a safe synthetic demo with honest labeling and no publication claim.

**Independent acceptance:** a non-author reviewer can identify the synthetic receipt source, the exact backend route used, and any missing publication path without asking the implementer.

**DoD:** [ ] Fixture/live separation is visible. [ ] Each operator action has a traced path or an explicit "not observed" note. [ ] Queue-only or no-publish status is documented where true. [ ] Unsupported live wording is removed or qualified.

## Phase 1 — decision safety and service boundaries

**Entry gate:** MM-T01 accepted; data rights, reviewer roles and scope for safety/security verification approved.

**Exit gate:** the actual decision contract, auth/data boundaries and failure modes are written against observed code paths and checked with negative cases.

### MM-T02 — Validate the real decision contract against the observed queue-only policy (MM-02)

**Prerequisites:** MM-T01 complete; approved data rights; qualified allergen reviewer assigned.

**Observed paths:** `backend/skins/menumind/policy.py`, `backend/tests/test_decisions.py`.

**Proposed paths:** `docs/menumind/decision-contract.md`, `backend/tests/policy/`.

**Owner / approvers:** food-safety owner leads domain acceptance; engineering owner implements/verifies; product owner approves user-facing limitation language.

1. Write the actual decision contract from the observed policy boundary: unknown allergen evidence stays unknown, human review remains required, and this revision keeps `publishable` off unless later code changes are explicitly reviewed.
2. Build adjudicated cases for ambiguous dishes, missing disclosures, OCR ambiguity, hostile prompt content and contradicted dietary claims; tie each case to an expected queue/block/allow outcome and rationale.
3. Add negative tests that deliberately break the queue-only or unknown-handling behavior in a disposable copy and prove those tests fail, so the acceptance logic is not tautological.

**Expected output:** a domain-reviewed decision contract plus meaningful policy tests tied to observed code behavior.

**Verification:** an independent reviewer inspects at least one intentionally broken policy variant and confirms the negative tests fail for the right reason rather than for an unrelated assertion.

**Release gate:** no pilot or publication experiment may proceed until the owner accepts the limits of the actual policy and the negative tests cover unknown/missing-allergen paths.

**Rollback trigger / rollback path:** if any new change makes unknown evidence auto-allow, revert to the last reviewed policy version and suspend any publication attempt.

**Recovery expectation:** the system returns to queue-only behavior with preserved prior policy artifacts and documented limitation wording.

**Independent acceptance:** the allergen reviewer and an independent engineer both sign that the written contract matches observed code and that the broken-behavior test really trips.

**DoD:** [ ] Decision contract matches observed policy source. [ ] Adjudicated negative cases exist. [ ] Broken-policy test fails when expected. [ ] Domain owner accepts the remaining limits in writing.

### MM-T03 — Verify auth, intake, storage and control boundaries (MM-04; preventive)

**Prerequisites:** MM-T01 complete; deployment owner and security reviewer assigned.

**Observed paths:** `backend/web/app.py`, `backend/tests/test_budgets.py`.

**Proposed paths:** `docs/menumind/service-boundary.md`, `backend/tests/security/`, `backend/tests/ops/`.

**Owner / approvers:** security owner leads boundary review; engineering owner implements tests; ops/deployment owner approves topology assumptions.

1. Verify the observed token gate, rate limit, URL-fetch rejection, upload path handling, receipt/job access assumptions and kill-switch behavior against the actual routes instead of README claims.
2. Determine whether receipt/job storage, limiter state and kill state are safe for the intended topology, especially across multi-worker deployment, restart, and unavailable-store scenarios.
3. Add route-level and topology-level negative cases for unauthorized access, hostile inputs, restart behavior and split-brain kill-state behavior; document any missing global control as a blocker rather than inventing one.

**Expected output:** a route-by-route service-boundary note plus boundary tests grounded in observed backend code.

**Verification:** an independent reviewer confirms that unauthorized receipt/job access, URL-fetch attempts and topology mismatch cases are rejected or flagged as blockers in the documented boundary.

**Release gate:** no staging or pilot release while authz, kill-state scope, or receipt/data-retention ownership is unresolved.

**Rollback trigger / rollback path:** if a deployment experiment shows process-local controls are unsafe for the chosen topology, revert to a single reviewed topology or stop deployment until a shared control plane is implemented and re-reviewed.

**Recovery expectation:** the service can return to the previously reviewed topology with known queue behavior and documented access restrictions.

**Independent acceptance:** security reviewer and ops owner both confirm that every documented control is either observed in code or explicitly marked missing/unverified.

**DoD:** [ ] Token/auth/data boundary documented from observed routes. [ ] Topology assumptions reviewed. [ ] Negative boundary cases defined and observed. [ ] Missing shared controls are listed as blockers, not implied present.

## Phase 2 — meaningful automation and operator usability

**Entry gate:** MM-T02 and MM-T03 accepted; synthetic/live boundary and decision contract are stable enough to test.

**Exit gate:** the frontend has a defined test gate, negative UI/integration cases fail when protections are removed, and accessibility gaps are either fixed or explicitly owned.

### MM-T04 — Add UI and integration gates that detect broken protections (MM-03)

**Prerequisites:** MM-T02 and MM-T03 complete.

**Observed paths:** `frontend/package.json`, `frontend/src/App.tsx`, `frontend/src/components/MenuMindConsole.tsx`.

**Proposed paths:** `frontend/tests/`, `frontend/package.json` script additions, `docs/menumind/accessibility-notes.md`.

**Owner / approvers:** frontend owner leads; accessibility reviewer approves UX checks; product owner approves visible labels and warnings.

1. Define a real frontend test script and environment instead of assuming one exists, and keep the observed backend tests separate from frontend/browser coverage claims.
2. Add browser-level tests for synthetic labels, queue-only status messaging, unknown/blocked/approved states, focus flow, keyboard operation, receipt provenance display and kill-switch messaging.
3. Add at least one deliberately broken-fixture-label case and one deliberately broken-policy-message case to prove the UI/integration tests fail when protections disappear.

**Expected output:** a reproducible frontend test gate plus accessibility notes grounded in observed operator flows.

**Verification:** an independent reviewer runs the planned negative UI scenarios in the chosen test harness and confirms the suite fails when the label or queue-only message is removed.

**Release gate:** no demo/pilot handoff without a defined frontend test script and a failing negative case for synthetic-label removal.

**Rollback trigger / rollback path:** if new UI changes obscure fixture provenance or queue-only status, revert the affected frontend change set and restore the last reviewed labels/messages.

**Recovery expectation:** the console returns to a state where operators can reliably distinguish synthetic vs observed outputs before any further demo or pilot.

**Independent acceptance:** an accessibility reviewer and independent tester both confirm the operator can find provenance, blocked state and queue-only status without insider knowledge.

**DoD:** [ ] Frontend test script exists. [ ] Negative UI cases fail when protections are removed. [ ] Receipt provenance is visible. [ ] Accessibility findings are fixed or explicitly accepted by owner.

## Phase 3 — release, rollback, recovery and independent acceptance

**Entry gate:** MM-T02 through MM-T04 accepted; owners have approved any staging/pilot environment and provider/data usage.

**Exit gate:** release, rollback and recovery are observed in a controlled environment and an independent cross-discipline acceptance record exists.

### MM-T05 — Rehearse release, rollback and recovery before any pilot (preventive)

**Prerequisites:** MM-T02, MM-T03 and MM-T04 complete; provider accounts, hosting, data policy and incident owner approved.

**Observed paths:** `backend/web/app.py`, `backend/skins/menumind/policy.py`.

**Proposed paths:** `docs/operations.md`, `docs/menumind/release-checklist.md`, `docs/menumind/restore-drill.md`.

**Owner / approvers:** ops owner leads release/recovery planning; security owner, product owner and food-safety owner approve go/no-go.

1. Define the exact release artifact, release trigger, rollback trigger, rollback target and stop conditions for a staging or pilot environment, including what happens if policy behavior, provider behavior or topology assumptions diverge.
2. Back up only approved non-sensitive or synthetic data for the rehearsal, perform a real isolated restore, and check that receipts, queue state, kill behavior and limitation messaging match the reviewed baseline.
3. Run an independent acceptance exercise covering correctness, automation, security, operations and UI/accessibility; record blockers and require explicit owner sign-off before any pilot continues.

**Expected output:** a release checklist, rollback plan, restore-drill record and independent acceptance packet.

**Verification:** an independent operator performs the restore and rollback drill, then a separate reviewer checks that the restored system still presents queue-only behavior and accurate operator messaging.

**Release gate:** no pilot or external demo with real data/providers until release, rollback and recovery have been rehearsed and signed off.

**Rollback trigger / rollback path:** trigger rollback on missing provenance labels, broken queue-only enforcement, unauthorized data exposure, failed restore, or any unapproved provider/publication behavior; roll back to the last reviewed application/policy pair and pause further release.

**Recovery expectation:** after rollback, operators can resume only the last reviewed demo or staging mode with verified restore integrity and preserved evidence.

**Independent acceptance:** one reviewer per discipline confirms the release packet with observed evidence: correctness/code review, automation/testing, DevOps/operations, OWASP/security, and UI/UX/accessibility.

**DoD:** [ ] Release artifact and trigger documented. [ ] Rollback trigger/path documented. [ ] Restore drill observed. [ ] Five-discipline independent acceptance recorded. [ ] Owner go/no-go decision captured.

## Production acceptance checklist

- [ ] MM-T01 through MM-T05 completed and accepted.
- [ ] Synthetic/demo labeling is still visible in every operator path where synthetic state remains.
- [ ] The written decision contract matches the reviewed backend policy and any later reviewed changes.
- [ ] Negative tests fail when queue-only, unknown-handling or provenance protections are deliberately broken.
- [ ] Auth, intake, receipt/job access, topology and kill-state behavior are verified for the intended deployment shape.
- [ ] Release, rollback and recovery drills are observed, not assumed.
- [ ] Food-safety owner, security owner, ops owner and product owner have all issued explicit go/no-go decisions.

## Independent acceptance checklist

- **Correctness/code review:** independent reviewer confirms the written decision contract matches the observed policy source and the adverse-case results.
- **Automation/testing:** independent reviewer confirms at least one deliberate break causes the automated suite to fail.
- **DevOps/operations:** independent reviewer confirms release, rollback and restore were actually rehearsed for the chosen topology.
- **OWASP/security:** independent reviewer confirms token/intake/access boundaries are either observed or explicitly blocked as missing.
- **UI/UX/accessibility:** independent reviewer confirms operators can distinguish synthetic vs observed outputs and understand queue-only status.

## Changes requiring owner approval

- Menu-data rights, provider accounts, hosting, credentials, and any real publisher integration.
- Any use of real restaurant data, customer data or non-synthetic receipts.
- Any change that weakens queue-only behavior, unknown-handling, or human-review requirements.
- Any staging/pilot/demo that could be interpreted as a food-safety guarantee or autonomous publication system.

## Release / rollback / recovery policy

- **Release unit:** the reviewed application build plus the reviewed policy file/version and the matching configuration for the intended environment.
- **Release trigger:** explicit owner approval after MM-T05 evidence is complete.
- **Rollback trigger:** any contradiction between operator messaging and actual behavior, any failed negative test, failed restore, unauthorized access, or unexpected publication path.
- **Rollback path:** restore the last reviewed application/policy/configuration set, pause publication or pilot activity, and re-label the system as a prototype or synthetic demo if necessary.
- **Recovery requirement:** after rollback or restore, verify queue-only behavior, provenance labeling, receipt integrity, kill-state behavior and owner-visible limitation text before resuming any further evaluation.
