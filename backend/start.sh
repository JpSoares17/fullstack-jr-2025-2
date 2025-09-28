#!/bin/bash

# Script de start para produção no Railway
# Este script executa migrações do banco de dados antes de iniciar a aplicação

echo "🚀 Iniciando aplicação FastAPI..."

# Executar migrações do banco de dados
echo "📊 Executando migrações do banco de dados..."
alembic upgrade head

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000}
