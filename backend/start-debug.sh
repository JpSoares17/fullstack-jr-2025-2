#!/bin/bash

# Script de debug para identificar problemas
set -e

echo "🔍 === DEBUG MODE ==="
echo "🚀 Iniciando aplicação FastAPI (modo debug)..."

# Mostrar todas as variáveis de ambiente relacionadas ao banco
echo "📋 Variáveis de ambiente:"
echo "DATABASE_URL: ${DATABASE_URL:-'NÃO CONFIGURADA'}"
echo "PORT: ${PORT:-8000}"
echo "SECRET_KEY: ${SECRET_KEY:-'NÃO CONFIGURADA'}"

# Verificar se o arquivo da aplicação existe
echo "📁 Verificando arquivos:"
if [ -f "src/backend/app.py" ]; then
    echo "✅ src/backend/app.py existe"
else
    echo "❌ src/backend/app.py NÃO existe"
    ls -la src/backend/
fi

# Verificar se o fastapi está instalado
echo "🐍 Verificando Python e FastAPI:"
python --version
fastapi --version

# Tentar importar a aplicação
echo "📦 Testando importação da aplicação:"
python -c "
try:
    import sys
    sys.path.append('.')
    from src.backend.app import app
    print('✅ Aplicação importada com sucesso')
except Exception as e:
    print(f'❌ Erro ao importar aplicação: {e}')
    import traceback
    traceback.print_exc()
"

# Iniciar a aplicação com mais logs
echo "🌐 Iniciando servidor FastAPI com logs detalhados..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000} --log-level debug
