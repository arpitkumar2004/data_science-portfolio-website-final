"""
Main FastAPI application initialization and middleware setup.
All business logic is modularized into separate services and routes.
"""
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware

import models
import database
from config import CORS_ORIGINS, APP_TITLE, APP_VERSION

# Create database tables if they don't exist
models.Base.metadata.create_all(bind=database.engine)

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

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
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include route routers
from routes import health, auth, leads
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(leads.router)

# Root endpoint for health checks and monitoring
@app.get("/")
async def root():
    """Root endpoint - redirects to API docs"""
    return {
        "message": "Arpit's Portfolio Backend API",
        "version": APP_VERSION,
        "status": "operational",
        "docs": "/docs",
        "health": "/api/"
    }

@app.get("/hello")
async def hello_root():
    """Hello endpoint at root level"""
    return {"message": "Hello from Arpit's Portfolio Backend!", "version": APP_VERSION}
