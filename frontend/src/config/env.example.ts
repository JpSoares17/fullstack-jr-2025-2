/**
 * Arquivo de exemplo para configuração de variáveis de ambiente
 * 
 * Para usar este arquivo:
 * 1. Copie este arquivo para .env.local na raiz do projeto
 * 2. Configure as variáveis conforme necessário
 * 3. As variáveis devem começar com NEXT_PUBLIC_ para serem acessíveis no cliente
 */

export const envExample = {
  // Configurações da API
  NEXT_PUBLIC_API_BASE_URL: 'http://localhost:8000',
  NEXT_PUBLIC_API_TIMEOUT: '10000',
  
  // Configurações do ambiente
  NODE_ENV: 'development',
  NEXT_PUBLIC_APP_NAME: 'Fullstack App',
  NEXT_PUBLIC_APP_VERSION: '1.0.0',
  
  // Configurações de debug
  NEXT_PUBLIC_DEBUG_MODE: 'true',
  NEXT_PUBLIC_LOG_LEVEL: 'debug',
};

/**
 * Exemplo de arquivo .env.local:
 * 
 * NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
 * NEXT_PUBLIC_API_TIMEOUT=10000
 * NODE_ENV=development
 * NEXT_PUBLIC_APP_NAME=Fullstack App
 * NEXT_PUBLIC_APP_VERSION=1.0.0
 * NEXT_PUBLIC_DEBUG_MODE=true
 * NEXT_PUBLIC_LOG_LEVEL=debug
 */
