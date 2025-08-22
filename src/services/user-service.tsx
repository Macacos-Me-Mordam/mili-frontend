import { apiPrivate } from "@/lib/ConnectionApi";
import { NewUserPayload, UserProfile } from "@/model/interfaces/user-data";

export const createUser = (user: NewUserPayload): Promise<UserProfile> => {
  return apiPrivate.post<UserProfile>('/users', user); 
};

export const listUsers = (): Promise<UserProfile[]> => {
  return apiPrivate.get<UserProfile[]>('/users'); 
};

export const getUserProfile = (): Promise<UserProfile> => {
  return apiPrivate.get<UserProfile>('/users/profile'); 
};
