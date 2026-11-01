import { ArrowLeft, CalendarDays, MapPin, Tag } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Alert from '../../../components/ui/Alert';
import Button from '../../../components/ui/Button';
import PageLoader from '../../../components/ui/PageLoader';
import { ROUTES } from '../../../constants/routes';
import { formatDate } from '../../../lib/format';
import ContactButton from '../components/ContactButton';
import ItemImage from '../components/ItemImage';
import StatusBadge from '../components/StatusBadge';
import { useItem } from '../hooks/useItemQueries';

const ItemDetailPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { data: item, isPending, error } = useItem(itemId);

  if (isPending) return <PageLoader />;

  if (error) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-4 py-16">
        <Alert>{error.status === 404 ? 'This item does not exist or was removed.' : error.message}</Alert>
        <Button variant="secondary" to={ROUTES.HOME}>Go home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light px-4 py-10">
      <div className="mx-auto max-w-5xl">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft size={16} aria-hidden="true" /> Back
        </Button>

        <article className="grid overflow-hidden rounded-3xl bg-white shadow-lg md:grid-cols-2">
          <ItemImage src={item.image} alt={item.title} className="h-80 w-full md:h-full" />

          <div className="space-y-6 p-8">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-3xl font-semibold text-gray-900">{item.title}</h1>
              <StatusBadge type={item.type} status={item.status} />
            </div>

            <p className="whitespace-pre-line leading-relaxed text-gray-700">{item.description}</p>

            <ul className="space-y-3 text-sm text-gray-600">
              <li className="flex items-center gap-2"><Tag size={16} aria-hidden="true" /> {item.category}</li>
              <li className="flex items-center gap-2"><MapPin size={16} aria-hidden="true" /> {item.province}</li>
              <li className="flex items-center gap-2"><CalendarDays size={16} aria-hidden="true" /> Posted {formatDate(item.createdAt)}</li>
            </ul>

            <div className="space-y-3 border-t border-gray-100 pt-6">
              {item.owner && <p className="text-sm text-gray-600">Posted by <span className="font-medium text-gray-900">{item.owner.name}</span></p>}
              <ContactButton phone={item.phone} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ItemDetailPage;
