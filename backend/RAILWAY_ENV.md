# Variáveis de Ambiente para Railway

Configure as seguintes variáveis de ambiente no painel do Railway:

## Banco de Dados PostgreSQL
- `DATABASE_URL`: URL completa do banco PostgreSQL (Railway fornece automaticamente)

## Configurações da Aplicação
- `SECRET_KEY`: Chave secreta para JWT (gere uma chave forte)
- `ALGORITHM`: Algoritmo para JWT (padrão: HS256)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: Tempo de expiração do token (padrão: 30)

## Configurações do Banco de Dados (alternativas ao DATABASE_URL)
- `DB_HOST`: Host do banco de dados
- `DB_PORT`: Porta do banco de dados (padrão: 5432)
- `DB_NAME`: Nome do banco de dados
- `DB_USER`: Usuário do banco de dados
- `DB_PASSWORD`: Senha do banco de dados

## Ambiente
- `ENVIRONMENT`: Ambiente de execução (production)

## Exemplo de configuração no Railway:
1. Acesse o painel do Railway
2. Vá para Settings > Variables
3. Adicione as variáveis necessárias
4. Railway automaticamente fornece `DATABASE_URL` quando você conecta um banco PostgreSQL
