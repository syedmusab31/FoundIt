import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ITEMS_PAGE_SIZE } from '../../../constants/items';
import { itemQueryKeys, itemsApi } from '../api/itemsApi';

export const useInfiniteItems = (filters) =>
  useInfiniteQuery({
    queryKey: itemQueryKeys.list(filters),
    queryFn: ({ pageParam, signal }) =>
      itemsApi.list({ ...filters, page: pageParam, limit: ITEMS_PAGE_SIZE }, { signal }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasNextPage ? lastPage.pagination.page + 1 : undefined,
    staleTime: 30 * 1000,
    placeholderData: (previous) => previous,
  });

export const useItem = (itemId) =>
  useQuery({
    queryKey: itemQueryKeys.detail(itemId),
    queryFn: ({ signal }) => itemsApi.getById(itemId, { signal }),
    enabled: Boolean(itemId),
  });

export const useItemStats = () =>
  useQuery({
    queryKey: itemQueryKeys.stats(),
    queryFn: ({ signal }) => itemsApi.getStats({ signal }),
    staleTime: 5 * 60 * 1000,
  });

export const useMyItems = (filters = {}) =>
  useQuery({
    queryKey: itemQueryKeys.mine(filters),
    queryFn: ({ signal }) => itemsApi.listMine(filters, { signal }),
  });

const useInvalidateItems = () => {
  const queryClient = useQueryClient();
  return () => queryClient.invalidateQueries({ queryKey: itemQueryKeys.all });
};

export const useCreateItem = () => {
  const invalidateItems = useInvalidateItems();
  return useMutation({ mutationFn: itemsApi.create, onSuccess: invalidateItems });
};

export const useUpdateItemStatus = () => {
  const invalidateItems = useInvalidateItems();
  return useMutation({ mutationFn: itemsApi.updateStatus, onSuccess: invalidateItems });
};

export const useDeleteItem = () => {
  const invalidateItems = useInvalidateItems();
  return useMutation({ mutationFn: itemsApi.remove, onSuccess: invalidateItems });
};
