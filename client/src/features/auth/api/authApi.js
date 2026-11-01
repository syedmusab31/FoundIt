import { apiClient } from '../../../lib/apiClient';

export const authApi = {
  getCurrentUser: async ({ signal } = {}) => {
    const { data } = await apiClient.get('/auth/me', { signal });
    return data.user;
  },
  login: async (credentials) => {
    const { data } = await apiClient.post('/auth/login', credentials);
    return data.user;
  },
  logout: () => apiClient.post('/auth/logout'),
  register: (payload) => apiClient.post('/auth/register', payload),
  verifyEmail: (payload) => apiClient.post('/auth/verify-email', payload),
  resendVerification: (payload) => apiClient.post('/auth/verify-email/resend', payload),
  requestPasswordReset: (payload) => apiClient.post('/auth/password/forgot', payload),
  verifyPasswordResetOtp: (payload) => apiClient.post('/auth/password/verify-otp', payload),
  resetPassword: (payload) => apiClient.post('/auth/password/reset', payload),
};

export const authQueryKeys = {
  currentUser: ['auth', 'current-user'],
};
