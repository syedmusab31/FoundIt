import { ITEM_STATUS, ITEM_TYPE } from '../../../constants/items';

const StatusBadge = ({ type, status, className = '' }) => {
  const resolved = status === ITEM_STATUS.RESOLVED;
  const label = resolved ? 'Resolved' : type === ITEM_TYPE.LOST ? 'Lost' : 'Found';
  const tone = resolved
    ? 'bg-gray-200 text-gray-700'
    : type === ITEM_TYPE.LOST
      ? 'bg-amber-100 text-amber-800'
      : 'bg-emerald-100 text-emerald-800';

  return (
    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone} ${className}`}>{label}</span>
  );
};

export default StatusBadge;
