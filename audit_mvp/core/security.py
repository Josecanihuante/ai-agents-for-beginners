from __future__ import annotations

from dataclasses import dataclass

from starlette.middleware.base import BaseHTTPMiddleware
from starlette.requests import Request
from starlette.responses import Response


@dataclass(frozen=True)
class SecurityHeadersConfig:
    content_security_policy: str = (
        "default-src 'self'; "
        "style-src 'self' 'unsafe-inline'; "
        "script-src 'self'; "
        "img-src 'self' data:; "
        "connect-src 'self'; "
        "base-uri 'self'; "
        "form-action 'self'"
    )
    referrer_policy: str = "no-referrer"
    frame_options: str = "DENY"
    content_type_options: str = "nosniff"
    permissions_policy: str = "geolocation=(), microphone=(), camera=()"


class SecurityHeadersMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, config: SecurityHeadersConfig) -> None:
        super().__init__(app)
        self._config = config

    async def dispatch(self, request: Request, call_next) -> Response:
        response = await call_next(request)
        response.headers["Content-Security-Policy"] = self._config.content_security_policy
        response.headers["Referrer-Policy"] = self._config.referrer_policy
        response.headers["X-Frame-Options"] = self._config.frame_options
        response.headers["X-Content-Type-Options"] = self._config.content_type_options
        response.headers["Permissions-Policy"] = self._config.permissions_policy
        response.headers["Cross-Origin-Opener-Policy"] = "same-origin"
        response.headers["Cross-Origin-Resource-Policy"] = "same-origin"
        return response


class UploadSizeLimiter(BaseHTTPMiddleware):
    def __init__(self, app, max_bytes: int) -> None:
        super().__init__(app)
        self._max_bytes = max_bytes

    async def dispatch(self, request: Request, call_next) -> Response:
        content_length = request.headers.get("content-length")
        if content_length is not None and int(content_length) > self._max_bytes:
            return Response("Archivo demasiado grande.", status_code=413)
        return await call_next(request)
