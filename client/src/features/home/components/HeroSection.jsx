import { ArrowRight, CheckCircle, Search } from 'lucide-react';
import Button from '../../../components/ui/Button';
import { ROUTES } from '../../../constants/routes';
import { formatCount } from '../../../lib/format';
import { PREVIEW_ITEMS } from '../content';

const HeroSection = ({ stats }) => {
  const statTiles = [
    { label: 'Total listings', value: stats?.total },
    { label: 'Items reunited', value: stats?.resolved },
    { label: 'Active lost', value: stats?.activeLost },
    { label: 'Active found', value: stats?.activeFound },
  ];

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-8">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            {stats ? `${formatCount(stats.active)} active listings right now` : 'Reuniting people with their belongings'}
          </div>

          <h1 className="text-5xl font-light leading-tight text-gray-900 lg:text-6xl">
            Getting lost isn&apos;t the end —{' '}
            <span className="font-medium text-primary">finding is just the beginning</span>
          </h1>

          <p className="max-w-xl text-xl leading-relaxed text-gray-600">
            FoundIt makes reuniting lost items with their owners quick, easy and reliable.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Button to={ROUTES.LOST_ITEMS} size="lg">
              <Search className="h-5 w-5" /> Search lost items
            </Button>
            <Button to={ROUTES.FOUND_ITEMS} size="lg" variant="secondary">
              Browse found items <ArrowRight className="h-4 w-4" />
            </Button>
          </div>

          <dl className="grid grid-cols-2 gap-8 pt-8 lg:grid-cols-4">
            {statTiles.map((tile) => (
              <div key={tile.label}>
                <dd className="mb-1 text-2xl font-semibold text-gray-900 lg:text-3xl">
                  {tile.value === undefined ? '—' : formatCount(tile.value)}
                </dd>
                <dt className="text-sm text-gray-600">{tile.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative flex h-96 items-center justify-center lg:h-[500px]" aria-hidden="true">
          <div className="relative">
            <div className="h-96 w-64 rounded-3xl bg-gray-900 p-2 shadow-2xl">
              <div className="flex h-full flex-col rounded-2xl bg-white p-4">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                    <Search className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-semibold text-gray-900">FoundIt</span>
                </div>
                <div className="flex-1 space-y-4">
                  {PREVIEW_ITEMS.map((item) => (
                    <div key={item.title} className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${item.tone}`}>{item.icon}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-xs text-gray-600">{item.caption}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 shadow-lg">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <div className="absolute -bottom-4 -left-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 shadow-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
