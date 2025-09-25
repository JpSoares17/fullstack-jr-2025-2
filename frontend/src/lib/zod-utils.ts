// @ts-ignore - Zod será instalado via npm/yarn
import { z } from 'zod';

/**
 * Função utilitária para validar dados com Zod
 * @param schema - Schema Zod para validação
 * @param data - Dados a serem validados
 * @returns Objeto com success, data e error
 */
export function validateData<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): {
  success: boolean;
  data?: T;
  error?: string;
} {
  try {
    const validatedData = schema.parse(data);
    return {
      success: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return {
        success: false,
        error: errorMessages.join(', '),
      };
    }
    return {
      success: false,
      error: 'Erro de validação desconhecido',
    };
  }
}

/**
 * Função para validar dados de forma segura (não lança exceção)
 * @param schema - Schema Zod para validação
 * @param data - Dados a serem validados
 * @returns Resultado da validação
 */
export function safeValidate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): z.SafeParseReturnType<unknown, T> {
  return schema.safeParse(data);
}

/**
 * Hook para validação de formulários
 * @param schema - Schema Zod para validação
 * @returns Função de validação
 */
export function createValidator<T>(schema: z.ZodSchema<T>) {
  return (data: unknown) => validateData(schema, data);
}
