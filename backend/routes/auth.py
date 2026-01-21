"""Authentication endpoints"""
from fastapi import APIRouter, Form, HTTPException, status
from services.auth_service import validate_admin, create_admin_token, revoke_admin_token
from config import ADMIN_SECRET_KEY

router = APIRouter(prefix="/admin", tags=["auth"])


@router.post("/login")
async def admin_login(password: str = Form(...)):
    """
    Authenticate admin user with password.
    Returns a token valid for 1 hour.
    """
    if password != ADMIN_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    token_info = create_admin_token()
    return token_info


@router.post("/logout")
async def admin_logout(admin_token: str = None):
    """Logout admin user by revoking token"""
    revoke_admin_token(admin_token)
    return {"status": "logged_out"}


@router.get("/validate")
async def validate_admin_token(admin_token: str = None, admin_key: str = None):
    """
    Validate admin credentials.
    Can use either admin_token (from login) or admin_key (direct secret).
    """
    if validate_admin(admin_key=admin_key, admin_token=admin_token):
        return {"is_admin": True}
    
    raise HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token"
    )
