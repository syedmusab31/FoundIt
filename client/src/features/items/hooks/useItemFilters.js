import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

const FILTER_KEYS = ['q', 'category', 'province', 'date'];

export const useItemFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filters = useMemo(
    () => Object.fromEntries(FILTER_KEYS.map((key) => [key, searchParams.get(key) ?? ''])),
    [searchParams],
  );

  const setFilter = useCallback(
    (key, value) =>
      setSearchParams(
        (current) => {
          const next = new URLSearchParams(current);
          if (value) next.set(key, value);
          else next.delete(key);
          return next;
        },
        { replace: true },
      ),
    [setSearchParams],
  );

  const clearFilters = useCallback(() => setSearchParams({}, { replace: true }), [setSearchParams]);

  const hasActiveFilters = FILTER_KEYS.some((key) => filters[key]);

  return { filters, setFilter, clearFilters, hasActiveFilters };
};
