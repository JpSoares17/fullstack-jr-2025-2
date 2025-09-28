# Deploy no Railway

Este projeto está configurado para deploy no Railway usando Poetry e Docker.

## Arquivos de Configuração

- `railway.toml`: Configuração principal do Railway
- `Dockerfile`: Imagem Docker otimizada para produção
- `start.sh`: Script de inicialização com migrações automáticas
- `RAILWAY_ENV.md`: Documentação das variáveis de ambiente

## Como Fazer o Deploy

### 1. Conectar ao Railway

1. Acesse [railway.app](https://railway.app)
2. Faça login com sua conta GitHub
3. Clique em "New Project"
4. Selecione "Deploy from GitHub repo"
5. Escolha este repositório

### 2. Configurar Banco de Dados

1. No painel do Railway, clique em "New"
2. Selecione "Database" > "PostgreSQL"
3. Railway criará automaticamente um banco PostgreSQL
4. A variável `DATABASE_URL` será configurada automaticamente

### 3. Configurar Variáveis de Ambiente

No painel do Railway, vá para Settings > Variables e configure:

- `SECRET_KEY`: Gere uma chave secreta forte para JWT
- `ALGORITHM`: HS256 (padrão)
- `ACCESS_TOKEN_EXPIRE_MINUTES`: 30 (padrão)

### 4. Deploy

1. Railway detectará automaticamente o `railway.toml`
2. O build será feito usando o Dockerfile
3. As migrações do banco serão executadas automaticamente via `start.sh`
4. A aplicação será iniciada na porta configurada pelo Railway

## Estrutura do Deploy

- **Build**: Docker com Poetry (`poetry install --only=main`)
- **Start**: Script `start.sh` que executa migrações e inicia a API
- **Health Check**: Endpoint `/docs` para verificação de saúde
- **CORS**: Configurado para permitir domínios do Railway

## Monitoramento

- Acesse `/docs` para ver a documentação interativa da API
- Logs estão disponíveis no painel do Railway
- Métricas de performance no dashboard

## Troubleshooting

### Problemas Comuns

1. **Erro de migração**: Verifique se `DATABASE_URL` está configurada
2. **CORS**: Certifique-se de que o frontend está usando o domínio correto do Railway
3. **Porta**: Railway define automaticamente a porta via variável `PORT`

### Logs

Para ver os logs:
1. Acesse o painel do Railway
2. Clique no seu projeto
3. Vá para a aba "Deployments"
4. Clique no deployment ativo
5. Veja os logs em tempo real
