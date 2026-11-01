import { CheckCircle, Package, Plus, Search, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Alert from '../../../components/ui/Alert';
import Button from '../../../components/ui/Button';
import EmptyState from '../../../components/ui/EmptyState';
import PageLoader from '../../../components/ui/PageLoader';
import { ITEM_STATUS } from '../../../constants/items';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../auth/hooks/useAuth';
import { useMyItems } from '../../items/hooks/useItemQueries';
import ItemSection from '../components/ItemSection';

const getGreeting = (date = new Date()) => {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};

const matchesQuery = (item, query) =>
  !query ||
  [item.title, item.description, item.category, item.province].some((field) =>
    field?.toLowerCase().includes(query),
  );

const DashboardPage = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [actionError, setActionError] = useState('');
  const { data: items = [], isPending, error } = useMyItems();

  const { activeItems, resolvedItems } = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const visible = items.filter((item) => matchesQuery(item, query));
    return {
      activeItems: visible.filter((item) => item.status === ITEM_STATUS.ACTIVE),
      resolvedItems: visible.filter((item) => item.status === ITEM_STATUS.RESOLVED),
    };
  }, [items, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <header>
          <h1 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-4xl font-bold text-transparent">
            {getGreeting()}{user?.name ? `, ${user.name.split(' ')[0]}` : ''}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">Here&apos;s what&apos;s happening with your items</p>
        </header>

        <div className="mt-6 space-y-3">
          {location.state?.message && <Alert tone="success">{location.state.message}</Alert>}
          <Alert>{actionError || error?.message}</Alert>
        </div>

        <section className="mt-8 flex flex-col gap-4 lg:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <label htmlFor="dashboard-search" className="sr-only">Search your items</label>
            <input
              id="dashboard-search"
              type="search"
              placeholder="Search your items…"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-12 pr-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button to={ROUTES.NEW_LOST_ITEM} size="lg">
              <Plus size={20} /> Report lost item
            </Button>
            <Button to={ROUTES.NEW_FOUND_ITEM} size="lg" variant="secondary">
              <CheckCircle size={20} /> Report found item
            </Button>
          </div>
        </section>

        {isPending ? (
          <PageLoader />
        ) : (
          <>
            <ItemSection
              title="Your active listings"
              subtitle="Items that are still lost or waiting for their owner"
              badge={
                <span className="flex items-center gap-2 text-sm text-gray-600">
                  <TrendingUp size={16} /> {activeItems.length} active
                </span>
              }
              items={activeItems}
              onError={setActionError}
              emptyState={
                <EmptyState
                  icon={Package}
                  title="No active listings"
                  description="Report a lost or found item to get started"
                  action={<Button to={ROUTES.NEW_LOST_ITEM}><Plus size={18} /> Report lost item</Button>}
                />
              }
            />
            <ItemSection
              title="Resolved"
              subtitle="Items that have been successfully reunited"
              badge={
                <span className="flex items-center gap-2 text-sm text-green-600">
                  <CheckCircle size={16} /> {resolvedItems.length} resolved
                </span>
              }
              items={resolvedItems}
              onError={setActionError}
              emptyState={
                <EmptyState icon={CheckCircle} title="No resolved items yet" description="Your successful reunions will appear here" />
              }
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
