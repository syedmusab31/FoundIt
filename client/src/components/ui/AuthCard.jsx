const AuthCard = ({ title, subtitle, children, footer }) => (
  <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 px-4 py-12">
    <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {subtitle && <p className="mt-2 text-sm text-gray-600">{subtitle}</p>}
      </div>
      {children}
      {footer && <div className="text-center text-sm text-gray-600">{footer}</div>}
    </div>
  </div>
);

export default AuthCard;
