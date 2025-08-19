// Caminho: src/model/interfaces/user-data.ts

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
}