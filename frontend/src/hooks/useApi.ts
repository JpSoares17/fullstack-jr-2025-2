import { useState, useEffect, useCallback, useRef } from 'react';
import { apiClient, ApiResponse, ApiError } from '@/lib/api';

// Tipos para o hook
interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: ApiError) => void;
}

// Hook principal para fazer requests à API
export function useApi<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const { immediate = false, onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  // Manter handlers estáveis entre renders para não recriar execute
  const onSuccessRef = useRef<typeof onSuccess>();
  const onErrorRef = useRef<typeof onError>();

  useEffect(() => {
    onSuccessRef.current = onSuccess;
  }, [onSuccess]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);

  const execute = useCallback(async (config?: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiClient.get<T>(url, config);
      setState({ data: response, loading: false, error: null });
      onSuccessRef.current?.(response);
      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Erro desconhecido',
        status: error.response?.status,
        code: error.response?.data?.code,
      };
      
      setState({ data: null, loading: false, error: apiError });
      onErrorRef.current?.(apiError);
      throw apiError;
    }
  }, [url]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
    refetch: execute,
  };
}

// Hook para POST requests
export function useApiPost<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (data?: any, config?: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiClient.post<T>(url, data, config);
      setState({ data: response, loading: false, error: null });
      onSuccess?.(response);
      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Erro desconhecido',
        status: error.response?.status,
        code: error.response?.data?.code,
      };
      
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [url, onSuccess, onError]);

  return {
    ...state,
    execute,
  };
}

// Hook para PUT requests
export function useApiPut<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (data?: any, config?: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiClient.put<T>(url, data, config);
      setState({ data: response, loading: false, error: null });
      onSuccess?.(response);
      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Erro desconhecido',
        status: error.response?.status,
        code: error.response?.data?.code,
      };
      
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [url, onSuccess, onError]);

  return {
    ...state,
    execute,
  };
}

// Hook para DELETE requests
export function useApiDelete<T = any>(
  url: string,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options;
  
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(async (config?: any) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiClient.delete<T>(url, config);
      setState({ data: response, loading: false, error: null });
      onSuccess?.(response);
      return response;
    } catch (error: any) {
      const apiError: ApiError = {
        message: error.response?.data?.message || error.message || 'Erro desconhecido',
        status: error.response?.status,
        code: error.response?.data?.code,
      };
      
      setState({ data: null, loading: false, error: apiError });
      onError?.(apiError);
      throw apiError;
    }
  }, [url, onSuccess, onError]);

  return {
    ...state,
    execute,
  };
}
