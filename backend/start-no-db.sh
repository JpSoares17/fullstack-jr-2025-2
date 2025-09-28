#!/bin/bash

# Script para aplicação sem dependências de banco
set -e

echo "🚀 === APLICAÇÃO SEM BANCO ==="
echo "🌐 Iniciando FastAPI sem dependências de banco..."

# Mostrar variáveis de ambiente
echo "📋 Variáveis de ambiente:"
echo "PORT: ${PORT:-8000}"
echo "DATABASE_URL: ${DATABASE_URL:-'NÃO CONFIGURADA'}"

# Verificar se o arquivo existe
echo "📁 Verificando arquivos:"
if [ -f "app-no-db.py" ]; then
    echo "✅ app-no-db.py existe"
else
    echo "❌ app-no-db.py NÃO existe"
    ls -la
fi

# Iniciar a aplicação
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run app-no-db.py --host 0.0.0.0 --port ${PORT:-8000}
