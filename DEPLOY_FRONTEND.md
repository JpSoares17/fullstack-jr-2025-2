# Deploy do Frontend no Vercel

## Configurações Realizadas

### 1. Arquivo `vercel.json`
Criado com configurações otimizadas para o Vercel:
- Framework Next.js
- Região: `iad1` (Virginia, EUA)
- Timeout de 30 segundos para funções
- Configuração de rotas

### 2. Ajustes no `next.config.ts`
- Removido `output: 'standalone'` (específico para Docker)
- Habilitado `unoptimized: true` para imagens
- Configurações de produção otimizadas
- Headers CORS configurados

### 3. Build Testado
✅ Build local funcionando corretamente

## Variáveis de Ambiente Necessárias no Vercel

Configure as seguintes variáveis de ambiente no painel do Vercel:

### Obrigatórias:
```
NEXT_PUBLIC_API_BASE_URL=https://seu-backend-url.com
NODE_ENV=production
```

### Opcionais:
```
NEXT_PUBLIC_APP_NAME=Fullstack App
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_LOG_LEVEL=info
```

## Passos para Deploy

### 1. Conectar Repositório
- Acesse [vercel.com](https://vercel.com)
- Faça login com sua conta GitHub
- Clique em "New Project"
- Selecione seu repositório

### 2. Configurar Projeto
- **Framework Preset**: Next.js (detectado automaticamente)
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (padrão)
- **Output Directory**: `.next` (padrão)

### 3. Configurar Variáveis de Ambiente
- Na seção "Environment Variables"
- Adicione `NEXT_PUBLIC_API_BASE_URL` com a URL do seu backend
- Configure `NODE_ENV=production`

### 4. Deploy
- Clique em "Deploy"
- Aguarde o processo de build
- Acesse a URL fornecida

## Verificações Pós-Deploy

1. **Teste de Conectividade**: Verifique se o frontend consegue se conectar ao backend
2. **Autenticação**: Teste login/registro
3. **Funcionalidades**: Teste todas as páginas e funcionalidades
4. **Performance**: Verifique velocidade de carregamento

## Troubleshooting

### Build Falha
- Verifique se todas as dependências estão no `package.json`
- Confirme se as variáveis de ambiente estão configuradas
- Verifique logs de build no Vercel

### Erro de CORS
- Confirme se o backend está configurado para aceitar requisições do domínio do Vercel
- Verifique se `NEXT_PUBLIC_API_BASE_URL` está correto

### Problemas de Performance
- Verifique se as imagens estão sendo servidas corretamente
- Confirme se o cache está funcionando

## URLs Importantes

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Documentação Vercel**: https://vercel.com/docs
- **Next.js no Vercel**: https://vercel.com/docs/frameworks/nextjs
