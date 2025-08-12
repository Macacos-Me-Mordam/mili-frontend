'use client';

import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, login, } from '@/services/auth-service'; 
import { LoginCredentials, UserProfile } from '@/model/interfaces/user-data';

interface AuthContextType {
  user: UserProfile | null;
  isLoadingProfile: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  isLoggingIn: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();


  const { 
    data: user, 
    isLoading: isLoadingProfile,
    isError: isProfileError 
  } = useQuery<UserProfile>({
    queryKey: ['user-profile'],
    queryFn: getProfile,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // estudar mutation
  const { mutateAsync: loginMutation, isPending: isLoggingIn } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profile'] });
    },
  });


  const handleLogin = async (credentials: LoginCredentials) => {
    await loginMutation(credentials);
    router.push('/occurrences'); 
  };


  const handleLogout = () => {
    queryClient.clear();
   
    router.push('/sign-in');
  };


  useEffect(() => {

    if (isProfileError && !isLoadingProfile && pathname !== '/sign-in') {
      router.push('/sign-in');
    }
  }, [isProfileError, isLoadingProfile, pathname, router]);


  const value = {
    user: user ?? null,
    isLoadingProfile,
    login: handleLogin,
    isLoggingIn, // se da para saber se o user esta logado pelo user, se user == null: nao existe
    logout: handleLogout,
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