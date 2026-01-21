"""Health check endpoints"""
from fastapi import APIRouter
from config import APP_TITLE, APP_VERSION

router = APIRouter(tags=["health"])


@router.get("/")
async def root():
    """Root health check endpoint"""
    return {"status": "System Operational", "version": APP_VERSION}


@router.get("/hello")
async def hello():
    """Hello endpoint"""
    return {"message": "Hello from Arpit's Portfolio Backend!"}
