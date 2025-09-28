#!/bin/bash

# Script de start para produção no Railway
# Este script executa migrações do banco de dados antes de iniciar a aplicação

set -e  # Exit on any error

echo "🚀 Iniciando aplicação FastAPI..."

# Verificar se DATABASE_URL está configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERRO: DATABASE_URL não está configurada!"
    exit 1
fi

if alembic upgrade head; then
    echo "✅ Migrações executadas com sucesso"
else
    echo "❌ ERRO: Falha ao executar migrações"
    echo "🔍 Tentando executar migrações com mais detalhes..."
    alembic upgrade head --verbose || {
        echo "❌ Migrações falharam, mas continuando sem elas..."
    }
fi

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec uvicorn src.backend.app:app --host 0.0.0.0 --port ${PORT:-8000}
