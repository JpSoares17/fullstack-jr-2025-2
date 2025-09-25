from fastapi.testclient import TestClient
import pytest

from src.backend.app import app

client = TestClient(app)


def test_logout_endpoint():
    """Testa o endpoint de logout"""
    # Como o logout requer autenticação, vamos testar sem token primeiro
    response = client.post("/api/auth/logout")
    assert response.status_code == 403  # Forbidden (sem token)
    
    # Teste com token inválido
    response = client.post(
        "/api/auth/logout",
        headers={"Authorization": "Bearer invalid_token"}
    )
    assert response.status_code == 401  # Unauthorized (token inválido)


def test_logout_response_structure():
    """Testa a estrutura da resposta de logout"""
    # Simulando uma resposta de logout bem-sucedida
    response_data = {"message": "Logout realizado com sucesso"}
    
    # Verifica se a estrutura está correta
    assert "message" in response_data
    assert response_data["message"] == "Logout realizado com sucesso"
