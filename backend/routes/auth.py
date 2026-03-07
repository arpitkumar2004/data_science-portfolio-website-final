"""Authentication endpoints with JWT support and rate limiting."""
from fastapi import APIRouter, Form, Request, Depends
from slowapi import Limiter
from slowapi.util import get_remote_address

from services.auth_service_v2 import authenticate_admin, require_admin

router = APIRouter(prefix="/api/admin", tags=["auth"])
limiter = Limiter(key_func=get_remote_address)

# Auth-specific stricter rate limit to prevent brute-force
_AUTH_RATE_LIMIT = "5/minute"


@router.post("/login")
@limiter.limit(_AUTH_RATE_LIMIT)
async def admin_login(request: Request, password: str = Form(...)):
    """
    Authenticate admin user with password.
    Returns JWT token for stateless authentication.
    Use Authorization: Bearer <access_token> header for subsequent requests.
    """
    return authenticate_admin(password)


@router.get("/me")
async def get_current_admin_info(request: Request, admin: dict = Depends(require_admin)):
    """
    Get current authenticated admin information.
    Requires JWT authentication via Authorization header.
    """
    return {
        "user": admin.get("sub"),
        "role": admin.get("role"),
        "auth_type": "jwt"
    }
