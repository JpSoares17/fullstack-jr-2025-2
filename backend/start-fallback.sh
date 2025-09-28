#!/bin/bash

# Script de fallback para produção no Railway
set -e

echo "🚀 === SCRIPT DE FALLBACK ==="
echo "🌐 Iniciando aplicação com configuração mínima..."

# Verificar variáveis básicas
echo "📋 Variáveis de ambiente:"
echo "PORT: ${PORT:-8000}"
echo "DATABASE_URL: ${DATABASE_URL:-'NÃO CONFIGURADA'}"

# Tentar executar migrações (sem falhar se der erro)
echo "📊 Tentando executar migrações..."
alembic upgrade head || echo "⚠️ Migrações falharam, continuando..."

# Testar importação da aplicação
echo "🔍 Testando importação..."
python -c "
import sys
sys.path.append('.')
try:
    from src.backend.app import app
    print('✅ Aplicação importada com sucesso')
except Exception as e:
    print(f'❌ Erro na importação: {e}')
    exit(1)
"

# Iniciar com uvicorn como fallback
echo "🌐 Iniciando com uvicorn..."
exec uvicorn src.backend.app:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1
