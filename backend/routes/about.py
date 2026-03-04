"""
About/Profile public endpoint.
Serves dynamic profile data from JSON for the About Me page.
Data is loaded once at startup and cached in-memory.
"""
import json
import logging
from pathlib import Path
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from slowapi import Limiter
from slowapi.util import get_remote_address

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/about", tags=["about"])
limiter = Limiter(key_func=get_remote_address)

DATA_FILE = Path(__file__).resolve().parent.parent / "data" / "about.json"

# ── In-memory cache (loaded once at import time) ──
_about_cache: dict | None = None


def _load_about_data() -> dict:
    """Load about data from JSON file (with in-memory cache)."""
    global _about_cache
    if _about_cache is not None:
        return _about_cache
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        _about_cache = json.load(f)
    logger.info("About data loaded from %s", DATA_FILE)
    return _about_cache


@router.get(
    "",
    summary="Get About Me data (public)",
    response_class=JSONResponse,
)
async def get_about_data(request: Request):
    """
    Public endpoint at /api/about — returns all profile/about-me data
    for the portfolio frontend. No authentication required.
    """
    try:
        data = _load_about_data()
        return JSONResponse(content=data, headers={"Cache-Control": "public, max-age=3600"})
    except FileNotFoundError:
        return JSONResponse(
            content={"error": "About data not found"},
            status_code=404,
        )
    except json.JSONDecodeError:
        return JSONResponse(
            content={"error": "Invalid about data format"},
            status_code=500,
        )
