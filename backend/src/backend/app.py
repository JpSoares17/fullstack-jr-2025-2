from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.routes import auth_router, tasks_router


app = FastAPI(
    title="Fullstack Jr 2025-2 API",
    description="API desenvolvida com FastAPI e PostgreSQL",
    version="0.1.0",
)

# Configurar CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos HTTP
    allow_headers=["*"],  # Permite todos os headers
)

app.include_router(auth_router)
app.include_router(tasks_router)
