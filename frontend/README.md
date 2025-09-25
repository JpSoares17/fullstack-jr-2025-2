# Frontend - Projeto Fullstack

Este é o frontend do projeto fullstack, construído com Next.js 15, TypeScript, Tailwind CSS e Zod.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Zod** - Validação de schemas type-safe
- **Axios** - Cliente HTTP para integração com API
- **Node.js 22** - Runtime JavaScript

## 📋 Pré-requisitos

- Node.js 22 ou superior
- npm ou yarn

## 🛠️ Instalação

1. Clone o repositório
2. Navegue até a pasta frontend:
   ```bash
   cd frontend
   ```

3. Instale as dependências:
   ```bash
   npm install
   ```

4. Configure as variáveis de ambiente:
   ```bash
   cp .env.example .env.local
   ```

5. Edite o arquivo `.env.local` com suas configurações:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
   NEXT_PUBLIC_API_TIMEOUT=10000
   NEXT_PUBLIC_APP_NAME=Fullstack App
   NEXT_PUBLIC_APP_VERSION=1.0.0
   NEXT_PUBLIC_DEBUG_MODE=true
   NEXT_PUBLIC_LOG_LEVEL=debug
   ```

## 🚀 Executando o Projeto

### Desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em `http://localhost:3000`

### Build para Produção
```bash
npm run build
npm start
```

### Verificação de Tipos
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## 📁 Estrutura do Projeto

```
src/
├── app/                    # App Router do Next.js
│   ├── about/             # Página "Sobre"
│   ├── contact/           # Página "Contato"
│   ├── users/             # Página "Usuários"
│   ├── globals.css        # Estilos globais
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página inicial
├── hooks/                 # Hooks customizados
│   ├── useApi.ts          # Hook base para API
│   └── useUsers.ts        # Hook específico para usuários
├── lib/                   # Utilitários e configurações
│   ├── api.ts             # Configuração do Axios
│   ├── env.ts             # Configurações de ambiente
│   ├── validations.ts     # Schemas Zod
│   └── zod-utils.ts       # Utilitários Zod
└── types/                 # Definições de tipos TypeScript
```

## 🔧 Funcionalidades Implementadas

### ✅ Validação com Zod
- Schemas type-safe para validação de dados
- Validação em tempo real em formulários
- Mensagens de erro customizadas

### ✅ Integração com API
- Hooks customizados para operações CRUD
- Interceptors para logging e tratamento de erros
- Configuração baseada em variáveis de ambiente

### ✅ Roteamento
- App Router do Next.js 15
- Páginas de exemplo com navegação
- Layout responsivo e moderno

### ✅ Tailwind CSS
- Design system customizado
- Modo escuro/claro
- Componentes responsivos
- Animações e transições

## 📄 Páginas Disponíveis

- **/** - Página inicial com navegação
- **/login** - Página de login com autenticação
- **/tasks** - Gerenciamento de tarefas (protegida)
- **/about** - Informações sobre o projeto e tecnologias
- **/users** - Demonstração de CRUD com validação Zod
- **/contact** - Formulário de contato com validação

## 🔌 Configuração da API

O projeto está configurado para se conectar com uma API backend. Configure a URL base no arquivo `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### Endpoints Esperados

#### Autenticação
- `POST /api/auth/login` - Login do usuário
  - Body: `{ email: string, password: string }`
  - Response: `{ token: string, user: { id: string, email: string, name?: string } }`

#### Tarefas
- `GET /api/tasks` - Listar tarefas do usuário autenticado
- `POST /api/tasks` - Criar nova tarefa
- `PUT /api/tasks/:id` - Atualizar tarefa
- `DELETE /api/tasks/:id` - Deletar tarefa

#### Usuários (Demonstração)
- `GET /users` - Listar usuários
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

## 🎨 Customização

### Cores e Tema
As cores podem ser customizadas no arquivo `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: { /* suas cores primárias */ },
      secondary: { /* suas cores secundárias */ },
    },
  },
}
```

### Validações
Adicione novos schemas Zod no arquivo `src/lib/validations.ts`:

```typescript
export const meuSchema = z.object({
  campo: z.string().min(1, 'Campo obrigatório'),
});
```

## 🐛 Debugging

Para ativar o modo debug, configure no `.env.local`:

```env
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_LOG_LEVEL=debug
```

Isso habilitará logs detalhados das requisições HTTP.

## 📚 Documentação Adicional

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Zod Documentation](https://zod.dev/)

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.