import OwnerItemCard from './OwnerItemCard';

const ItemSection = ({ title, subtitle, badge, items, emptyState, onError }) => (
  <section className="mt-12">
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="mt-1 text-gray-600">{subtitle}</p>
      </div>
      {badge}
    </div>

    {items.length ? (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <OwnerItemCard key={item.id} item={item} onError={onError} />
        ))}
      </div>
    ) : (
      emptyState
    )}
  </section>
);

export default ItemSection;
