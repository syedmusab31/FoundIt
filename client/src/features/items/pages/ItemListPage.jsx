import { PackageSearch } from 'lucide-react';
import Alert from '../../../components/ui/Alert';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import PageHeader from '../../../components/ui/PageHeader';
import PageLoader from '../../../components/ui/PageLoader';
import { ITEM_TYPE } from '../../../constants/items';
import ItemCard from '../components/ItemCard';
import ItemFilters from '../components/ItemFilters';
import { useItemFilters } from '../hooks/useItemFilters';
import { useInfiniteItems } from '../hooks/useItemQueries';

const PAGE_COPY = {
  [ITEM_TYPE.LOST]: { title: 'Lost Items', empty: 'No lost items match your filters.' },
  [ITEM_TYPE.FOUND]: { title: 'Found Items', empty: 'No found items match your filters.' },
};

const ItemListPage = ({ type }) => {
  const { filters, setFilter, clearFilters, hasActiveFilters } = useItemFilters();
  const { data, error, isPending, isFetching, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteItems({ type, ...filters });

  const items = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.pagination.total ?? 0;
  const copy = PAGE_COPY[type];

  return (
    <div className="flex min-h-screen flex-col bg-light pb-16">
      <PageHeader title={copy.title} subtitle="Filter by category, province or date — or search by keyword" />

      <ItemFilters
        key={type}
        filters={filters}
        onFilterChange={setFilter}
        onClear={clearFilters}
        hasActiveFilters={hasActiveFilters}
      />

      <main className="mx-auto w-full max-w-7xl flex-grow px-4 py-8">
        {error && <Alert>{error.message}</Alert>}

        {isPending ? (
          <PageLoader />
        ) : items.length ? (
          <>
            <p className="mb-4 text-sm text-gray-500" aria-live="polite">
              Showing {items.length} of {total} {isFetching && !isFetchingNextPage ? '· updating…' : ''}
            </p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </div>
          </>
        ) : (
          !error && <EmptyState icon={PackageSearch} title={copy.empty} description="Try adjusting or clearing your filters." />
        )}

        {hasNextPage && (
          <div className="mt-10 flex justify-center">
            <Button onClick={() => fetchNextPage()} isLoading={isFetchingNextPage}>
              Load more
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ItemListPage;
