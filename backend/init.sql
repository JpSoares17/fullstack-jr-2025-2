-- Script de inicialização do banco de dados
-- Este arquivo será executado automaticamente quando o container PostgreSQL for criado

-- Criar extensões úteis
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Criar schema se não existir
CREATE SCHEMA IF NOT EXISTS public;

-- Criar super user para desenvolvimento
-- (Apenas se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'admin') THEN
        CREATE USER admin WITH SUPERUSER CREATEDB CREATEROLE LOGIN PASSWORD 'admin123';
    END IF;
END
$$;

-- Criar usuário para aplicação
-- (Apenas se não existir)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'app_user') THEN
        CREATE USER app_user WITH CREATEDB LOGIN PASSWORD 'app123';
    END IF;
END
$$;

-- Comentário para indicar que o banco foi inicializado
COMMENT ON DATABASE fullstack_db IS 'Banco de dados para aplicação Fullstack Jr 2025-2';
