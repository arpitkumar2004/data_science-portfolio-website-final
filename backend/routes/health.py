"""Health check & system observability diagnostics endpoints"""
import os
import time
from datetime import datetime, timezone
from typing import Dict, Any

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

import database
from config import APP_VERSION
from services.auth_service_v2 import require_admin

router = APIRouter(prefix="/api", tags=["health"])


@router.get("/")
async def root():
    """Root health check endpoint"""
    return {"status": "System Operational", "version": APP_VERSION}


@router.get("/hello")
async def hello():
    """Hello endpoint"""
    return {"message": "Hello from Arpit's Portfolio Backend!"}


@router.get("/admin/health/diagnostics")
async def get_system_diagnostics(
    db: Session = Depends(database.get_db),
    admin: dict = Depends(require_admin)
) -> Dict[str, Any]:
    """
    Observability endpoint: Performs deep diagnostic checks on Database, Mailer,
    Analytics credentials, Rate Limiter, and System status.
    """
    diagnostics = {}

    # 1. Database Ping & Latency
    db_start = time.perf_counter()
    try:
        db.execute(text("SELECT 1"))
        db_latency = round((time.perf_counter() - db_start) * 1000, 2)
        diagnostics["database"] = {
            "status": "healthy",
            "latency_ms": db_latency,
            "engine": db.bind.name if db.bind else "postgresql"
        }
    except Exception as exc:
        diagnostics["database"] = {
            "status": "degraded",
            "error": str(exc)
        }

    # 2. Resend / Email Service Readiness
    resend_key = os.getenv("RESEND_API_KEY")
    smtp_user = os.getenv("SMTP_USERNAME")
    diagnostics["email_service"] = {
        "configured": bool(resend_key or smtp_user),
        "provider": "Resend API" if resend_key else ("SMTP" if smtp_user else "None (Logging Fallback)"),
        "status": "operational" if (resend_key or smtp_user) else "fallback_active"
    }

    # 3. Google Analytics 4 API Credentials
    ga4_property = os.getenv("GA4_PROPERTY_ID")
    ga4_creds = os.getenv("GA4_CREDENTIALS_JSON") or os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
    diagnostics["google_analytics"] = {
        "configured": bool(ga4_property),
        "property_id": ga4_property or "Not Configured",
        "has_credentials": bool(ga4_creds),
        "status": "ready" if (ga4_property and ga4_creds) else "demo/fallback_mode"
    }

    # 4. Google Search Console API Credentials
    gsc_site = os.getenv("GSC_SITE_URL")
    diagnostics["search_console"] = {
        "configured": bool(gsc_site),
        "site_url": gsc_site or "Not Configured",
        "status": "ready" if gsc_site else "demo/fallback_mode"
    }

    # 5. Sentry Error Tracking
    sentry_dsn = os.getenv("SENTRY_DSN")
    diagnostics["sentry"] = {
        "configured": bool(sentry_dsn),
        "status": "active" if sentry_dsn else "inactive"
    }

    # 6. Overall System Summary
    is_healthy = diagnostics["database"]["status"] == "healthy"
    
    return {
        "status": "healthy" if is_healthy else "degraded",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "version": APP_VERSION,
        "environment": os.getenv("ENVIRONMENT", "production"),
        "diagnostics": diagnostics
    }

