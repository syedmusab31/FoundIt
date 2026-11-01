const EmptyState = ({ icon: Icon, title, description, action }) => (
  <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center">
    {Icon && <Icon className="mx-auto mb-4 text-gray-400" size={48} aria-hidden="true" />}
    <h3 className="mb-2 text-lg font-semibold text-gray-900">{title}</h3>
    {description && <p className="mb-6 text-gray-600">{description}</p>}
    {action}
  </div>
);

export default EmptyState;
