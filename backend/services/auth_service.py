"""Authentication service for admin token management"""
import hmac
import secrets
import time
from config import ADMIN_SECRET_KEY, ADMIN_TOKEN_EXPIRY_SECONDS

# In-memory token store: token -> expiry timestamp (unix epoch seconds)
ACTIVE_ADMIN_TOKENS = {}


def validate_admin(admin_key: str = None, admin_token: str = None) -> bool:
    """
    Validate admin credentials using either secret key or active token.
    
    Args:
        admin_key: Direct admin secret key
        admin_token: Previously issued admin token
    
    Returns:
        True if credentials are valid, False otherwise
    """
    now = int(time.time())
    
    # Periodically clean up expired tokens to prevent memory leak
    _maybe_cleanup(now)
    
    # Check secret key with constant-time comparison
    if admin_key and hmac.compare_digest(admin_key.encode("utf-8"), ADMIN_SECRET_KEY.encode("utf-8")):
        return True
    
    # Check token validity and expiry
    if admin_token and ACTIVE_ADMIN_TOKENS.get(admin_token, 0) > now:
        return True
    
    return False


# Track last cleanup time to avoid doing it on every call
_last_cleanup: int = 0
_CLEANUP_INTERVAL = 300  # run cleanup at most every 5 minutes


def _maybe_cleanup(now: int) -> None:
    """Automatically clean up expired tokens periodically."""
    global _last_cleanup
    if now - _last_cleanup >= _CLEANUP_INTERVAL:
        _last_cleanup = now
        cleanup_expired_tokens()


def create_admin_token() -> dict:
    """
    Create a new admin token with expiry time.
    
    Returns:
        Dictionary containing token, expiry info
    """
    token = secrets.token_urlsafe(32)
    now = int(time.time())
    expiry = now + ADMIN_TOKEN_EXPIRY_SECONDS
    
    ACTIVE_ADMIN_TOKENS[token] = expiry
    
    return {
        "is_admin": True,
        "admin_token": token,
        "expires_in": ADMIN_TOKEN_EXPIRY_SECONDS,
        "expiry_timestamp": expiry
    }


def revoke_admin_token(admin_token: str) -> bool:
    """
    Revoke an admin token.
    
    Args:
        admin_token: Token to revoke
    
    Returns:
        True if token was revoked, False if token didn't exist
    """
    if admin_token and admin_token in ACTIVE_ADMIN_TOKENS:
        ACTIVE_ADMIN_TOKENS.pop(admin_token, None)
        return True
    return False


def is_token_expired(admin_token: str) -> bool:
    """Check if a token has expired"""
    now = int(time.time())
    return ACTIVE_ADMIN_TOKENS.get(admin_token, 0) <= now


def cleanup_expired_tokens():
    """Remove all expired tokens from memory"""
    now = int(time.time())
    expired_tokens = [token for token, expiry in ACTIVE_ADMIN_TOKENS.items() if expiry <= now]
    for token in expired_tokens:
        ACTIVE_ADMIN_TOKENS.pop(token, None)
    return len(expired_tokens)
