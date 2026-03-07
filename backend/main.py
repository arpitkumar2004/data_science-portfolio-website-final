"""
Main FastAPI application initialization and middleware setup.
All business logic is modularized into separate services and routes.
"""
import logging
import os

import sentry_sdk
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

import models
import database
from config import CORS_ORIGINS, APP_TITLE, APP_VERSION

logger = logging.getLogger("uvicorn.error")

# ── Sentry error tracking (only active when DSN is configured) ──
_sentry_dsn = os.getenv("SENTRY_DSN")
if _sentry_dsn:
    sentry_sdk.init(
        dsn=_sentry_dsn,
        traces_sample_rate=0.2,
        environment=os.getenv("SENTRY_ENV", "production"),
    )

# Create database tables if they don't exist
models.Base.metadata.create_all(bind=database.engine)


# ── Rate limiter with proxy-aware IP extraction ──
def _get_real_ip(request: Request) -> str:
    """Extract real client IP from X-Forwarded-For (proxy-safe)."""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "127.0.0.1"


limiter = Limiter(key_func=_get_real_ip)

# Initialize FastAPI app
app = FastAPI(title=APP_TITLE, version=APP_VERSION)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["authorization", "content-type", "accept", "origin"],
    expose_headers=["content-type", "authorization"],
)


# ── Security headers middleware ──
@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    """Inject OWASP-recommended security headers on every response."""
    response = await call_next(request)
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    return response


# ── Global exception handler ──
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    """Catch unhandled exceptions, log them, and return a safe 500 response."""
    logger.exception("Unhandled exception on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# Include route routers
from routes import health, auth, leads, projects, about

# Health routes - include at both /api and root level for compatibility
app.include_router(health.router)  # Includes at /api prefix (default)
app.include_router(health.router, prefix="")  # Also include at root level for backward compatibility

# Auth routes
app.include_router(auth.router)

# Leads routes - register only once to avoid duplication/ambiguity
app.include_router(leads.router)

# Projects routes - admin CRUD for portfolio projects
app.include_router(projects.router)

# Projects public routes - no auth, for portfolio frontend
app.include_router(projects.public_router)

# About Me public route - serves profile data for About page
app.include_router(about.router)
