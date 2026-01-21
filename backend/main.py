"""
Main FastAPI application initialization and middleware setup.
All business logic is modularized into separate services and routes.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
import database
from config import CORS_ORIGINS, APP_TITLE, APP_VERSION
from routes import health, auth, leads

# Create database tables if they don't exist
models.Base.metadata.create_all(bind=database.engine)

# Initialize FastAPI app
app = FastAPI(title=APP_TITLE, version=APP_VERSION)

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
app.include_router(health.router)
app.include_router(auth.router)
app.include_router(leads.router)
