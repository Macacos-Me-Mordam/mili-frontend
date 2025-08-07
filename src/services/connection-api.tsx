// Arquivo: src/services/connection-api.tsx

// Define a URL base da API usando a variável de ambiente.
// Se a variável não for definida, ele usa 'http://localhost:8000' como padrão.
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Lida com a lógica de uma requisição para a API.
 * É uma função interna para evitar repetição de código.
 */
async function apiConnect<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  // Define os cabeçalhos padrão para todas as requisições.
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: defaultHeaders,
    });

    // Se a resposta não for OK (ex: 404, 500), lança um erro.
    if (!response.ok) {
      // Tenta extrair uma mensagem de erro do corpo da resposta, se houver.
      const errorBody = await response.json().catch(() => null);
      const errorMessage = errorBody?.message || `Erro HTTP! Status: ${response.status}`;
      throw new Error(errorMessage);
    }

    // Se a resposta for bem-sucedida, retorna o corpo da resposta em JSON.
    return response.json() as Promise<T>;

  } catch (error) {
    console.error('Falha na conexão com a API:', error);
    // Re-lança o erro para que o componente que chamou possa tratá-lo.
    throw error;
  }
}

/**
 * Função de atalho para requisições POST.
 * @param endpoint A rota da API (ex: '/users/sign-in').
 * @param body O corpo da requisição em formato de objeto.
 */
export function connectionAPIPost<T>(
  endpoint: string,
  body: Record<string, unknown>
): Promise<T> {
  return apiConnect<T>(endpoint, {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

// Você pode adicionar outras funções de atalho aqui, se precisar (GET, PUT, DELETE).
// Exemplo para GET:
/*
export function connectionAPIGet<T>(endpoint: string): Promise<T> {
  return apiConnect<T>(endpoint, {
    method: 'GET',
  });
}
*/