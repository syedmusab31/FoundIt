import { LogOut, Menu, User, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Button from '../ui/Button';

const PUBLIC_LINKS = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Lost Items', to: ROUTES.LOST_ITEMS },
  { label: 'Found Items', to: ROUTES.FOUND_ITEMS },
];

const PRIVATE_LINKS = [{ label: 'Dashboard', to: ROUTES.DASHBOARD }];

const MOBILE_ONLY_PRIVATE_LINKS = [
  { label: 'Report Lost Item', to: ROUTES.NEW_LOST_ITEM },
  { label: 'Report Found Item', to: ROUTES.NEW_FOUND_ITEM },
];

const desktopLinkClass = ({ isActive }) =>
  `relative font-medium transition-colors duration-200 hover:text-gray-900 ${isActive ? 'text-primary' : 'text-gray-600'}`;

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsMenuOpen(false), [location.pathname]);

  const links = isAuthenticated ? [...PUBLIC_LINKS, ...PRIVATE_LINKS] : PUBLIC_LINKS;
  const mobileLinks = isAuthenticated ? [...links, ...MOBILE_ONLY_PRIVATE_LINKS] : links;

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${
          isScrolled ? 'border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md' : 'border-gray-100 bg-white'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link to={ROUTES.HOME} className="text-2xl font-semibold text-gray-900 transition-colors hover:text-primary">
            FoundIt
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end className={desktopLinkClass}>
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-4 md:flex">
            {isAuthenticated ? (
              <>
                <span className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm font-medium text-gray-700">
                  <User className="h-4 w-4 text-gray-600" aria-hidden="true" /> {user.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Logout
                </button>
              </>
            ) : (
              <Button to={ROUTES.LOGIN}>Login</Button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="p-2 text-gray-600 transition-colors hover:text-gray-900 md:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} aria-hidden="true" />
          <div className="fixed inset-x-0 top-16 space-y-2 border-b border-gray-200 bg-white px-6 py-4 shadow-lg">
            {mobileLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end
                className={({ isActive }) => `block py-3 font-medium ${isActive ? 'text-primary' : 'text-gray-700'}`}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="border-t border-gray-200 pt-4">
              {isAuthenticated ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 rounded-lg px-4 py-3 font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Logout ({user.name})
                </button>
              ) : (
                <Button to={ROUTES.LOGIN} fullWidth size="lg">Login</Button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="h-16" aria-hidden="true" />
    </>
  );
};

export default Navbar;
