// src/services/auth-service.ts

import { connectionAPIGet, connectionAPIPost } from "@/lib/ConnectionApi";
import { LoginCredentials, UserProfile } from "@/model/interfaces/user-data";

const API_URL = 'http://localhost:8080';

/**
 * Realiza o login do usuário.
 * Chama o endpoint público de login.
 */
export const login = async (credentials: LoginCredentials): Promise<void> => {
  // A função de login não retorna dados, apenas o cookie de autenticação.
  await connectionAPIPost<void>(`${API_URL}/auth/login`, credentials);
};

/**
 * Busca os dados do perfil do usuário autenticado.
 * Chama um endpoint privado que requer autenticação.
 */
export const getProfile = async (): Promise<UserProfile> => {
  return await connectionAPIGet<UserProfile>(`${API_URL}/auth/profile`);
};

/**
 * Realiza o logout do usuário.
 * Invalida o cookie de autenticação no back-end.
 */
export const logout = async (): Promise<void> => {
  // A função de logout também não retorna dados.
  await connectionAPIPost<void>(`${API_URL}/auth/logout`, {});
};