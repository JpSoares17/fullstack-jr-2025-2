# Troubleshooting - Railway Deploy

## Problema: Healthcheck Failed

Se o healthcheck está falhando, siga estes passos para identificar o problema:

### 1. Verificar Logs no Railway

1. Acesse o painel do Railway
2. Clique no seu projeto
3. Vá para "Deployments"
4. Clique no deployment ativo
5. Veja os logs em tempo real

### 2. Scripts Disponíveis

- `start.sh`: Script completo com migrações automáticas
- `start-simple.sh`: Script simples sem migrações (para debug)

### 3. Possíveis Problemas

#### A. DATABASE_URL não configurada
**Sintoma**: Erro "DATABASE_URL não está configurada!"
**Solução**: 
1. Adicione um PostgreSQL no Railway
2. Configure a variável DATABASE_URL

#### B. Problemas com Migrações
**Sintoma**: Erro nas migrações do Alembic
**Solução**: 
1. Use temporariamente `start-simple.sh`
2. Execute migrações manualmente depois

#### C. Problemas de CORS
**Sintoma**: Frontend não consegue acessar a API
**Solução**: Verifique se o domínio do frontend está nas origens permitidas

#### D. Porta incorreta
**Sintoma**: Aplicação não responde
**Solução**: Railway define automaticamente a porta via variável `PORT`

### 4. Debug Steps

1. **Teste com script simples**:
   ```toml
   startCommand = "./start-simple.sh"
   ```

2. **Verifique variáveis de ambiente**:
   - DATABASE_URL
   - SECRET_KEY
   - PORT (definida automaticamente pelo Railway)

3. **Teste localmente**:
   ```bash
   # No diretório backend
   poetry install
   fastapi run src/backend/app.py --host 0.0.0.0 --port 8000
   ```

### 5. Voltar ao Script Completo

Quando tudo estiver funcionando, volte para o script completo:

```toml
startCommand = "./start.sh"
```

### 6. Comandos Úteis

- **Ver logs**: Railway Dashboard > Deployments > Logs
- **Testar endpoint**: `https://seu-app.railway.app/docs`
- **Verificar saúde**: `https://seu-app.railway.app/docs` (healthcheck)
