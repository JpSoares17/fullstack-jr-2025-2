#!/bin/bash

# Script que testa conexão e inicia aplicação
set -e

echo "🚀 === APLICAÇÃO COM TESTE DE BANCO ==="

# Mostrar todas as variáveis relacionadas ao banco
echo "📋 Variáveis de ambiente do banco:"
echo "DATABASE_URL: ${DATABASE_URL:-'NÃO CONFIGURADA'}"
echo "DATABASE_URL_PUBLIC: ${DATABASE_URL_PUBLIC:-'NÃO CONFIGURADA'}"

# Testar conexão com DATABASE_URL
if [ -n "$DATABASE_URL" ]; then
    echo "🔍 Testando conexão com DATABASE_URL..."
    python -c "
import os
from sqlalchemy import create_engine, text
try:
    engine = create_engine(os.getenv('DATABASE_URL'))
    with engine.connect() as conn:
        result = conn.execute(text('SELECT version()'))
        version = result.fetchone()[0]
        print(f'✅ Conexão com DATABASE_URL OK')
        print(f'📊 Versão do PostgreSQL: {version}')
        
        # Testar se consegue criar uma tabela de teste
        conn.execute(text('CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name VARCHAR(50))'))
        conn.execute(text('DROP TABLE IF EXISTS test_table'))
        print('✅ Permissões de criação/drop OK')
        
except Exception as e:
    print(f'❌ Erro na conexão com DATABASE_URL: {e}')
    exit(1)
"
else
    echo "❌ DATABASE_URL não está configurada!"
    exit 1
fi

# Executar migrações
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
