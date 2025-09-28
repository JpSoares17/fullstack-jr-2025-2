#!/bin/bash

# Script de start simples para produção no Railway
# Versão sem migrações automáticas para debug

set -e  # Exit on any error

echo "🚀 Iniciando aplicação FastAPI (versão simples)..."

# Verificar se DATABASE_URL está configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERRO: DATABASE_URL não está configurada!"
    echo "DATABASE_URL atual: '$DATABASE_URL'"
    exit 1
fi

echo "✅ DATABASE_URL configurada: ${DATABASE_URL:0:20}..."

# Verificar se a porta está configurada
echo "🌐 Porta configurada: ${PORT:-8000}"

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000}
