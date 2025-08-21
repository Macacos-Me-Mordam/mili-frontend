'use client';

import { createContext, useContext, ReactNode, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, login, logout } from '@/services/auth-service';
import { LoginCredentials, UserProfile } from '@/model/interfaces/user-data';

const PUBLIC_PATHS = ['/sign-in', '/register']; 

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

  const {
    data: user,
    isLoading: isLoadingProfile,
    isError: isProfileError,
  } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getProfile,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const { mutateAsync: loginMutation, isPending: isLoggingIn } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      queryClient.setQueryData(['user-profile'], data);
      router.push('/occurrences');
    },
    onError: (error) => {
      console.error("Login failed:", error.message);
    },
  });

  const { mutate: logoutMutation, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['user-profile'], null);
      queryClient.removeQueries();
      router.push('/landing-page');
    },
  });

  const handleLogin = useCallback(async (credentials: LoginCredentials) => {
    await loginMutation(credentials);
  }, [loginMutation]);

  const handleLogout = useCallback(() => {
    logoutMutation();
  }, [logoutMutation]);

  useEffect(() => {
    if (isLoadingProfile) {
      return;
    }

    const isPublic = PUBLIC_PATHS.includes(pathname);
    
    if (user && isPublic) {
      router.push('/occurrences');
    }

    if (isProfileError && !isPublic) {
      router.push('/landing-page');
    }

  }, [isLoadingProfile, isProfileError, user, pathname, router]);

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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}