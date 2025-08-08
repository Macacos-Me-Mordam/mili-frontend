import api from './api';

// 1. Tipagem de Dados (DTOs)
//    Estes tipos correspondem aos DTOs (Data Transfer Objects) do seu backend,
//    garantindo que os dados trocados entre o frontend e o backend são consistentes.

/**
 * Dados necessários para o login de um utilizador.
 * Corresponde ao `LoginUserDto` do backend.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Resposta com os dados do perfil do utilizador.
 * Corresponde ao `UserResponseDto` do backend.
 */
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}

// 2. Funções do Serviço de Autenticação
//    Cada função representa uma chamada à API do backend.

/**
 * Envia as credenciais para o endpoint de login.
 * O backend irá devolver os tokens de acesso e de atualização
 * em cookies HTTP-Only, que o browser armazenará de forma segura.
 * @param credentials - O email e a password do utilizador.
 */
export const login = async (credentials: LoginCredentials): Promise<void> => {
  try {
    // Faz a requisição POST para a rota /users/login
    await api.post('/users/login', credentials);
    console.log('Login realizado com sucesso!');
  } catch (error) {
    console.error('Erro no login:', error);
    // Lança o erro para que o componente que chamou esta função possa tratá-lo
    // (ex: mostrar uma mensagem de erro ao utilizador).
    throw new Error('Email ou palavra-passe inválidos.');
  }
};

/**
 * Obtém os dados do perfil do utilizador autenticado.
 * O browser enviará automaticamente o cookie com o 'access_token'.
 * @returns Os dados do perfil do utilizador.
 */
export const getProfile = async (): Promise<UserProfile> => {
  try {
    const response = await api.get<UserProfile>('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    throw new Error('Não foi possível obter os dados do utilizador. Por favor, tente fazer o login novamente.');
  }
};

/**
 * Solicita um novo access_token utilizando o refresh_token.
 * Esta função é útil quando o access_token expira.
 * O browser envia o 'refresh_token' (que tem um tempo de vida maior)
 * e o backend retorna um novo 'access_token'.
 */
export const refreshToken = async (): Promise<void> => {
    try {
        await api.post('/users/refresh-token');
        console.log('Token atualizado com sucesso!');
    } catch (error) {
        console.error('Erro ao atualizar o token:', error);
        throw new Error('A sua sessão expirou. Por favor, faça o login novamente.');
    }
}

/**
 * Para fazer logout, o ideal seria ter um endpoint no backend que invalide
 * os cookies. Como não temos um, uma abordagem comum no frontend é
 * remover os cookies, embora os cookies HTTP-Only não possam ser
 * acedidos via JavaScript.
 *
 * A melhor abordagem é o backend limpar os seus próprios cookies.
 * Adicionaremos uma função de logout no backend mais tarde. Por agora,
 * esta função pode ser um placeholder.
 */
export const logout = async (): Promise<void> => {
  // Idealmente, chamar um endpoint como: await api.post('/users/logout');
  // que instruiria o backend a limpar os cookies.
  console.log('Logout solicitado.');
};