from __future__ import annotations

from pathlib import Path

from fastapi import FastAPI
from starlette.responses import FileResponse
from starlette.staticfiles import StaticFiles

from audit_mvp.api.routes import router as api_router
from audit_mvp.core.security import SecurityHeadersConfig, SecurityHeadersMiddleware, UploadSizeLimiter

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="AuditPro AI", docs_url=None, redoc_url=None)
app.add_middleware(SecurityHeadersMiddleware, config=SecurityHeadersConfig())
app.add_middleware(UploadSizeLimiter, max_bytes=10 * 1024 * 1024)

app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
app.include_router(api_router)


@app.get("/")
async def landing_page() -> FileResponse:
    return FileResponse(STATIC_DIR / "index.html")


@app.get("/dashboard")
async def dashboard_page() -> FileResponse:
    return FileResponse(STATIC_DIR / "dashboard.html")
