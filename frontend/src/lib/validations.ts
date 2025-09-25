// @ts-ignore - Zod será instalado via npm/yarn
import { z } from 'zod';

// Schema de exemplo para usuário
export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  age: z.number().min(18, 'Idade deve ser pelo menos 18 anos').optional(),
  createdAt: z.date().optional(),
});

// Schema para criação de usuário (sem id e createdAt)
export const createUserSchema = userSchema.omit({
  id: true,
  createdAt: true,
});

// Schema para atualização de usuário (todos os campos opcionais exceto id)
export const updateUserSchema = userSchema.partial().required({ id: true });

// Schema para resposta da API
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
  data: z.any().optional(),
  error: z.string().optional(),
});

// Schema para paginação
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  total: z.number().optional(),
});

// Schema para filtros de busca
export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

// Schema para cadastro
export const registerSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres').max(100, 'Nome deve ter no máximo 100 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres').max(100, 'Senha deve ter no máximo 100 caracteres'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Senhas não coincidem",
  path: ["confirmPassword"],
});

// Schema para login
export const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter pelo menos 6 caracteres'),
});

// Schema para resposta de autenticação
export const authResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string().default('bearer'),
  user: z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
  }),
});

// Schema para resposta de logout
export const logoutResponseSchema = z.object({
  message: z.string(),
});

// Schema para tarefa
export const taskSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'Título é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatória'),
  status: z.enum(['pending', 'in_progress', 'completed']).default('pending'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  due_date: z.string().datetime('Data inválida'),
  created_at: z.string().datetime().optional(),
  updated_at: z.string().datetime().optional(),
});

// Schema para criar tarefa
export const createTaskSchema = taskSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

// Schema para atualizar tarefa (sem id, pois ele vem na URL)
export const updateTaskSchema = taskSchema.partial().omit({ id: true });

// Tipos TypeScript derivados dos schemas
export type User = z.infer<typeof userSchema>;
export type CreateUser = z.infer<typeof createUserSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type LoginData = z.infer<typeof loginSchema>;
export type AuthResponse = z.infer<typeof authResponseSchema>;
export type LogoutResponse = z.infer<typeof logoutResponseSchema>;
export type Task = z.infer<typeof taskSchema>;
export type CreateTask = z.infer<typeof createTaskSchema>;
export type UpdateTask = z.infer<typeof updateTaskSchema>;
export type ApiResponse<T = any> = z.infer<typeof apiResponseSchema> & {
  data?: T;
};
export type Pagination = z.infer<typeof paginationSchema>;
export type SearchFilters = z.infer<typeof searchFiltersSchema>;
