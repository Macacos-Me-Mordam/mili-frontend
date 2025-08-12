
const API_URL = 'http://localhost:8080';

// Opções base para a nossa função 'fetch'
interface ApiOptions extends RequestInit {
  body?: any;
}

// Função genérica para tratar as chamadas fetch
async function fetcher<T>(endpoint: string, options: ApiOptions = {}, useAuth: boolean = false): Promise<T> {
  const { body, ...customConfig } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...headers,
      ...options.headers,
    },
    ...customConfig,
  };

  // Se for uma chamada autenticada, inclui as credenciais (cookies).
  if (useAuth) {
    config.credentials = 'include';
  }

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      message: 'Ocorreu um erro na requisição',
    }));
    throw new Error(errorData.message || 'Erro desconhecido');
  }

  if (response.status === 204) {
    return Promise.resolve(undefined as T);
  }

  return response.json();
}

// 1. Exportação para rotas PÚBLICAS (ex: login)
export const api = {
  get: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'POST' }),
  put: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'PUT' }),
  delete: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'DELETE' }),
};

// 2. Exportação para rotas PRIVADAS (autenticadas)

// medina, poderia me explicar o porque do true
export const apiAuth = {
  get: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'GET' }, true),
  post: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'POST' }, true),
  put: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'PUT' }, true),
  delete: <T>(endpoint: string, options?: ApiOptions) => fetcher<T>(endpoint, { ...options, method: 'DELETE' }, true),
};