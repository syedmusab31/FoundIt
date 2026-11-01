const PageHeader = ({ title, subtitle }) => (
  <header className="mx-auto max-w-3xl px-4 py-10 text-center">
    <h1 className="text-3xl font-semibold text-primary md:text-4xl">{title}</h1>
    {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
  </header>
);

export default PageHeader;
