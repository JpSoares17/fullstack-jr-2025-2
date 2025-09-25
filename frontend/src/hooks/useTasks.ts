import { useState, useEffect, useCallback } from 'react';
import { useApi, useApiPost, useApiPut, useApiDelete } from './useApi';
import { Task, CreateTask, UpdateTask } from '@/lib/validations';
import { useAuth } from './useAuth';

// Hook para buscar todas as tarefas
export function useTasks() {
  const { token, isAuthenticated } = useAuth();
  
  return useApi<Task[]>('/api/tasks', { 
    immediate: isAuthenticated && !!token,
    onError: (error) => {
      console.error('Erro ao carregar tarefas:', error);
    },
  });
}

// Hook para criar uma nova tarefa
export function useCreateTask() {
  return useApiPost<Task>('/api/tasks', {
    onSuccess: (data) => {
      console.log('✅ Tarefa criada com sucesso:', data);
    },
    onError: (error) => {
      console.error('❌ Erro ao criar tarefa:', error);
    },
  });
}

// Hook para atualizar uma tarefa
export function useUpdateTask(id: string) {
  return useApiPut<Task>(`/api/tasks/${id}`, {
    onSuccess: (data) => {
      console.log('✅ Tarefa atualizada com sucesso:', data);
    },
    onError: (error) => {
      console.error('❌ Erro ao atualizar tarefa:', error);
    },
  });
}

// Hook para deletar uma tarefa
export function useDeleteTask() {
  return useApiDelete<{ message: string }>('/api/tasks', {
    onSuccess: (data) => {
      console.log('✅ Tarefa deletada com sucesso:', data);
    },
    onError: (error) => {
      console.error('❌ Erro ao deletar tarefa:', error);
    },
  });
}

// Hook customizado para gerenciar tarefas com operações CRUD
export function useTaskManagement() {
  const { token, isAuthenticated } = useAuth();
  const { data: tasks, loading: tasksLoading, error: tasksError, refetch: refetchTasks } = useTasks();
  
  const { execute: createTask, loading: createLoading, error: createError } = useCreateTask();
  const { execute: deleteTask, loading: deleteLoading, error: deleteError } = useDeleteTask();

  const handleCreateTask = async (taskData: CreateTask) => {
    if (!isAuthenticated || !token) {
      console.error('Usuário não autenticado');
      return;
    }
    
    try {
      await createTask(taskData);
      await refetchTasks(); // Recarrega a lista após criar
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!isAuthenticated || !token) {
      console.error('Usuário não autenticado');
      return;
    }
    
    try {
      await deleteTask({ params: { id: taskId } });
      await refetchTasks(); // Recarrega a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleToggleTask = async (taskId: string, status: string) => {
    if (!isAuthenticated || !token) {
      console.error('Usuário não autenticado');
      return;
    }
    
    try {
      const { execute: updateTask } = useUpdateTask(taskId);
      await updateTask({ status });
      await refetchTasks(); // Recarrega a lista após atualizar
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
    }
  };

  return {
    // Dados
    tasks,
    
    // Estados de loading
    loading: tasksLoading || createLoading || deleteLoading,
    tasksLoading,
    createLoading,
    deleteLoading,
    
    // Erros
    error: tasksError || createError || deleteError,
    tasksError,
    createError,
    deleteError,
    
    // Ações
    refetchTasks,
    createTask: handleCreateTask,
    deleteTask: handleDeleteTask,
    toggleTask: handleToggleTask,
  };
}
