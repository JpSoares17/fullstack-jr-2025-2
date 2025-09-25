import { useApi, useApiPost, useApiPut, useApiDelete } from './useApi';
import { User, CreateUser, UpdateUser } from '@/lib/validations';

// Hook para buscar todos os usuários
export function useUsers() {
  return useApi<User[]>('/users', { immediate: true });
}

// Hook para buscar um usuário específico
export function useUser(id: string) {
  return useApi<User>(`/users/${id}`, { immediate: !!id });
}

// Hook para criar um novo usuário
export function useCreateUser() {
  return useApiPost<User>('/users', {
    onSuccess: (data) => {
      console.log('✅ Usuário criado com sucesso:', data);
    },
    onError: (error) => {
      console.error('❌ Erro ao criar usuário:', error);
    },
  });
}

// Hook para atualizar um usuário
export function useUpdateUser(id: string) {
  return useApiPut<User>(`/users/${id}`, {
    onSuccess: (data) => {
      console.log('✅ Usuário atualizado com sucesso:', data);
    },
    onError: (error) => {
      console.error('❌ Erro ao atualizar usuário:', error);
    },
  });
}

// Hook para deletar um usuário
export function useDeleteUser() {
  return useApiDelete<{ message: string }>('/users', {
    onSuccess: (data) => {
      console.log('✅ Usuário deletado com sucesso:', data);
    },
    onError: (error) => {
      console.error('❌ Erro ao deletar usuário:', error);
    },
  });
}

// Hook customizado para gerenciar usuários com operações CRUD
export function useUserManagement() {
  const { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers } = useUsers();
  
  const { execute: createUser, loading: createLoading, error: createError } = useCreateUser();
  const { execute: deleteUser, loading: deleteLoading, error: deleteError } = useDeleteUser();

  const handleCreateUser = async (userData: CreateUser) => {
    try {
      await createUser(userData);
      await refetchUsers(); // Recarrega a lista após criar
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser({ params: { id: userId } });
      await refetchUsers(); // Recarrega a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
    }
  };

  return {
    // Dados
    users,
    
    // Estados de loading
    loading: usersLoading || createLoading || deleteLoading,
    usersLoading,
    createLoading,
    deleteLoading,
    
    // Erros
    error: usersError || createError || deleteError,
    usersError,
    createError,
    deleteError,
    
    // Ações
    refetchUsers,
    createUser: handleCreateUser,
    deleteUser: handleDeleteUser,
  };
}
