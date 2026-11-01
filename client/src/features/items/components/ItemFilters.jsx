import { Search, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ITEM_CATEGORIES, PROVINCES } from '../../../constants/items';
import { useDebouncedValue } from '../../../hooks/useDebouncedValue';

const CONTROL =
  'w-full rounded-xl border border-gray-200 bg-white/70 p-2.5 text-sm text-gray-700 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-primary/40';

const CATEGORY_NAMES = ITEM_CATEGORIES.map((category) => category.name);

const ItemFilters = ({ filters, onFilterChange, onClear, hasActiveFilters }) => {
  const [query, setQuery] = useState(filters.q);
  const debouncedQuery = useDebouncedValue(query);

  useEffect(() => {
    const settled = debouncedQuery === query;
    if (settled && debouncedQuery.trim() !== filters.q) onFilterChange('q', debouncedQuery.trim());
  }, [debouncedQuery, query, filters.q, onFilterChange]);

  const handleClear = () => {
    setQuery('');
    onClear();
  };

  return (
    <section className="flex justify-center px-4" aria-label="Filter items">
      <div className="w-full max-w-5xl rounded-2xl border border-white/30 bg-white/50 p-4 shadow-xl backdrop-blur-lg md:p-6">
        <div className="grid grid-cols-1 items-center gap-3 sm:grid-cols-2 lg:grid-cols-6">
          <div className="relative sm:col-span-2">
            <label htmlFor="item-search" className="sr-only">Search items</label>
            <input
              id="item-search"
              type="search"
              placeholder="Search items…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className={`${CONTROL} pr-10`}
            />
            <Search className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>

          <label className="sr-only" htmlFor="filter-province">Province</label>
          <select
            id="filter-province"
            value={filters.province}
            onChange={(event) => onFilterChange('province', event.target.value)}
            className={CONTROL}
          >
            <option value="">All provinces</option>
            {PROVINCES.map((province) => (
              <option key={province} value={province}>{province}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="filter-category">Category</label>
          <select
            id="filter-category"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
            className={CONTROL}
          >
            <option value="">All categories</option>
            {CATEGORY_NAMES.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="filter-date">Date posted</label>
          <input
            id="filter-date"
            type="date"
            value={filters.date}
            onChange={(event) => onFilterChange('date', event.target.value)}
            className={CONTROL}
          />

          <button
            type="button"
            onClick={handleClear}
            disabled={!hasActiveFilters && !query}
            className="flex items-center justify-center gap-1 text-sm font-medium text-gray-500 underline transition-colors hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <XCircle size={16} aria-hidden="true" /> Clear
          </button>
        </div>
      </div>
    </section>
  );
};

export default ItemFilters;
