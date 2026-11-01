import { Link } from 'react-router-dom';
import { buildItemDetailPath } from '../../../constants/routes';
import { formatDate } from '../../../lib/format';
import ContactButton from './ContactButton';
import ItemImage from './ItemImage';
import StatusBadge from './StatusBadge';

const ItemCard = ({ item }) => (
  <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-xl">
    <StatusBadge type={item.type} status={item.status} className="absolute right-4 top-4 z-10 shadow" />

    <Link to={buildItemDetailPath(item.id)} className="block h-52 overflow-hidden">
      <ItemImage
        src={item.image}
        alt={item.title}
        className="h-full w-full transition-transform duration-300 group-hover:scale-105"
      />
    </Link>

    <div className="flex flex-grow flex-col gap-4 p-5">
      <div className="space-y-1">
        <h3 className="truncate text-xl font-bold text-gray-900">
          <Link to={buildItemDetailPath(item.id)} className="hover:text-primary">
            {item.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-gray-600">{item.description}</p>
      </div>

      <dl className="grid grid-cols-2 gap-y-2 text-sm text-gray-500">
        <div>
          <dt className="inline font-semibold text-gray-700">Category: </dt>
          <dd className="inline">{item.category}</dd>
        </div>
        <div>
          <dt className="inline font-semibold text-gray-700">Province: </dt>
          <dd className="inline">{item.province}</dd>
        </div>
        <div className="col-span-2">
          <dt className="inline font-semibold text-gray-700">Posted: </dt>
          <dd className="inline">{formatDate(item.createdAt)}</dd>
        </div>
      </dl>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4">
        {item.owner && (
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 font-bold text-gray-700">
              {item.owner.name.charAt(0).toUpperCase()}
            </span>
            <span className="text-sm font-medium text-gray-800">{item.owner.name}</span>
          </div>
        )}
        <ContactButton phone={item.phone} />
      </div>
    </div>
  </article>
);

export default ItemCard;
