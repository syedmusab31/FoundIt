import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PageLoader from '../../../components/ui/PageLoader';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../hooks/useAuth';

const ProtectedRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  return <Outlet />;
};

export default ProtectedRoute;
