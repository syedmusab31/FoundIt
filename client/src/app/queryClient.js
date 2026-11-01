import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 10 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => (error?.status && error.status < 500 ? false : failureCount < 2),
    },
    mutations: {
      retry: false,
    },
  },
});
