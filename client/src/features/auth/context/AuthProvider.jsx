import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';
import { authApi, authQueryKeys } from '../api/authApi';
import { AuthContext } from './AuthContext';

const fetchCurrentUser = async ({ signal }) => {
  try {
    return await authApi.getCurrentUser({ signal });
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
};

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  const { data: user = null, isPending } = useQuery({
    queryKey: authQueryKeys.currentUser,
    queryFn: fetchCurrentUser,
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (loggedInUser) => queryClient.setQueryData(authQueryKeys.currentUser, loggedInUser),
  });

  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } finally {
      queryClient.clear();
      queryClient.setQueryData(authQueryKeys.currentUser, null);
    }
  }, [queryClient]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      isInitializing: isPending,
      login: loginMutation.mutateAsync,
      isLoggingIn: loginMutation.isPending,
      logout,
    }),
    [user, isPending, loginMutation.mutateAsync, loginMutation.isPending, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
