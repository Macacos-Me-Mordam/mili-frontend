// Importa o nosso Enum de métodos para garantir a tipagem correta.
import { MethodsEnum } from "@/enums/methods-enum";

// Declara uma constante para verificar se o código está rodando no servidor.
const isServer = typeof window === 'undefined';

/**
 * @class ConnectionAPI
 * Esta classe centraliza toda a lógica de comunicação com o     backend.
 * Ela é "genérica", ou seja, pode ser usada para fazer qualquer tipo de
 * requisição (GET, POST, etc.) para qualquer rota da nossa API.
 */
class ConnectionAPI {
  // Define a URL base da nossa API.
  private static readonly API_URL = isServer
    ? process.env.NEXT_PUBLIC_MILI_API_URL || 'http://localhost:3000'
    : '/api';

  /**
   * @method connect
   * Este é o coração da nossa classe. Um método estático e genérico para
   * fazer as chamadas à API.
   * @template T - O tipo de dado que esperamos receber da API (ex: User, Product).
   * @param {string} url - A rota específica que queremos acessar (ex: /users/login).
   * @param {MethodsEnum} method - O método HTTP (GET, POST, etc.) vindo do nosso Enum.
   * @param {unknown} [body] - O corpo da requisição (opcional), usado em POST, PUT, PATCH.
   * @returns {Promise<T>} - Retorna os dados da API com a tipagem correta.
   */
  static async connect<T>(url: string, method: MethodsEnum, body?: unknown): Promise<T> {
    // Monta os cabeçalhos da requisição.
    // Em um futuro próximo, aqui entraria a lógica para pegar um token de autorização.
    const headers = {
      "Content-Type": "application/json",
      // Exemplo de como o token seria adicionado:
      // Authorization: `Bearer ${getAuthorizationToken()}`,
    };

    // Monta o objeto de configuração para a função 'fetch'.
    const config: RequestInit = {
      method: method, // O método é passado usando nosso Enum[cite: 26].
      headers: headers,
    };

    // Se um corpo (body) for fornecido, ele é convertido para JSON e adicionado à configuração[cite: 29, 30].
    if (body) {
      config.body = JSON.stringify(body);
    }

    try {
      // Faz a chamada à API usando a função 'fetch' do navegador/node.
      // Note que concatenamos a URL base com a rota específica.
      const response = await fetch(`${this.API_URL}${url}`, config);

      // Se a resposta da API não for de sucesso (ex: erro 404, 500),
      // lançamos um erro para que ele seja tratado no bloco 'catch'[cite: 34, 35].
      if (!response.ok) {
        throw new Error(`Erro HTTP! Status: ${response.status}`);
      }

      // Se a resposta for bem-sucedida, convertemos os dados para JSON.
      const data: T = await response.json();
      
      // Retornamos os dados com a tipagem correta[cite: 37, 38].
      return data;
    } catch (error) {
      // Se qualquer parte do 'try' falhar, o erro é capturado aqui.
      console.error("Erro na conexão com a API:", error);
      // Lançamos o erro novamente para que o componente que chamou a função
      // possa saber que algo deu errado e tratar (ex: mostrar uma mensagem para o usuário).
      throw error;
    }
  }
}

// --- Funções Auxiliares ---
// Para deixar as chamadas nos componentes ainda mais limpas, criamos
// funções "atalho" para cada método HTTP, como sugerido no PDF.

/**
 * Função de atalho para requisições GET.
 * A vírgula depois de <T,> é a correção. Ela informa ao TypeScript que
 * <T> é um tipo genérico, e não um componente JSX.
 */
export const connectionAPIGet = <T,>(url: string) =>
  ConnectionAPI.connect<T>(url, MethodsEnum.GET);

/**
 * Função de atalho para requisições POST.
 * A mesma correção com a vírgula (<T,>) é aplicada aqui.
 */
export const connectionAPIPost = <T,>(url: string, body: unknown) =>
  ConnectionAPI.connect<T>(url, MethodsEnum.POST, body);

/**
 * Função de atalho para requisições PUT.
 */
export const connectionAPIPut = <T,>(url: string, body: unknown) =>
  ConnectionAPI.connect<T>(url, MethodsEnum.PUT, body);

/**
 * Função de atalho para requisições PATCH.
 */
export const connectionAPIPatch = <T,>(url: string, body: unknown) =>
  ConnectionAPI.connect<T>(url, MethodsEnum.PATCH, body);
  
/**
 * Função de atalho para requisições DELETE.
 */
export const connectionAPIDelete = <T,>(url: string) =>
  ConnectionAPI.connect<T>(url, MethodsEnum.DELETE);