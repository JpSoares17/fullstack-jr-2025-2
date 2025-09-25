# 📚 Documentação Completa - Projeto Fullstack Jr 2025-2

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Arquitetura](#arquitetura)
3. [Pré-requisitos](#pré-requisitos)
4. [Instalação e Configuração](#instalação-e-configuração)
5. [Executando a Aplicação](#executando-a-aplicação)
6. [Funcionalidades Principais](#funcionalidades-principais)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [API Endpoints](#api-endpoints)
9. [Páginas da Aplicação](#páginas-da-aplicação)
10. [Tecnologias Utilizadas](#tecnologias-utilizadas)
11. [Configurações Avançadas](#configurações-avançadas)
12. [Troubleshooting](#troubleshooting)

---

## 🎯 Visão Geral

Este é um projeto fullstack moderno desenvolvido como parte do programa Fullstack Jr 2025-2. A aplicação consiste em um sistema de gerenciamento de tarefas com autenticação completa, construído com tecnologias atuais e melhores práticas de desenvolvimento.

### Características Principais:
- ✅ **Autenticação JWT** completa com login/registro
- ✅ **Sistema de Tarefas** com CRUD completo
- ✅ **Interface Moderna** com Tailwind CSS e modo escuro
- ✅ **Validação Type-Safe** com Zod
- ✅ **API RESTful** com FastAPI
- ✅ **Banco de Dados PostgreSQL** com migrações
- ✅ **Containerização** com Docker
- ✅ **TypeScript** em todo o frontend

---

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend       │    │   Database      │
│   Next.js 15    │◄──►│   FastAPI       │◄──►│   PostgreSQL    │
│   TypeScript    │    │   Python 3.13   │    │   15-alpine     │
│   Tailwind CSS  │    │   SQLAlchemy    │    │   UUID Support  │
│   Zod           │    │   JWT Auth      │    │   Migrations    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Fluxo de Dados:
1. **Frontend** → Validação com Zod → Requisições HTTP
2. **Backend** → Autenticação JWT → Validação Pydantic → SQLAlchemy
3. **Database** → PostgreSQL com UUIDs e timestamps automáticos

---

## 🔧 Pré-requisitos

### Software Necessário:
- **Docker** e **Docker Compose** (recomendado)
- **Node.js 22+** (para desenvolvimento frontend)
- **Python 3.13** (para desenvolvimento backend)
- **Poetry** (gerenciador de dependências Python)
- **Git** (controle de versão)

### Verificação dos Pré-requisitos:
```bash
# Verificar versões
docker --version
docker-compose --version
node --version
python --version
poetry --version
```

---

## 🚀 Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone <url-do-repositorio>
cd fullstack-jr-2025-2
```

### 2. Configuração do Backend

#### Criar arquivo de ambiente:
```bash
cd backend
cp .env.example .env
```

#### Configurar variáveis no `.env`:
```env
# Database
DATABASE_URL=postgresql://postgres:postgres123@postgres:5432/fullstack_db
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=fullstack_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres123

# Application
DEBUG=True
SECRET_KEY=sua-chave-secreta-aqui-mude-em-producao
```

### 3. Configuração do Frontend

#### Instalar dependências:
```bash
cd frontend
npm install
```

#### Configurar variáveis de ambiente:
```bash
cp .env.example .env.local
```

#### Configurar `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_APP_NAME=Fullstack App
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

---

## 🏃‍♂️ Executando a Aplicação

### Opção 1: Docker Compose (Recomendado)

```bash
# Na raiz do projeto
docker-compose up --build
```

**Serviços disponíveis:**
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000
- **Database**: localhost:5432
- **API Docs**: http://localhost:8000/docs

### Opção 2: Desenvolvimento Local

#### Terminal 1 - Backend:
```bash
cd backend
poetry install
poetry run task run
```

#### Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

#### Terminal 3 - Database (se necessário):
```bash
# Usar PostgreSQL local ou Docker
docker run --name postgres-dev \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=fullstack_db \
  -p 5432:5432 \
  -d postgres:15-alpine
```

### Verificação da Instalação

1. **Frontend**: Acesse http://localhost:3000
2. **Backend**: Acesse http://localhost:8000/docs
3. **Database**: Conecte com as credenciais configuradas

---

## ⭐ Funcionalidades Principais

### 🔐 Sistema de Autenticação

#### Registro de Usuário
- Validação completa com Zod
- Senha com hash bcrypt
- Email único no sistema
- Redirecionamento automático após cadastro

#### Login
- Autenticação JWT
- Token armazenado no localStorage
- Verificação automática de autenticação
- Redirecionamento para tarefas após login

#### Logout
- Remoção do token JWT
- Limpeza do estado de autenticação
- Redirecionamento para página inicial

### 📝 Sistema de Tarefas

#### Criação de Tarefas
- Título e descrição obrigatórios
- Status: Pendente, Em Progresso, Concluída
- Prioridade: Baixa, Média, Alta
- Data e hora de vencimento
- Validação em tempo real

#### Gerenciamento de Tarefas
- **Listar**: Todas as tarefas do usuário
- **Editar**: Modal com formulário completo
- **Excluir**: Confirmação antes da exclusão
- **Toggle Status**: Alternar entre concluída/pendente
- **Filtros**: Por status e prioridade

#### Interface Intuitiva
- Cards responsivos com informações claras
- Cores diferenciadas por status e prioridade
- Modo escuro/claro
- Animações suaves

---

## 📁 Estrutura do Projeto

```
fullstack-jr-2025-2/
├── backend/                    # API FastAPI
│   ├── src/backend/
│   │   ├── app.py             # Aplicação principal
│   │   ├── auth.py            # Autenticação JWT
│   │   ├── database.py        # Configuração SQLAlchemy
│   │   ├── models.py          # Modelos de dados
│   │   ├── routes.py         # Endpoints da API
│   │   └── schemas.py         # Schemas Pydantic
│   ├── migrations/            # Migrações Alembic
│   ├── tests/                # Testes unitários
│   ├── Dockerfile            # Container backend
│   ├── pyproject.toml        # Dependências Python
│   └── init.sql              # Script inicialização DB
├── frontend/                   # Aplicação Next.js
│   ├── src/
│   │   ├── app/              # App Router Next.js
│   │   │   ├── page.tsx      # Página inicial
│   │   │   ├── login/        # Página de login
│   │   │   ├── register/     # Página de registro
│   │   │   └── tasks/        # Página de tarefas
│   │   ├── components/       # Componentes React
│   │   ├── hooks/           # Hooks customizados
│   │   ├── lib/             # Utilitários e configurações
│   │   └── contexts/        # Contextos React
│   ├── public/              # Arquivos estáticos
│   ├── package.json         # Dependências Node.js
│   └── tailwind.config.ts   # Configuração Tailwind
├── docker-compose.yml        # Orquestração containers
└── README.md                # Documentação principal
```

---

## 🔌 API Endpoints

### Autenticação (`/api/auth`)

#### POST `/api/auth/register`
**Registrar novo usuário**
```json
{
  "name": "João Silva",
  "email": "joao@email.com",
  "password": "senha123"
}
```
**Resposta:**
```json
{
  "id": "uuid",
  "name": "João Silva",
  "email": "joao@email.com"
}
```

#### POST `/api/auth/login`
**Fazer login**
```json
{
  "email": "joao@email.com",
  "password": "senha123"
}
```
**Resposta:**
```json
{
  "access_token": "jwt_token",
  "token_type": "bearer",
  "user": {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com"
  }
}
```

#### POST `/api/auth/logout`
**Fazer logout** (requer autenticação)

#### GET `/api/auth/me`
**Obter dados do usuário atual** (requer autenticação)

### Tarefas (`/api/tasks`)

#### GET `/api/tasks`
**Listar tarefas do usuário** (requer autenticação)
**Resposta:**
```json
{
  "tasks": [
    {
      "id": "uuid",
      "title": "Título da tarefa",
      "description": "Descrição da tarefa",
      "status": "pending",
      "priority": "medium",
      "due_date": "2024-01-15T10:30:00",
      "created_at": "2024-01-01T10:00:00",
      "updated_at": "2024-01-01T10:00:00"
    }
  ]
}
```

#### POST `/api/tasks`
**Criar nova tarefa** (requer autenticação)
```json
{
  "title": "Nova tarefa",
  "description": "Descrição da tarefa",
  "status": "pending",
  "priority": "medium",
  "due_date": "2024-01-15T10:30:00"
}
```

#### PUT `/api/tasks/{task_id}`
**Atualizar tarefa** (requer autenticação)
```json
{
  "title": "Título atualizado",
  "status": "completed"
}
```

#### DELETE `/api/tasks/{task_id}`
**Excluir tarefa** (requer autenticação)

---

## 📄 Páginas da Aplicação

### 🏠 Página Inicial (`/`)
- **Descrição**: Landing page com navegação principal
- **Funcionalidades**:
  - Apresentação do projeto
  - Links para login e tarefas
  - Mensagem de boas-vindas para usuários autenticados
  - Design responsivo com gradientes

### 🔐 Página de Login (`/login`)
- **Descrição**: Autenticação de usuários
- **Funcionalidades**:
  - Formulário com validação Zod
  - Campos: email e senha
  - Validação em tempo real
  - Redirecionamento automático se já autenticado
  - Link para página de registro
  - Estados de loading e erro

### 📝 Página de Registro (`/register`)
- **Descrição**: Cadastro de novos usuários
- **Funcionalidades**:
  - Formulário completo com validação
  - Campos: nome, email, senha, confirmar senha
  - Validação de senhas coincidentes
  - Feedback visual de validação
  - Redirecionamento após cadastro
  - Link para página de login

### ✅ Página de Tarefas (`/tasks`)
- **Descrição**: Gerenciamento completo de tarefas
- **Funcionalidades**:
  - **Proteção de rota**: Requer autenticação
  - **Listagem**: Todas as tarefas do usuário
  - **Criação**: Formulário inline para nova tarefa
  - **Edição**: Modal com formulário completo
  - **Exclusão**: Botão com confirmação
  - **Toggle**: Alternar status concluída/pendente
  - **Filtros visuais**: Cores por status e prioridade
  - **Responsivo**: Adaptado para mobile

#### Componentes da Página de Tarefas:
- **Header**: Título, saudação e botões de ação
- **Formulário de Criação**: Campos para nova tarefa
- **Lista de Tarefas**: Cards com informações completas
- **Modal de Edição**: Formulário para editar tarefa existente
- **Estados**: Loading, erro e lista vazia

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **FastAPI 0.117+**: Framework web moderno e rápido
- **Python 3.13**: Linguagem de programação
- **SQLAlchemy 2.0+**: ORM para banco de dados
- **PostgreSQL 15**: Banco de dados relacional
- **Alembic**: Migrações de banco de dados
- **JWT**: Autenticação com tokens
- **Pydantic**: Validação de dados
- **Poetry**: Gerenciamento de dependências
- **Ruff**: Linting e formatação

### Frontend
- **Next.js 15**: Framework React com App Router
- **React 19**: Biblioteca de interface
- **TypeScript**: Tipagem estática
- **Tailwind CSS 4**: Framework CSS utilitário
- **Zod**: Validação de schemas
- **Axios**: Cliente HTTP
- **Node.js 22**: Runtime JavaScript

### DevOps
- **Docker**: Containerização
- **Docker Compose**: Orquestração de containers
- **PostgreSQL 15-alpine**: Banco de dados containerizado

---

## ⚙️ Configurações Avançadas

### Variáveis de Ambiente Backend

```env
# Database
DATABASE_URL=postgresql://user:pass@host:port/db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=fullstack_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=senha_segura

# Application
DEBUG=False                    # Produção
SECRET_KEY=chave-super-secreta # Mude em produção!
CORS_ORIGINS=http://localhost:3000,https://seudominio.com

# JWT
JWT_SECRET_KEY=chave-jwt-secreta
JWT_ALGORITHM=HS256
JWT_EXPIRE_MINUTES=30
```

### Variáveis de Ambiente Frontend

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://api.seudominio.com
NEXT_PUBLIC_API_TIMEOUT=15000

# Application
NEXT_PUBLIC_APP_NAME=Minha App
NEXT_PUBLIC_APP_VERSION=2.0.0

# Debug
NEXT_PUBLIC_DEBUG_MODE=false
NEXT_PUBLIC_LOG_LEVEL=info
```

### Configuração de Produção

#### Backend (Dockerfile)
```dockerfile
FROM python:3.13-slim
WORKDIR /app
COPY pyproject.toml poetry.lock ./
RUN pip install poetry && poetry install --no-dev
COPY src/ ./src/
CMD ["poetry", "run", "uvicorn", "src.backend.app:app", "--host", "0.0.0.0", "--port", "8000"]
```

#### Frontend (next.config.ts)
```typescript
const nextConfig = {
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  },
}
```

---

## 🔧 Troubleshooting

### Problemas Comuns

#### 1. Erro de Conexão com Banco
```bash
# Verificar se PostgreSQL está rodando
docker ps | grep postgres

# Verificar logs do container
docker logs fullstack_postgres

# Recriar banco de dados
docker-compose down -v
docker-compose up --build
```

#### 2. Erro de CORS
```python
# Em backend/src/backend/app.py
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://seudominio.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

#### 3. Token JWT Expirado
```javascript
// Em frontend/src/hooks/useAuth.ts
const refreshToken = async () => {
  // Implementar renovação de token
  const response = await api.post('/api/auth/refresh');
  setToken(response.data.access_token);
};
```

#### 4. Erro de Validação Zod
```typescript
// Verificar schema em frontend/src/lib/validations.ts
export const taskSchema = z.object({
  title: z.string().min(1, 'Título obrigatório'),
  description: z.string().min(1, 'Descrição obrigatória'),
  // ... outros campos
});
```

### Logs e Debug

#### Backend
```bash
# Logs em tempo real
docker-compose logs -f backend

# Logs específicos
docker-compose logs backend | grep ERROR
```

#### Frontend
```bash
# Modo debug
NEXT_PUBLIC_DEBUG_MODE=true npm run dev

# Logs no console do navegador
console.log('Debug info:', data);
```

### Performance

#### Otimizações Backend
- Usar índices no banco de dados
- Implementar cache Redis
- Otimizar queries SQLAlchemy
- Usar connection pooling

#### Otimizações Frontend
- Implementar lazy loading
- Usar React.memo para componentes
- Otimizar imagens com Next.js Image
- Implementar service workers

---

## 📚 Recursos Adicionais

### Documentação das Tecnologias
- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)
- [SQLAlchemy Documentation](https://docs.sqlalchemy.org/)

### Comandos Úteis

#### Desenvolvimento
```bash
# Backend
poetry run task run          # Executar servidor
poetry run task test         # Executar testes
poetry run task lint         # Verificar código
poetry run task format       # Formatar código

# Frontend
npm run dev                  # Servidor desenvolvimento
npm run build                # Build produção
npm run lint                 # Verificar código
npm run type-check           # Verificar tipos
```

#### Docker
```bash
# Gerenciamento de containers
docker-compose up -d         # Executar em background
docker-compose down          # Parar containers
docker-compose restart       # Reiniciar containers
docker-compose logs -f       # Ver logs em tempo real
```

---

## 🤝 Contribuição

### Como Contribuir
1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

### Padrões de Código
- **Backend**: Seguir PEP 8, usar Ruff para formatação
- **Frontend**: Usar ESLint, Prettier para formatação
- **Commits**: Usar conventional commits
- **Testes**: Escrever testes para novas funcionalidades

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique esta documentação
2. Consulte os logs da aplicação
3. Abra uma issue no repositório
4. Entre em contato com a equipe de desenvolvimento

---

**Desenvolvido com ❤️ para o programa Fullstack Jr 2025-2**
