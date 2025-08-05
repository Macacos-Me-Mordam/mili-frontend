// Declara uma constante 'isServer'. Ela verifica se o código está sendo executado no ambiente do servidor
// (Node.js) ou no navegador. 'typeof window === 'undefined'' é verdadeiro no servidor, pois o objeto 'window'
// só existe no navegador. Isso é útil para definir URLs de API diferentes para cada ambiente.
const isServer = typeof window === 'undefined';

/**
 * @class AuthService
 * Esta classe é como uma "caixa de ferramentas" para a autenticação.
 * Ela agrupa todas as funções que se comunicam com as rotas de autenticação
 * da nossa API no backend (o mili-backend).
 */
export class AuthService {
    // 'baseUrl' irá armazenar o endereço base da nossa API. Ex: 'http://localhost:8000'.
    // É 'private' porque só deve ser usada dentro desta classe.
    private baseUrl: string;

    // 'token' irá guardar o token de autenticação do usuário, caso ele esteja logado.
    // É opcional ('?') porque o usuário pode não estar logado.
    private token?: string;

    // O 'constructor' é um método especial que é executado sempre que criamos
    // uma nova instância da classe (ex: const servico = new AuthService()).
    constructor(token?: string) {
        // Armazena o token recebido (se houver) na propriedade 'this.token' da classe.
        this.token = token;

        // Aqui definimos a URL base da API usando a constante 'isServer' que criamos no início.
        this.baseUrl = isServer
            // Se 'isServer' for verdadeiro (executando no backend/servidor)...
            // Usamos a URL completa definida nas variáveis de ambiente ou uma URL padrão.
            ? process.env.NEXT_PUBLIC_MILI_API_URL || 'http://localhost:3000'
            // Se 'isServer' for falso (executando no frontend/navegador)...
            // Usamos uma URL relativa '/api'. Isso aciona o proxy que configuramos no 'next.config.ts'.
            : '/api';
    }

    /**
     * @method getHeaders
     * Este é um método auxiliar 'private' para montar os cabeçalhos (headers)
     * que serão enviados em cada requisição para a API.
     * @returns {Record<string, string>} Um objeto com os cabeçalhos.
     */
    private getHeaders(): Record<string, string> {
        // Cria um objeto de cabeçalhos padrão. 'Content-Type': 'application/json'
        // informa à API que estamos enviando dados no formato JSON.
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
        };

        // Se um token de autenticação existir (ou seja, se o usuário estiver logado)...
        if (this.token) {
            // Adiciona o cabeçalho 'Authorization' com o token no formato 'Bearer'.
            // Este é o padrão que a maioria das APIs usa para validar requisições seguras.
            headers['Authorization'] = `Bearer ${this.token}`;
        }

        // Retorna o objeto de cabeçalhos montado.
        return headers;
    }

    /**
     * @method handleResponse
     * Um método genérico para tratar as respostas da API de forma padronizada.
     * Ele centraliza a lógica de verificação de erros.
     * @template T - O tipo de dado esperado na resposta de sucesso.
     * @param {Response} response - O objeto de resposta da API.
     * @returns {Promise<T>} Os dados da resposta em formato JSON.
     */
    private async handleResponse<T>(response: Response): Promise<T> {
        // Verifica se a resposta NÃO foi bem-sucedida (ex: status 404, 500, etc.).
        if (!response.ok) {
            // Tenta extrair a mensagem de erro do corpo da resposta da API.
            const errorData = await response.json().catch(() => ({}));
            // Exibe o erro no console do desenvolvedor para facilitar a depuração.
            console.error('API Error:', response.status, errorData);
            // Lança um novo erro, que poderá ser capturado pelo bloco 'catch' onde a função foi chamada.
            throw new Error(errorData.message || `Erro na requisição: ${response.status}`);
        }

        // Verifica se a resposta tem o status 204 (No Content), que significa sucesso, mas sem corpo de resposta.
        if (response.status === 204) {
          // Retorna um objeto vazio para evitar erros ao tentar converter uma resposta vazia para JSON.
          return {} as T;
        }

        // Se a resposta foi bem-sucedida (status 200-299), converte o corpo da resposta para JSON e o retorna.
        return response.json();
    }

    /**
     * @method login
     * Esta é a função que efetivamente se conecta com a rota `POST /users/login` do backend.
     * @param {string} email - O email do usuário que está tentando logar.
     * @param {string} password - A senha do usuário.
     * @returns {Promise<{ token: string }>} Uma promessa que, em caso de sucesso, resolve com um objeto contendo o token.
     */
    async login(email: string, password: string): Promise<{ token: string }> {
        // Monta a URL completa para a rota de login. Ex: 'http://localhost:8000/users/login'.
        const url = `${this.baseUrl}/users/login`;

        // A função 'fetch' é a forma padrão do navegador para fazer requisições HTTP (chamadas de API).
        const response = await fetch(url, {
            // Define o método HTTP como 'POST', usado para criar ou enviar dados.
            method: 'POST',
            // Chama nosso método auxiliar para obter os cabeçalhos necessários.
            headers: this.getHeaders(),
            // Converte o objeto JavaScript { email, password } em uma string no formato JSON para ser enviada no corpo da requisição.
            body: JSON.stringify({ email, password }),
        });

        // Utiliza nosso método centralizado para tratar a resposta e retornar os dados ou lançar um erro.
        return this.handleResponse(response);
    }
}