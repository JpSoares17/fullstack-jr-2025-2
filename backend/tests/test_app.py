from fastapi.testclient import TestClient

from src.backend import app

client = TestClient(app)
