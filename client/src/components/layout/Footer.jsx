import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

const FOOTER_LINKS = [
  { label: 'Lost items', to: ROUTES.LOST_ITEMS },
  { label: 'Found items', to: ROUTES.FOUND_ITEMS },
  { label: 'Report lost item', to: ROUTES.NEW_LOST_ITEM },
  { label: 'Report found item', to: ROUTES.NEW_FOUND_ITEM },
];

const Footer = () => (
  <footer className="border-t border-gray-200 bg-white">
    <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <div className="grid gap-8 md:grid-cols-3">
        <div className="space-y-4 md:col-span-2">
          <Link to={ROUTES.HOME} className="text-2xl font-semibold text-gray-900">FoundIt</Link>
          <p className="max-w-md leading-relaxed text-gray-600">
            Reuniting lost items with their owners through technology and community.
          </p>
        </div>
        <nav aria-label="Footer">
          <h3 className="mb-4 font-medium text-gray-900">Explore</h3>
          <ul className="space-y-3">
            {FOOTER_LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="text-sm text-gray-600 transition-colors hover:text-gray-900">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 text-sm text-gray-600 md:flex-row">
        <p>© {new Date().getFullYear()} FoundIt. All rights reserved.</p>
        <p>Developed by Syed Musab Bukhari</p>
      </div>
    </div>
  </footer>
);

export default Footer;
