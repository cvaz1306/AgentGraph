from app.api import api
from database.db import session
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import migrations
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)
app.include_router(api)