from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Fullstack Jr 2025-2 API",
    description="API desenvolvida com FastAPI e PostgreSQL",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://*.railway.app",  # Permite todos os subdomínios do Railway
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Rotas básicas para teste
@app.get("/")
def read_root():
    return {"message": "Fullstack Jr 2025-2 API", "status": "running"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "message": "API is running"}

# Rotas da API (sem dependências de banco por enquanto)
@app.get("/api/auth/me")
def get_current_user_info():
    return {"message": "Endpoint funcionando - banco não conectado ainda"}

@app.get("/api/tasks/")
def list_tasks():
    return {"message": "Endpoint funcionando - banco não conectado ainda", "tasks": []}

@app.post("/api/auth/register")
def create_user():
    return {"message": "Endpoint funcionando - banco não conectado ainda"}

@app.post("/api/auth/login")
def login():
    return {"message": "Endpoint funcionando - banco não conectado ainda"}
