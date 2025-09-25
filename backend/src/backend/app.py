from fastapi import FastAPI

from backend.routes import auth_router


app = FastAPI(
    title="Fullstack Jr 2025-2 API",
    description="API desenvolvida com FastAPI e PostgreSQL",
    version="0.1.0",
)

app.include_router(auth_router)
