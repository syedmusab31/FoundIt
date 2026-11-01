import { Link } from 'react-router-dom';
import Spinner from './Spinner';

const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dull focus-visible:ring-primary',
  secondary: 'bg-white text-gray-700 border border-gray-300 hover:border-gray-400 hover:bg-gray-50 focus-visible:ring-gray-400',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
  ghost: 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus-visible:ring-gray-300',
  inverse: 'bg-white text-primary hover:bg-gray-50 focus-visible:ring-white',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-8 py-4 text-base',
};

const Button = ({
  to,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  className = '',
  children,
  disabled,
  type = 'button',
  ...props
}) => {
  const classes = [
    'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60',
    VARIANTS[variant],
    SIZES[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled || isLoading} {...props}>
      {isLoading && <Spinner className="h-4 w-4" />}
      {children}
    </button>
  );
};

export default Button;
