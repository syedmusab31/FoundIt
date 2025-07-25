import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { assets } from '../assets/assets'; // Make sure to import your assets


const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [open, setOpen] = React.useState(false); // State for mobile menu
  const [listDropdownOpen, setListDropdownOpen] = React.useState(false); // State for the new 'List' dropdown
  const navigate = useNavigate();

  const menuLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lost Items', path: '/lost' },
    { name: 'Found Items', path: '/found' },
  ];

  const authenticatedLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: user?.name || 'Profile', path: '/profile' }
  ];

  const listDropdownLinks = [
    { name: 'List Lost Item', path: '/lost/new' },
    { name: 'List Found Item', path: '/found/new' },
  ];

  return (
    <div className={`flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 text-gray-600 border-b border-borderColor relative transition-all bg-light`}>
      <Link to="/" className="text-2xl logo-font text-primary tracking-wide">
        FoundIt
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden sm:flex items-center gap-8">
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated && (
          <div className="relative">
            <button
              onClick={() => setListDropdownOpen(!listDropdownOpen)}
              className="hover:text-primary transition-colors flex items-center gap-1" // Reduced gap from 2 to 1
            >
              <span>List</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className={`w-5 h-5 transition-transform ${listDropdownOpen ? 'rotate-180' : ''}`}
                fill="currentColor"
              >
                <path d="M12 15.707l-4.293-4.293a1 1 0 011.414-1.414L12 13.88l3.879-3.879a1 1 0 011.414 1.414L12 15.707z" />
              </svg>
            </button>
            {listDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-transparent border border-borderColor rounded-lg shadow-lg py-2 z-10">
                {listDropdownLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.path}
                    onClick={() => setListDropdownOpen(false)}
                    className="block px-4 py-2 text-gray-800"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {isAuthenticated && authenticatedLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              navigate('/');
            }}
            className="px-8 py-2 bg-red-500 hover:bg-red-600 transition-all text-white rounded-lg"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="px-8 py-2 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Navigation */}
      <div
        className={`sm:hidden fixed h-screen w-full top-16 left-0 border-t border-borderColor flex flex-col items-start gap-6 p-4 transition-all duration-300 z-50 bg-light ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {menuLinks.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            onClick={() => setOpen(false)}
            className="w-full py-2 hover:text-primary transition-colors"
          >
            {link.name}
          </Link>
        ))}

        {isAuthenticated && (
          <>
            <div className="w-full">
              <button
                onClick={() => setListDropdownOpen(!listDropdownOpen)}
                className="w-full text-left py-2 hover:text-primary transition-colors flex items-center gap-1"
              >
                List
                <img src={assets.drop_icon} alt="dropdown" className={`w-4 h-4 transition-transform ${listDropdownOpen ? 'rotate-180' : ''}`} />    
              </button>
              {listDropdownOpen && (
                <div className="pl-4 border-l border-borderColor mt-2">
                  {listDropdownLinks.map((link, index) => (
                    <Link
                      key={index}
                      to={link.path}
                      onClick={() => {
                        setOpen(false);
                        setListDropdownOpen(false);
                      }}
                      className="block py-2 text-gray-800 hover:text-primary"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {authenticatedLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setOpen(false)}
                className="w-full py-2 hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </>
        )}

        {isAuthenticated ? (
          <button
            onClick={() => {
              logout();
              setOpen(false);
              navigate('/');
            }}
            className="w-full text-left py-2 px-8 bg-red-500 hover:bg-red-600 transition-all text-white rounded-lg"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => {
              setOpen(false);
              navigate('/login');
            }}
            className="w-full text-left py-2 px-8 bg-primary hover:bg-primary-dull transition-all text-white rounded-lg"
          >
            Login
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="sm:hidden cursor-pointer"
        aria-label="Menu"
        onClick={() => {
          setOpen(!open);
          setListDropdownOpen(false); // Close dropdown when opening/closing mobile menu
        }}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="w-6 h-6"
        />
      </button>
    </div>
  );
};

export default Navbar;