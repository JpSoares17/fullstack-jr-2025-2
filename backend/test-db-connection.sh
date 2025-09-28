#!/bin/bash

# Script para testar conexão com banco
set -e

echo "🔍 === TESTE DE CONEXÃO COM BANCO ==="

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
fi

# Testar conexão com DATABASE_URL_PUBLIC (se existir)
if [ -n "$DATABASE_URL_PUBLIC" ]; then
    echo "🔍 Testando conexão com DATABASE_URL_PUBLIC..."
    python -c "
import os
from sqlalchemy import create_engine, text
try:
    engine = create_engine(os.getenv('DATABASE_URL_PUBLIC'))
    with engine.connect() as conn:
        result = conn.execute(text('SELECT version()'))
        version = result.fetchone()[0]
        print(f'✅ Conexão com DATABASE_URL_PUBLIC OK')
        print(f'📊 Versão do PostgreSQL: {version}')
except Exception as e:
    print(f'❌ Erro na conexão com DATABASE_URL_PUBLIC: {e}')
"
fi

echo "🎯 Recomendação: Use DATABASE_URL para aplicações no Railway"
