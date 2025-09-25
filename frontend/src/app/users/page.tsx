'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useUserManagement } from '@/hooks/useUsers';
import { CreateUser, createUserSchema } from '@/lib/validations';
import { validateData } from '@/lib/zod-utils';

export default function UsersPage() {
  const { users, loading, error, createUser } = useUserManagement();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<CreateUser>({
    name: '',
    email: '',
    age: undefined,
  });
  const [formError, setFormError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Validar dados com Zod
    const validation = validateData(createUserSchema, formData);
    
    if (!validation.success) {
      setFormError(validation.error || 'Dados inválidos');
      return;
    }

    try {
      await createUser(validation.data);
      setFormData({ name: '', email: '', age: undefined });
      setShowForm(false);
    } catch (error) {
      setFormError('Erro ao criar usuário');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateUser) => ({
      ...prev,
      [name]: name === 'age' ? (value ? parseInt(value) : undefined) : value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Carregando usuários...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
            <p className="font-bold">Erro ao carregar usuários</p>
            <p>{error.message}</p>
          </div>
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Voltar para Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Gerenciamento de Usuários
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Lista de usuários e operações CRUD
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              ← Voltar
            </Link>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancelar' : '+ Novo Usuário'}
            </button>
          </div>
        </div>

        {/* Formulário de criação */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Criar Novo Usuário
            </h2>
            
            {formError && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Nome *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Idade
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age || ''}
                  onChange={handleInputChange}
                  min="18"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Criar Usuário
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Lista de usuários */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Usuários ({users?.length || 0})
            </h2>
          </div>

          {!users || users.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Nenhum usuário encontrado
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Clique em "Novo Usuário" para criar o primeiro usuário
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {users.map((user) => (
                <div key={user.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        {user.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {user.email}
                      </p>
                      {user.age && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {user.age} anos
                        </p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        Editar
                      </button>
                      <button className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors">
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Informações sobre a API */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            ℹ️ Informações sobre a API
          </h3>
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            Esta página demonstra a integração com a API usando hooks customizados. 
            Os dados são validados com Zod antes de serem enviados para a API.
            Configure a variável <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">NEXT_PUBLIC_API_BASE_URL</code> no arquivo .env.local.
          </p>
        </div>
      </div>
    </div>
  );
}
