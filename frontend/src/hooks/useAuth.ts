import { useAuth as useAuthContext } from '@/contexts/AuthContext';

// Hook personalizado para autenticação
export function useAuth() {
  return useAuthContext();
}

// Hook para verificar se o usuário está autenticado
export function useRequireAuth() {
  const { isAuthenticated, isLoading } = useAuthContext();
  
  return {
    isAuthenticated,
    isLoading,
    shouldRedirect: !isLoading && !isAuthenticated,
  };
}
