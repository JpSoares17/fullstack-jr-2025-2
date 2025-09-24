from fastapi import FastAPI

from backend.routes import auth_router

app = FastAPI()

app.include_router(auth_router)
