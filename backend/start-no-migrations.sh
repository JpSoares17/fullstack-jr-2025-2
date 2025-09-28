#!/bin/bash

# Script sem migrações automáticas para debug
set -e

echo "🚀 === APLICAÇÃO SEM MIGRAÇÕES ==="
echo "🌐 Iniciando FastAPI sem executar migrações..."

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

# Verificar se o arquivo da aplicação existe
echo "📁 Verificando arquivos:"
if [ -f "src/backend/app.py" ]; then
    echo "✅ src/backend/app.py existe"
else
    echo "❌ src/backend/app.py NÃO existe"
    ls -la src/backend/
fi

# Testar conexão com banco (sem executar migrações)
echo "🔍 Testando conexão com banco..."
python -c "
import os
from sqlalchemy import create_engine, text
try:
    engine = create_engine(os.getenv('DATABASE_URL'))
    with engine.connect() as conn:
        result = conn.execute(text('SELECT 1'))
        print('✅ Conexão com banco OK')
except Exception as e:
    print(f'❌ Erro na conexão com banco: {e}')
    exit(1)
"

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000}
