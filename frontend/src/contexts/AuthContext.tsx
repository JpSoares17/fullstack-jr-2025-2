'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthResponse, LoginData, LogoutResponse, RegisterData } from '@/lib/validations';
import { apiClient } from '@/lib/api';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginData) => Promise<void>;
  register: (userData: Omit<RegisterData, 'confirmPassword'>) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse['user'] | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se há token salvo no localStorage ao carregar
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setToken(savedToken);
        setUser(userData);
      } catch (error) {
        console.error('Erro ao recuperar dados de autenticação:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginData) => {
    try {
      setIsLoading(true);
      
      // Fazer login na API
      const response = await apiClient.post<AuthResponse>('/api/auth/login', credentials);
      
      // Salvar dados no localStorage
      localStorage.setItem('auth_token', response.access_token);
      localStorage.setItem('auth_user', JSON.stringify(response.user));
      
      // Atualizar estado
      setToken(response.access_token);
      setUser(response.user);
      
    } catch (error: any) {
      console.error('Erro no login:', error);
      throw new Error(error.response?.data?.message || 'Erro ao fazer login');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Omit<RegisterData, 'confirmPassword'>) => {
    try {
      setIsLoading(true);
      
      // Criar usuário na API
      const response = await apiClient.post<AuthResponse['user']>('/api/auth/register', userData);
      
      // Após criar o usuário, fazer login automaticamente
      const loginResponse = await apiClient.post<AuthResponse>('/api/auth/login', {
        email: userData.email,
        password: userData.password,
      });
      
      // Salvar dados no localStorage
      localStorage.setItem('auth_token', loginResponse.access_token);
      localStorage.setItem('auth_user', JSON.stringify(loginResponse.user));
      
      // Atualizar estado
      setToken(loginResponse.access_token);
      setUser(loginResponse.user);
      
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      throw new Error(error.response?.data?.detail || error.response?.data?.message || 'Erro ao criar conta');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Chamar API de logout se houver token
      if (token) {
        await apiClient.post<LogoutResponse>('/api/auth/logout');
      }
    } catch (error) {
      console.error('Erro no logout:', error);
      // Continuar com o logout local mesmo se a API falhar
    } finally {
      // Limpar localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      
      // Limpar estado
      setToken(null);
      setUser(null);
    }
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}
