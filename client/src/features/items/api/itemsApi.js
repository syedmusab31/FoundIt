import { apiClient } from '../../../lib/apiClient';

export const itemsApi = {
  list: async (query, { signal } = {}) => {
    const { data, meta } = await apiClient.get('/items', { query, signal });
    return { items: data, pagination: meta.pagination };
  },
  getById: async (itemId, { signal } = {}) => {
    const { data } = await apiClient.get(`/items/${itemId}`, { signal });
    return data;
  },
  getStats: async ({ signal } = {}) => {
    const { data } = await apiClient.get('/items/stats', { signal });
    return data;
  },
  listMine: async (query, { signal } = {}) => {
    const { data } = await apiClient.get('/items/mine', { query, signal });
    return data;
  },
  create: async (formData) => {
    const { data } = await apiClient.post('/items', formData);
    return data;
  },
  updateStatus: async ({ itemId, status }) => {
    const { data } = await apiClient.patch(`/items/${itemId}/status`, { status });
    return data;
  },
  remove: (itemId) => apiClient.delete(`/items/${itemId}`),
};

export const itemQueryKeys = {
  all: ['items'],
  lists: () => [...itemQueryKeys.all, 'list'],
  list: (filters) => [...itemQueryKeys.lists(), filters],
  detail: (itemId) => [...itemQueryKeys.all, 'detail', itemId],
  stats: () => [...itemQueryKeys.all, 'stats'],
  mine: (filters) => [...itemQueryKeys.all, 'mine', filters],
};
