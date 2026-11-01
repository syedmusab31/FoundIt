import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/layout/AppLayout';
import RouteErrorBoundary from '../components/layout/RouteErrorBoundary';
import { ITEM_TYPE } from '../constants/items';
import { ROUTES } from '../constants/routes';
import GuestRoute from '../features/auth/components/GuestRoute';
import ProtectedRoute from '../features/auth/components/ProtectedRoute';
import HomePage from '../features/home/pages/HomePage';

const LoginPage = lazy(() => import('../features/auth/pages/LoginPage'));
const SignupPage = lazy(() => import('../features/auth/pages/SignupPage'));
const VerifyEmailPage = lazy(() => import('../features/auth/pages/VerifyEmailPage'));
const ForgotPasswordPage = lazy(() => import('../features/auth/pages/ForgotPasswordPage'));
const ItemListPage = lazy(() => import('../features/items/pages/ItemListPage'));
const ItemDetailPage = lazy(() => import('../features/items/pages/ItemDetailPage'));
const CreateItemPage = lazy(() => import('../features/items/pages/CreateItemPage'));
const DashboardPage = lazy(() => import('../features/dashboard/pages/DashboardPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.LOST_ITEMS, element: <ItemListPage key={ITEM_TYPE.LOST} type={ITEM_TYPE.LOST} /> },
      { path: ROUTES.FOUND_ITEMS, element: <ItemListPage key={ITEM_TYPE.FOUND} type={ITEM_TYPE.FOUND} /> },
      { path: ROUTES.ITEM_DETAIL, element: <ItemDetailPage /> },
      { path: ROUTES.VERIFY_EMAIL, element: <VerifyEmailPage /> },
      {
        element: <GuestRoute />,
        children: [
          { path: ROUTES.LOGIN, element: <LoginPage /> },
          { path: ROUTES.SIGNUP, element: <SignupPage /> },
          { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.NEW_LOST_ITEM, element: <CreateItemPage key={ITEM_TYPE.LOST} type={ITEM_TYPE.LOST} /> },
          { path: ROUTES.NEW_FOUND_ITEM, element: <CreateItemPage key={ITEM_TYPE.FOUND} type={ITEM_TYPE.FOUND} /> },
        ],
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
