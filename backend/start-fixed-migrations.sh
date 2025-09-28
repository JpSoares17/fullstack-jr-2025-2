#!/bin/bash

# Script com migrações corrigidas
set -e

echo "🚀 === APLICAÇÃO COM MIGRAÇÕES CORRIGIDAS ==="

# Verificar se DATABASE_URL está configurada
if [ -z "$DATABASE_URL" ]; then
    echo "❌ ERRO: DATABASE_URL não está configurada!"
    exit 1
fi

echo "✅ DATABASE_URL configurada: ${DATABASE_URL:0:30}..."

# Verificar arquivos do Alembic
echo "📁 Verificando arquivos do Alembic:"
if [ -f "alembic.ini" ]; then
    echo "✅ alembic.ini existe"
else
    echo "❌ alembic.ini NÃO existe"
    ls -la
fi

if [ -d "migrations" ]; then
    echo "✅ diretório migrations existe"
    ls -la migrations/
else
    echo "❌ diretório migrations NÃO existe"
fi

# Executar migrações com caminho explícito
echo "📊 Executando migrações do banco de dados..."
echo "🔍 Diretório atual: $(pwd)"
echo "🔍 Conteúdo do diretório:"
ls -la

# Tentar executar migrações de diferentes formas
echo "🔍 Tentativa 1: alembic upgrade head"
if alembic upgrade head; then
    echo "✅ Migrações executadas com sucesso"
else
    echo "❌ Tentativa 1 falhou"
    
    echo "🔍 Tentativa 2: alembic -c alembic.ini upgrade head"
    if alembic -c alembic.ini upgrade head; then
        echo "✅ Migrações executadas com sucesso (tentativa 2)"
    else
        echo "❌ Tentativa 2 falhou"
        
        echo "🔍 Tentativa 3: python -m alembic upgrade head"
        if python -m alembic upgrade head; then
            echo "✅ Migrações executadas com sucesso (tentativa 3)"
        else
            echo "❌ Todas as tentativas falharam"
            echo "🔍 Executando sem migrações por enquanto..."
        fi
    fi
fi

# Iniciar a aplicação FastAPI
echo "🌐 Iniciando servidor FastAPI..."
exec fastapi run src/backend/app.py --host 0.0.0.0 --port ${PORT:-8000}
