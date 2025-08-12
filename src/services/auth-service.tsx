import { api, apiAuth } from '@/lib/api';
import { LoginCredentials, UserProfile } from '@/model/interfaces/user-data';

export const login = async (credentials: LoginCredentials): Promise<void> => {
  try {
    // Usa a instância PÚBLICA, pois o utilizador ainda não está autenticado.
    await api.post('/users/login', { body: credentials });
  } catch (error) {
    console.error('Erro no login:', error);
    throw new Error('Email ou palavra-passe inválidos.');
  }
};

export const getProfile = async (): Promise<UserProfile> => {
  try {
    // Usa a instância PRIVADA, que envia os cookies de autenticação.
    const response = await apiAuth.get<UserProfile>('/users/profile');
    return response;
  } catch (error) {
    console.error('Erro ao obter perfil:', error);
    throw new Error('Não foi possível obter os dados do utilizador.');
  }
};