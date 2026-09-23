from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.responses import HTMLResponse, JSONResponse, PlainTextResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from jinja2 import select_autoescape
from starlette.middleware.base import BaseHTTPMiddleware

from harness.config import load_settings
from harness.eval_runner import empty_report, load_gold, redact, run_offline_gold
from harness.intake import IntakeError, ingest_bytes, ingest_json_text, reject_url_fetch
from harness.pipeline import JobResult, KillState, build_backend, job_from_receipt, run_job
from harness.rate_limit import RateLimiter
from harness.receipts import ReceiptStore
from harness.tf_client import TFClient
from harness.types import Action, PolicyResult
from harness.exhibit_build import pack_from_job, pack_from_receipt
from skins import load_skin

ROOT = Path(__file__).resolve().parent.parent
WEB = Path(__file__).resolve().parent
UPLOADS = ROOT / "uploads"
EVALS = ROOT / "evals"
DB = ROOT / "evals" / "receipts.sqlite"

CSP = (
    "default-src 'self'; "
    "img-src 'self' data:; "
    "style-src 'self'; "
    "script-src 'self'; "
    "connect-src 'self'; "
    "frame-ancestors 'none'; "
    "base-uri 'self'; "
    "form-action 'self'"
)

settings = load_settings()
kill = KillState()
limiter = RateLimiter()
receipts = ReceiptStore(DB)
jobs: dict[str, JobResult] = {}
tf_client = TFClient(settings)
backend = build_backend(settings, tf_client)
skin = load_skin(settings.skin)


