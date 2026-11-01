const TONES = {
  error: 'bg-red-50 border-red-500 text-red-700',
  success: 'bg-green-50 border-green-500 text-green-700',
  info: 'bg-blue-50 border-blue-500 text-blue-700',
};

const Alert = ({ tone = 'error', children, className = '' }) => {
  if (!children) return null;
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-md border-l-4 p-4 text-sm ${TONES[tone]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Alert;
