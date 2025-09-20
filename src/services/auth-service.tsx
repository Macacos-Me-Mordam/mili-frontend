import { apiPublic, apiPrivate } from '@/lib/ConnectionApi';
import { LoginCredentials, UserProfile } from '@/model/interfaces/user-data';


export const login = (credentials: LoginCredentials): Promise<UserProfile> => {
  return apiPublic.post<UserProfile>('/auth/login', credentials);
};

export const logout = (): Promise<void> => {
  return apiPrivate.post<void>('/auth/logout', {});
};

//pegar essa fução para validar
export const getProfile = (): Promise<UserProfile> => {
  return apiPrivate.get<UserProfile>('/users/profile');
};