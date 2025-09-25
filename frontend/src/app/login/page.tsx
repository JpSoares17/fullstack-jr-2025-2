'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { LoginData, loginSchema } from '@/lib/validations';
import { validateData } from '@/lib/zod-utils';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [formError, setFormError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push('/tasks');
    }
  }, [isAuthenticated, authLoading, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: LoginData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setIsSubmitting(true);

    // Validar dados com Zod
    const validation = validateData(loginSchema, formData);
    
    if (!validation.success) {
      setFormError(validation.error || 'Dados inválidos');
      setIsSubmitting(false);
      return;
    }

    try {
      await login(validation.data);
      router.push('/tasks');
    } catch (error: any) {
      setFormError(error.message || 'Erro ao fazer login');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Verificando autenticação...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">
            Faça login em sua conta
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Acesse suas tarefas e organize seu dia
          </p>
        </div>

        {/* Formulário */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {formError && (
            <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-6">
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="seu@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Senha *
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                placeholder="Sua senha"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Entrando...
                </span>
              ) : (
                'Entrar'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Não tem uma conta?{' '}
              <Link
                href="/register"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Cadastre-se aqui
              </Link>
            </p>
          </div>
        </div>

        {/* Voltar para home */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Voltar para Home
          </Link>
        </div>

        {/* Informações sobre validação */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
            🔐 Informações sobre Login
          </h4>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Este formulário usa Zod para validação em tempo real. 
            O email deve ser válido e a senha deve ter pelo menos 6 caracteres.
            Após o login, você será redirecionado para a página de tarefas.
          </p>
        </div>
      </div>
    </div>
  );
}
