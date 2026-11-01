import { Link } from 'react-router-dom';
import { ITEM_CATEGORIES } from '../../../constants/items';
import { ROUTES } from '../../../constants/routes';
import { formatCount } from '../../../lib/format';

const CategoriesSection = ({ categoryCounts }) => (
  <section className="bg-gray-50 py-20">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl font-light text-gray-900 lg:text-4xl">Browse by category</h2>
        <p className="mx-auto max-w-2xl text-lg text-gray-600">Find lost items organized by category for faster results</p>
      </div>

      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
        {ITEM_CATEGORIES.map((category) => (
          <Link
            key={category.name}
            to={`${ROUTES.LOST_ITEMS}?category=${encodeURIComponent(category.name)}`}
            className="group rounded-2xl border border-gray-200 bg-white p-6 text-center transition-shadow duration-200 hover:shadow-lg"
          >
            <div className="mb-4 text-3xl transition-transform duration-200 group-hover:scale-110" aria-hidden="true">
              {category.icon}
            </div>
            <h3 className="mb-2 font-medium text-gray-900">{category.name}</h3>
            {categoryCounts && (
              <p className="text-sm text-gray-600">{formatCount(categoryCounts[category.name] ?? 0)} active</p>
            )}
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default CategoriesSection;
