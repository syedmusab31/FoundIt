import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import Button from '../ui/Button';

const RouteErrorBoundary = () => {
  const error = useRouteError();
  const message = isRouteErrorResponse(error) ? error.statusText : 'Something went wrong while loading this page.';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Unexpected error</h1>
      <p className="max-w-md text-gray-600">{message}</p>
      <Button onClick={() => window.location.assign('/')}>Back to home</Button>
    </div>
  );
};

export default RouteErrorBoundary;