class SecurityHeaders(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        try:
            response = await call_next(request)
        except HTTPException:
            raise
        except Exception:
            return PlainTextResponse("internal error", status_code=500)
        response.headers["Content-Security-Policy"] = CSP
        response.headers["X-Content-Type-Options"] = "nosniff"
        response.headers["Referrer-Policy"] = "no-referrer"
        response.headers["X-Frame-Options"] = "DENY"
        return response


docs = None if settings.is_demo else "/docs"
app = FastAPI(
    title=getattr(skin, "WORDMARK", "Stub agent"),
    docs_url=docs,
    redoc_url=None,
    openapi_url=None if settings.is_demo else "/openapi.json",
)
app.add_middleware(SecurityHeaders)
app.mount("/static", StaticFiles(directory=str(WEB / "static")), name="static")
templates = Jinja2Templates(directory=str(WEB / "templates"))
templates.env.autoescape = select_autoescape(enabled_extensions=("html", "xml"), default=True)


def _ctx(request: Request, **extra):
    named = settings.named_human
    role = settings.named_role
    if named:
        for_line = f"for {named}" + (f", {role}" if role else "")
    else:
        for_line = "for named human unset"
    data = {
        "request": request,
        "wordmark": getattr(skin, "WORDMARK", "Harness"),
        "skin": settings.skin,
        "for_line": for_line,
        "frozen": kill.frozen,
        "risk_tier": getattr(skin, "RISK_TIER", ""),
        "intake_hint": getattr(skin, "INTAKE_HINT", "Paste JSON. No URLs."),
        "demo_token_set": bool(settings.demo_token),
        "reviews": [],
        "error": None,
        "job": None,
        "receipt": None,
        "report": None,
    }
    data.update(extra)
    return data


def _require_token(header_token: str | None, form_token: str | None) -> None:
    if not settings.demo_token:
        return
    got = header_token or form_token or ""
    if got != settings.demo_token:
        raise HTTPException(status_code=401, detail="demo token required")


def _client_key(request: Request) -> str:
    host = request.client.host if request.client else "unknown"
    return request.headers.get("x-forwarded-for", host).split(",")[0].strip()


@app.get("/health")
def health():
    return PlainTextResponse("ok")


@app.get("/", response_class=HTMLResponse)
def home(request: Request):
    return templates.TemplateResponse(request, "home.html", _ctx(request))


@app.post("/kill")
async def kill_switch(
    request: Request,
    x_demo_token: str | None = Header(default=None, alias="X-Demo-Token"),
):
    form_token = None
    ctype = request.headers.get("content-type", "")
    if "application/json" not in ctype and request.method == "POST":
        try:
            form = await request.form()
            form_token = form.get("token")
        except Exception:
            form_token = None
    _require_token(x_demo_token, form_token or request.query_params.get("token"))
    kill.toggle()
    if "application/json" in request.headers.get("accept", ""):
        return {"frozen": kill.frozen}
    return HTMLResponse(status_code=303, headers={"Location": "/"})


@app.post("/jobs")
async def create_job(
    request: Request,
    x_demo_token: str | None = Header(default=None, alias="X-Demo-Token"),
):
    if not limiter.allow(_client_key(request)):
        raise HTTPException(status_code=429, detail="rate limit")
    ctype = request.headers.get("content-type", "")
    try:
        if "application/json" in ctype:
            _require_token(x_demo_token, request.query_params.get("token"))
            body = await request.json()
            if not isinstance(body, dict):
                raise IntakeError("json object required", 400)
            reject_url_fetch(body)
            ingested = ingest_json_text(json.dumps(body))
            payload = ingested["payload"]
            input_hash = ingested["input_hash"]
        else:
            form = await request.form()
            _require_token(x_demo_token, form.get("token"))
            json_text = form.get("json_text")
            upload = form.get("upload")
            if json_text:
                ingested = ingest_json_text(str(json_text))
                payload = ingested["payload"]
                input_hash = ingested["input_hash"]
            elif upload is not None and hasattr(upload, "read") and getattr(upload, "filename", ""):
                data = await upload.read()
                stored = ingest_bytes(data, UPLOADS)
                payload = {"upload_path": stored["path"], "mime": stored["mime"]}
                input_hash = stored["input_hash"]
            else:
                raise IntakeError("empty input", 400)
    except IntakeError as exc:
        raise HTTPException(status_code=exc.status, detail=str(exc)) from exc

    if not hasattr(skin, "questions"):
        raise HTTPException(status_code=501, detail="skin not implemented")

    result = run_job(
        settings=settings,
        skin_mod=skin,
        payload=payload,
        input_hash=input_hash,
        receipts=receipts,
        client=tf_client,
        backend=backend,
        kill=kill,
    )
    jobs[result.id] = result
    wants_html = "text/html" in request.headers.get("accept", "") or "application/json" not in ctype
    if wants_html and "application/json" not in request.headers.get("accept", ""):
        return templates.TemplateResponse(request, "home.html", _ctx(request, job=result))
    return JSONResponse(
        {
            "id": result.id,
            "recommended": result.recommended.value,
            "action": result.policy.action.value,
            "reason_codes": result.policy.reason_codes,
            "human_required": result.policy.human_required,
            "frozen_to_queue": result.frozen_to_queue,
            "generate_text": result.generate_text,
            "display": result.display,
        }
    )


@app.get("/jobs/{job_id}", response_class=HTMLResponse)
def get_job(request: Request, job_id: str):
    job = _require_job(job_id)
    return templates.TemplateResponse(
        request,
        "job.html",
        _ctx(request, job=job, receipt=job.receipt, reviews=job.reviews),
    )


@app.get("/receipts/{receipt_id}")
def get_receipt(receipt_id: str):
    rec = receipts.get(receipt_id)
    if rec is None:
        raise HTTPException(status_code=404, detail="not found")
    return JSONResponse(json.loads(rec.model_dump_json()))


@app.get("/eval", response_class=HTMLResponse)
def eval_page(request: Request):
    report_path = EVALS / settings.skin / "last_report.json"
    if report_path.exists():
        report = json.loads(report_path.read_text(encoding="utf-8"))
    else:
        report = run_offline_gold(
            skin_mod=skin,
            settings=settings,
            receipts=receipts,
            client=tf_client,
            backend=backend,
            kill=kill,
            gold_path=EVALS / settings.skin / "gold.jsonl",
        )
        if report.get("n", 0) == 0:
            gold = load_gold(EVALS / settings.skin / "gold.jsonl")
            report = empty_report(settings.skin)
            report["fixture_ids"] = [str(r.get("id", "")) for r in gold][:40]
    blob = redact(json.dumps(report))
    report = json.loads(blob)
    return templates.TemplateResponse(request, "eval.html", _ctx(request, report=report))


def _require_job(job_id: str) -> JobResult:
    job = jobs.get(job_id)
    if job is not None:
        return job
    rec = receipts.get(job_id)
    if rec is None:
        raise HTTPException(status_code=404, detail="not found")
    job = job_from_receipt(rec, receipts.get_reviews(job_id))
    jobs[job_id] = job
    return job


@app.post("/jobs/hostile")
async def hostile_job(
    request: Request,
    x_demo_token: str | None = Header(default=None, alias="X-Demo-Token"),
):
    if not limiter.allow(_client_key(request)):
        raise HTTPException(status_code=429, detail="rate limit")
    form_token = None
    if "application/json" not in (request.headers.get("content-type") or ""):
        try:
            form = await request.form()
            form_token = form.get("token")
        except Exception:
            form_token = None
    _require_token(x_demo_token, form_token or request.query_params.get("token"))
    if not hasattr(skin, "questions"):
        raise HTTPException(status_code=501, detail="skin not implemented")
    fixture = getattr(skin, "HOSTILE_FIXTURE", None)
    if not isinstance(fixture, dict):
        raise HTTPException(status_code=501, detail="skin has no hostile fixture")
    ingested = ingest_json_text(json.dumps(fixture))
    result = run_job(
        settings=settings,
        skin_mod=skin,
        payload=ingested["payload"],
        input_hash=ingested["input_hash"],
        receipts=receipts,
        client=tf_client,
        backend=backend,
        kill=kill,
    )
    jobs[result.id] = result
    if "application/json" in request.headers.get("accept", ""):
        return JSONResponse(
            {
                "id": result.id,
                "action": result.policy.action.value,
                "fixture": str(fixture.get("id") or "hostile"),
            }
        )
    return templates.TemplateResponse(request, "home.html", _ctx(request, job=result))


@app.post("/jobs/{job_id}/accept")
async def accept_job(
    request: Request,
    job_id: str,
    x_demo_token: str | None = Header(default=None, alias="X-Demo-Token"),
):
    form_token = None
    try:
        form = await request.form()
        form_token = form.get("token")
    except Exception:
        form_token = None
    _require_token(x_demo_token, form_token or request.query_params.get("token"))
    job = _require_job(job_id)
    name = settings.named_human or "operator"
    review = receipts.add_review(job.id, name=name, decision="confirm")
    job.reviews.append(review)
    job.receipt.actor = "human"
    receipts.update(job.receipt)
    if "application/json" in request.headers.get("accept", ""):
        return review
    return templates.TemplateResponse(request, "home.html", _ctx(request, job=job, reviews=job.reviews))


@app.post("/jobs/{job_id}/override")
async def override_job(
    request: Request,
    job_id: str,
    x_demo_token: str | None = Header(default=None, alias="X-Demo-Token"),
):
    form_token = None
    try:
        form = await request.form()
        form_token = form.get("token")
    except Exception:
        form_token = None
    _require_token(x_demo_token, form_token or request.query_params.get("token"))
    job = _require_job(job_id)
    name = settings.named_human or "operator"
    was = job.policy.action.value
    job.policy = PolicyResult(
        action=Action.queue,
        reason_codes=list(job.policy.reason_codes) + ["human_override"],
        human_required=True,
        notes=(job.policy.notes + " " if job.policy.notes else "") + f"was {was}",
    )
    job.receipt.policy = job.policy
    job.receipt.actor = "human"
    review = receipts.add_review(job.id, name=name, decision="override_queue")
    job.reviews.append(review)
    receipts.update(job.receipt)
    if "application/json" in request.headers.get("accept", ""):
        return review
    return templates.TemplateResponse(request, "home.html", _ctx(request, job=job, reviews=job.reviews))


@app.get("/exhibit/{job_id}")
def exhibit_pack(job_id: str):
    job = jobs.get(job_id)
    reviews = receipts.get_reviews(job_id)
    if job is not None:
        reviews = reviews or job.reviews
        pack = pack_from_job(
            job,
            reviewer_name=settings.named_human,
            reviewer_role=settings.named_role,
            reviews=reviews,
        )
        return JSONResponse(json.loads(pack.model_dump_json()))
    rec = receipts.get(job_id)
    if rec is None:
        raise HTTPException(status_code=404, detail="not found")
    pack = pack_from_receipt(
        rec,
        reviewer_name=settings.named_human,
        reviewer_role=settings.named_role,
        reviews=reviews,
    )
    return JSONResponse(json.loads(pack.model_dump_json()))
