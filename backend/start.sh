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

echo "✅ DATABASE_URL configurada: ${DATABASE_URL:0:30}..."

# Verificar outras variáveis importantes
echo "📋 Variáveis de ambiente:"
echo "PORT: ${PORT:-8000}"
echo "SECRET_KEY: ${SECRET_KEY:-'NÃO CONFIGURADA'}"

# Executar migrações do banco de dados
echo "📊 Executando migrações do banco de dados..."
if alembic upgrade head; then
    echo "✅ Migrações executadas com sucesso"
else
    echo "❌ ERRO: Falha ao executar migrações"
    echo "🔍 Tentando executar migrações com mais detalhes..."
    alembic upgrade head --verbose || {
        echo "❌ Migrações falharam, mas continuando sem elas..."
    }
fi

# Verificar se a aplicação pode ser importada
echo "🔍 Testando importação da aplicação..."
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
    exit(1)
"

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000}
