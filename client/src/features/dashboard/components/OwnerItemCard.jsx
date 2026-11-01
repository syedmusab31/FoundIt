import { CheckCircle2, MoreVertical, RotateCcw, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ITEM_STATUS } from '../../../constants/items';
import { buildItemDetailPath } from '../../../constants/routes';
import { formatDate } from '../../../lib/format';
import ItemImage from '../../items/components/ItemImage';
import StatusBadge from '../../items/components/StatusBadge';
import { useDeleteItem, useUpdateItemStatus } from '../../items/hooks/useItemQueries';

const MENU_ITEM = 'flex w-full items-center gap-2 px-4 py-2 text-left text-sm hover:bg-gray-100 disabled:opacity-50';

const OwnerItemCard = ({ item, onError }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const updateStatus = useUpdateItemStatus();
  const deleteItem = useDeleteItem();
  const isBusy = updateStatus.isPending || deleteItem.isPending;
  const isActive = item.status === ITEM_STATUS.ACTIVE;

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) setIsMenuOpen(false);
    };
    const handleKeyDown = (event) => event.key === 'Escape' && setIsMenuOpen(false);
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  const handleToggleStatus = () => {
    setIsMenuOpen(false);
    updateStatus.mutate(
      { itemId: item.id, status: isActive ? ITEM_STATUS.RESOLVED : ITEM_STATUS.ACTIVE },
      { onError: (error) => onError(error.message) },
    );
  };

  const handleDelete = () => {
    setIsMenuOpen(false);
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    deleteItem.mutate(item.id, { onError: (error) => onError(error.message) });
  };

  return (
    <article className={`overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-md transition ${isBusy ? 'opacity-60' : ''}`}>
      <div className="relative">
        <Link to={buildItemDetailPath(item.id)}>
          <ItemImage src={item.image} alt={item.title} className="h-40 w-full" />
        </Link>
        <StatusBadge type={item.type} status={item.status} className="absolute right-3 top-3" />

        <div className="absolute left-3 top-3" ref={menuRef}>
          <button
            type="button"
            aria-label="Item actions"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            disabled={isBusy}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="rounded-full bg-white/90 p-1.5 text-gray-700 shadow hover:bg-white"
          >
            <MoreVertical size={18} />
          </button>
          {isMenuOpen && (
            <div role="menu" className="absolute left-0 z-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <button type="button" role="menuitem" className={`${MENU_ITEM} text-gray-700`} onClick={handleToggleStatus}>
                {isActive ? <CheckCircle2 size={16} /> : <RotateCcw size={16} />}
                {isActive ? 'Mark as resolved' : 'Mark as active'}
              </button>
              <button type="button" role="menuitem" className={`${MENU_ITEM} text-red-600 hover:bg-red-50`} onClick={handleDelete}>
                <Trash2 size={16} /> Delete item
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="truncate font-semibold text-gray-900">{item.title}</h3>
        <p className="text-sm text-gray-600">{item.province}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">{formatDate(item.createdAt)}</span>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-700">{item.category}</span>
        </div>
      </div>
    </article>
  );
};

export default OwnerItemCard;
