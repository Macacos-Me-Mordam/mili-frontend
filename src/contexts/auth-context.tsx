// src/contexts/AuthProvider.tsx

'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// Importa os novos serviços, incluindo a função de logout
import { getProfile, login, logout } from '@/services/auth-service';
import { LoginCredentials, UserProfile } from '@/model/interfaces/user-data';

interface AuthContextType {
  user: UserProfile | null;
  isLoadingProfile: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoggingIn: boolean;
  logout: () => void;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  // A busca pelo perfil do usuário continua a mesma
  const {
    data: user,
    isLoading: isLoadingProfile,
    isError: isProfileError
  } = useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: getProfile,
    retry: 1, // Tenta buscar o perfil apenas uma vez
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para o processo de login
  const { mutateAsync: loginMutation, isPending: isLoggingIn } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      // Após o login, invalida a query do perfil para forçar uma nova busca
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });

  // ✨ NOVO: Mutation para o processo de logout
  const { mutateAsync: logoutMutation, isPending: isLoggingOut } = useMutation({
      mutationFn: logout,
      onSuccess: () => {
          // Após o logout, limpa todo o cache do queryClient e redireciona
          queryClient.clear();
          router.push('/login');
      }
  });

  // Função chamada pela UI para iniciar o login
  const handleLogin = async (credentials: LoginCredentials) => {
    await loginMutation(credentials);
    router.push('/occurrences'); // Redireciona após o sucesso
  };

  // ✨ ATUALIZADO: Função chamada pela UI para iniciar o logout
  const handleLogout = async () => {
    await logoutMutation();
  };

  // Efeito para proteger as rotas
  useEffect(() => {
    // Se a busca pelo perfil falhar e não estivermos na página de login, redireciona
    if (isProfileError && !isLoadingProfile && pathname !== '/login') {
      router.push('/login');
    }
  }, [isProfileError, isLoadingProfile, pathname, router]);


  const value = {
    user: user ?? null,
    isLoadingProfile,
    login: handleLogin,
    isLoggingIn,
    logout: handleLogout,
    isLoggingOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
}