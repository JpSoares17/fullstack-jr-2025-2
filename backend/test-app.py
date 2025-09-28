from fastapi import FastAPI

# Aplicação de teste mínima
app = FastAPI(title="Test API")

@app.get("/")
def read_root():
    return {"message": "Hello World", "status": "ok"}

@app.get("/docs")
def get_docs():
    return {"message": "Docs endpoint working"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
