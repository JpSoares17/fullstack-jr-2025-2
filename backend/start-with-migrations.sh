#!/bin/bash

# Script com migrações manuais para debug
set -e

echo "🚀 === APLICAÇÃO COM MIGRAÇÕES ==="
echo "🌐 Iniciando FastAPI com migrações manuais..."

# Verificar se DATABASE_URL está configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERRO: DATABASE_URL não está configurada!"
    exit 1
fi

echo "✅ DATABASE_URL configurada: ${DATABASE_URL:0:30}..."

# Verificar outras variáveis
echo "📋 Variáveis de ambiente:"
echo "SECRET_KEY: ${SECRET_KEY:-'NÃO CONFIGURADA'}"
echo "PORT: ${PORT:-8000}"

# Executar migrações manualmente
echo "📊 Executando migrações do banco de dados..."
if alembic upgrade head; then
    echo "✅ Migrações executadas com sucesso"
else
    echo "❌ ERRO: Falha ao executar migrações"
    echo "🔍 Tentando executar migrações com mais detalhes..."
    alembic upgrade head --verbose
fi

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000}
