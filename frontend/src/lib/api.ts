import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env, getApiUrl } from './env';

// Configuração base do axios
const apiConfig: AxiosRequestConfig = {
  baseURL: env.API_BASE_URL,
  timeout: env.API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

// Instância do axios
export const api: AxiosInstance = axios.create(apiConfig);

// Interceptor para requests
api.interceptors.request.use(
  (config) => {
    // Adicionar token de autenticação se disponível
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    if (env.DEBUG_MODE) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        data: config.data,
        hasToken: !!token,
        token: token ? `${token.substring(0, 20)}...` : 'none',
        headers: config.headers,
      });
    }
    return config;
  },
  (error) => {
    if (env.DEBUG_MODE) {
      console.error('❌ Request Error:', error);
    }
    return Promise.reject(error);
  }
);

// Interceptor para responses
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (env.DEBUG_MODE) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      });
    }
    return response;
  },
  (error) => {
    if (env.DEBUG_MODE) {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        url: error.config?.url,
        message: error.message,
        data: error.response?.data,
      });
    }
    
    // Se receber 401 (Unauthorized), limpar dados de autenticação
    if (error.response?.status === 401) {
      console.warn('🔒 Token expirado ou inválido, fazendo logout automático');
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      // Redirecionar para login se não estiver na página de login
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Tipos para as respostas da API
export interface ApiError {
  message: string;
  status?: number;
  code?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Funções utilitárias para fazer requests
export const apiClient = {
  get: <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.get<T>(url, config).then(res => res.data),
    
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.post<T>(url, data, config).then(res => res.data),
    
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.put<T>(url, data, config).then(res => res.data),
    
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
    api.patch<T>(url, data, config).then(res => res.data),
    
  delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
    api.delete<T>(url, config).then(res => res.data),
};

// Função para construir URLs da API
export { getApiUrl };
