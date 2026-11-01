import { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageLoader from '../ui/PageLoader';
import Footer from './Footer';
import Navbar from './Navbar';

const AppLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => window.scrollTo(0, 0), [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
