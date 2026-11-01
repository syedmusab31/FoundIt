import Spinner from './Spinner';

const PageLoader = () => (
  <div className="flex min-h-[50vh] items-center justify-center text-primary" role="status">
    <Spinner className="h-8 w-8" />
    <span className="sr-only">Loading…</span>
  </div>
);

export default PageLoader;
