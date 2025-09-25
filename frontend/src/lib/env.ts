/**
 * Configurações de ambiente da aplicação
 * Todas as variáveis devem começar com NEXT_PUBLIC_ para serem acessíveis no cliente
 */

export const env = {
  // API Configuration
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  
  // App Configuration
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || 'Fullstack App',
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
  
  // Environment
  NODE_ENV: process.env.NODE_ENV || 'development',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  
  // Debug Configuration
  DEBUG_MODE: process.env.NEXT_PUBLIC_DEBUG_MODE === 'true',
  LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL || 'info',
} as const;

// Validação das variáveis de ambiente obrigatórias
export function validateEnv() {
  const requiredVars = [
    'NEXT_PUBLIC_API_BASE_URL',
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    throw new Error(
      `Variáveis de ambiente obrigatórias não encontradas: ${missingVars.join(', ')}`
    );
  }
}

// Função para obter URL completa da API
export function getApiUrl(endpoint: string): string {
  const baseUrl = env.API_BASE_URL.replace(/\/$/, ''); // Remove trailing slash
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${cleanEndpoint}`;
}
