import Button from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

const NotFoundPage = () => (
  <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
    <p className="text-6xl font-bold text-primary">404</p>
    <h1 className="text-2xl font-semibold text-gray-900">Page not found</h1>
    <p className="text-gray-600">The page you are looking for does not exist or has been moved.</p>
    <Button to={ROUTES.HOME}>Back to home</Button>
  </div>
);

export default NotFoundPage;
