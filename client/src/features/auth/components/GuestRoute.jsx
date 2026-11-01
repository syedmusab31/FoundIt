import { Navigate, Outlet, useLocation } from 'react-router-dom';
import PageLoader from '../../../components/ui/PageLoader';
import { ROUTES } from '../../../constants/routes';
import { useAuth } from '../hooks/useAuth';

const GuestRoute = () => {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  if (isInitializing) return <PageLoader />;
  if (isAuthenticated) return <Navigate to={location.state?.from?.pathname ?? ROUTES.DASHBOARD} replace />;
  return <Outlet />;
};

export default GuestRoute;
