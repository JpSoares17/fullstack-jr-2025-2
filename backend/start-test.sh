#!/bin/bash

# Script de teste com aplicação mínima
set -e

echo "🧪 === TEST MODE ==="
echo "🚀 Iniciando aplicação de teste..."

# Mostrar variáveis de ambiente
echo "📋 Variáveis de ambiente:"
echo "PORT: ${PORT:-8000}"

# Verificar se o arquivo de teste existe
echo "📁 Verificando arquivos:"
if [ -f "test-app.py" ]; then
    echo "✅ test-app.py existe"
else
    echo "❌ test-app.py NÃO existe"
    ls -la
fi

# Iniciar a aplicação de teste
echo "🌐 Iniciando aplicação de teste..."
exec fastapi run test-app.py --host 0.0.0.0 --port ${PORT:-8000}
