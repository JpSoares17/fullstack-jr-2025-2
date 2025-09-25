'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useTaskManagementPaginated } from '@/hooks/useTasks';
import { CreateTask, createTaskSchema, UpdateTask, updateTaskSchema, Task } from '@/lib/validations';
import { validateData } from '@/lib/zod-utils';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Pagination } from '@/components/Pagination';

export default function TasksPage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  
  // Estados de paginação
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const { 
    tasks, 
    pagination, 
    loading, 
    error, 
    createTask, 
    deleteTask, 
    toggleTask, 
    updateTask 
  } = useTaskManagementPaginated(currentPage, pageSize);
  
  const [showForm, setShowForm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  // Helpers para lidar com datetime-local (sem timezone)
  const toDateTimeLocal = (date: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const yyyy = date.getFullYear();
    const MM = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const mm = pad(date.getMinutes());
    // Formatar apenas até minutos (sem segundos/milisegundos)
    return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
  };

  const [formData, setFormData] = useState<CreateTask>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: new Date().toISOString(),
  });
  
  // Estados separados para data e hora
  const [dueDate, setDueDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // yyyy-MM-dd
  });
  
  const [dueTime, setDueTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:mm
  });
  const [formError, setFormError] = useState<string>('');

  // Estados para edição
  const [editFormData, setEditFormData] = useState<Omit<UpdateTask, 'id'>>({
    title: '',
    description: '',
    status: 'pending',
    priority: 'medium',
    due_date: new Date().toISOString(),
  });
  
  const [editDueDate, setEditDueDate] = useState(() => {
    const now = new Date();
    return now.toISOString().split('T')[0]; // yyyy-MM-dd
  });
  
  const [editDueTime, setEditDueTime] = useState(() => {
    const now = new Date();
    return now.toTimeString().slice(0, 5); // HH:mm
  });
  const [editFormError, setEditFormError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateTask) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueDate(e.target.value);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDueTime(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    // Combinar data e hora em um datetime ISO
    const combinedDateTime = new Date(`${dueDate}T${dueTime}:00`).toISOString();
    
    const payload: CreateTask = {
      ...formData,
      due_date: combinedDateTime,
    };

    // Validar dados com Zod já no formato ISO esperado pela API
    const validation = validateData(createTaskSchema, payload);
    
    if (!validation.success) {
      setFormError(validation.error || 'Dados inválidos');
      return;
    }

    try {
      await createTask(validation.data as CreateTask);
      setFormData({ 
        title: '', 
        description: '', 
        status: 'pending', 
        priority: 'medium', 
        due_date: new Date().toISOString()
      });
      // Resetar campos de data e hora
      const now = new Date();
      setDueDate(now.toISOString().split('T')[0]);
      setDueTime(now.toTimeString().slice(0, 5));
      setShowForm(false);
    } catch (error) {
      setFormError('Erro ao criar tarefa');
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  // Funções para edição
  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setEditFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.due_date,
    });
    
    // Separar data e hora para os campos separados
    const taskDate = new Date(task.due_date);
    setEditDueDate(taskDate.toISOString().split('T')[0]);
    setEditDueTime(taskDate.toTimeString().slice(0, 5));
    setEditFormError('');
    setShowEditModal(true);
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditFormData((prev: Omit<UpdateTask, 'id'>) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDueDate(e.target.value);
  };

  const handleEditTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDueTime(e.target.value);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEditFormError('');

    if (!editingTask) return;

    // Combinar data e hora em um datetime ISO
    const combinedDateTime = new Date(`${editDueDate}T${editDueTime}:00`).toISOString();
    
    const payload: Omit<UpdateTask, 'id'> = {
      ...editFormData,
      due_date: combinedDateTime,
    };

    // Validar dados com Zod
    const validation = validateData(updateTaskSchema, payload);
    
    if (!validation.success) {
      setEditFormError(validation.error || 'Dados inválidos');
      return;
    }

    try {
      await updateTask(editingTask.id, validation.data as UpdateTask);
      setShowEditModal(false);
      setEditingTask(null);
    } catch (error) {
      setEditFormError('Erro ao atualizar tarefa');
    }
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingTask(null);
    setEditFormError('');
  };

  // Funções de paginação
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSizeChange = (size: number) => {
    setPageSize(size);
    setCurrentPage(1); // Voltar para a primeira página ao mudar o tamanho
  };

  return (
    <ProtectedRoute>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Minhas Tarefas
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Olá, {user?.name || user?.email}! Organize suas tarefas do dia.
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showForm ? 'Cancelar' : '+ Nova Tarefa'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Formulário de criação */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Criar Nova Tarefa
            </h2>
            
            {formError && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Digite o título da tarefa"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Descreva a tarefa"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pending">Pendente</option>
                    <option value="in_progress">Em Progresso</option>
                    <option value="completed">Concluída</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prioridade
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="due_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Vencimento *
                  </label>
                  <input
                    type="date"
                    id="due_date"
                    value={dueDate}
                    onChange={handleDateChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="due_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Horário de Vencimento *
                  </label>
                  <input
                    type="time"
                    id="due_time"
                    value={dueTime}
                    onChange={handleTimeChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Criar Tarefa
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

        {/* Lista de tarefas */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Suas Tarefas {pagination ? `(${pagination.total})` : `(${tasks?.length || 0})`}
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-300">Carregando tarefas...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center">
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                <p className="font-bold">Erro ao carregar tarefas</p>
                <p>{error.message}</p>
              </div>
            </div>
          ) : !tasks || tasks.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-gray-400 dark:text-gray-500 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-lg">
                Nenhuma tarefa encontrada
              </p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Clique em "Nova Tarefa" para criar sua primeira tarefa
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {tasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : task.status === 'in_progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {task.status === 'completed' ? 'Concluída' : 
                           task.status === 'in_progress' ? 'Em Progresso' : 'Pendente'}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          task.priority === 'high' 
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : task.priority === 'medium'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                        }`}>
                          {task.priority === 'high' ? 'Alta' : 
                           task.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                      </div>
                      
                      <h3 className={`text-lg font-medium mb-2 ${
                        task.status === 'completed' 
                          ? 'line-through text-gray-500 dark:text-gray-400' 
                          : 'text-gray-900 dark:text-white'
                      }`}>
                        {task.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-3">
                        {task.description}
                      </p>
                      
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        <p>Vencimento: {new Date(task.due_date).toLocaleDateString('pt-BR')}</p>
                        {task.created_at && (
                          <p>Criada em: {new Date(task.created_at).toLocaleDateString('pt-BR')}</p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEditTask(task)}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => toggleTask(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                        className={`px-3 py-1 rounded text-sm transition-colors ${
                          task.status === 'completed'
                            ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-200 dark:hover:bg-yellow-800'
                            : 'bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 hover:bg-green-200 dark:hover:bg-green-800'
                        }`}
                      >
                        {task.status === 'completed' ? 'Reabrir' : 'Concluir'}
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded text-sm hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Componente de paginação */}
          {pagination && pagination.total > 0 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              hasNext={pagination.hasNext}
              hasPrev={pagination.hasPrev}
              onPageChange={handlePageChange}
              onSizeChange={handleSizeChange}
              currentSize={pagination.size}
              total={pagination.total}
            />
          )}
        </div>

      </div>

      {/* Modal de Edição */}
      {showEditModal && editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Editar Tarefa
              </h2>
              <button
                onClick={handleCloseEditModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {editFormError && (
              <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded mb-4">
                {editFormError}
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label htmlFor="edit_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Título da Tarefa *
                </label>
                <input
                  type="text"
                  id="edit_title"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditInputChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Digite o título da tarefa"
                  required
                />
              </div>

              <div>
                <label htmlFor="edit_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição *
                </label>
                <textarea
                  id="edit_description"
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  placeholder="Descreva a tarefa"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit_status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Status
                  </label>
                  <select
                    id="edit_status"
                    name="status"
                    value={editFormData.status}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="pending">Pendente</option>
                    <option value="in_progress">Em Progresso</option>
                    <option value="completed">Concluída</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="edit_priority" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Prioridade
                  </label>
                  <select
                    id="edit_priority"
                    name="priority"
                    value={editFormData.priority}
                    onChange={handleEditInputChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  >
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="edit_due_date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Vencimento *
                  </label>
                  <input
                    type="date"
                    id="edit_due_date"
                    value={editDueDate}
                    onChange={handleEditDateChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="edit_due_time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Horário de Vencimento *
                  </label>
                  <input
                    type="time"
                    id="edit_due_time"
                    value={editDueTime}
                    onChange={handleEditTimeChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Salvar Alterações
                </button>
                <button
                  type="button"
                  onClick={handleCloseEditModal}
                  className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </ProtectedRoute>
  );
}
