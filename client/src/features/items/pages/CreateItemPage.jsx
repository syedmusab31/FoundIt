import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/ui/PageHeader';
import { ITEM_TYPE } from '../../../constants/items';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../../auth/hooks/useAuth';
import ItemForm from '../components/ItemForm';
import { useCreateItem } from '../hooks/useItemQueries';

const PAGE_COPY = {
  [ITEM_TYPE.LOST]: {
    title: 'Report a Lost Item',
    subtitle: 'Describe what you lost so finders can reach you',
    submitLabel: 'Publish lost item',
  },
  [ITEM_TYPE.FOUND]: {
    title: 'Report a Found Item',
    subtitle: 'Help reunite this item with its owner',
    submitLabel: 'Publish found item',
  },
};

const CreateItemPage = ({ type }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const createItem = useCreateItem();
  const copy = PAGE_COPY[type];

  const handleSubmit = (formData) => {
    formData.append('type', type);
    createItem.mutate(formData, {
      onSuccess: () => navigate(ROUTES.DASHBOARD, { state: { message: 'Item listed successfully!' } }),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pb-16">
      <PageHeader title={copy.title} subtitle={copy.subtitle} />
      <div className="mx-auto max-w-3xl">
        <ItemForm
          key={type}
          submitLabel={copy.submitLabel}
          defaultPhone={user?.phone ?? ''}
          onSubmit={handleSubmit}
          isSubmitting={createItem.isPending}
          submitError={createItem.error?.message}
        />
      </div>
    </div>
  );
};

export default CreateItemPage;
