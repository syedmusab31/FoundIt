import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [listDropdownOpen, setListDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuLinks = [
    { name: 'Home', path: '/' },
    { name: 'Lost Items', path: '/lost' },
    { name: 'Found Items', path: '/found' },
  ];

  const authenticatedLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    // { name: user?.name || 'Profile', path: '/profile' }
  ];

  // const listDropdownLinks = [
  //   { name: 'List Lost Item', path: '/lost/new', icon: <Plus className="w-4 h-4" /> },
  //   { name: 'List Found Item', path: '/found/new', icon: <Plus className="w-4 h-4" /> },
  // ];

  const handleLogout = () => {
    logout();
    setOpen(false);
    setListDropdownOpen(false);
    navigate('/');
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm' 
          : 'bg-white border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-semibold text-gray-900 hover:text-blue-600 transition-colors duration-200">
                FoundIt
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {menuLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}

              {/* List Dropdown for Authenticated Users
              {isAuthenticated && (
                <div className="relative">
                  <button
                    onClick={() => setListDropdownOpen(!listDropdownOpen)}
                    className="flex items-center gap-1 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 group"
                  >
                    <Plus className="w-4 h-4" />
                    List Item
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${listDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {listDropdownOpen && (
                    <>
                      {/* Backdrop 
                      <div 
                        className="fixed inset-0 z-10" 
                        onClick={() => setListDropdownOpen(false)}
                      ></div>
                      
                      {/* Dropdown 
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2 z-20">
                        {listDropdownLinks.map((link, index) => (
                          <Link
                            key={index}
                            to={link.path}
                            onClick={() => setListDropdownOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                          >
                            {link.icon}
                            {link.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )} */}

              {/* Authenticated Links */}
              {isAuthenticated && authenticatedLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigate('/login')}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                >
                  Login
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setOpen(false)}></div>
          
          {/* Mobile Menu */}
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="px-6 py-4 space-y-4">
              {/* Navigation Links */}
              {menuLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}

              {/* List Dropdown for Mobile */}
              {isAuthenticated && (
                <div className="space-y-2">
                  <button
                    onClick={() => setListDropdownOpen(!listDropdownOpen)}
                    className="flex items-center justify-between w-full py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                  >
                    <div className="flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      List Item
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${listDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {listDropdownOpen && (
                    <div className="pl-6 space-y-2 border-l-2 border-gray-100">
                      {listDropdownLinks.map((link, index) => (
                        <Link
                          key={index}
                          to={link.path}
                          onClick={() => {
                            setOpen(false);
                            setListDropdownOpen(false);
                          }}
                          className="flex items-center gap-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Authenticated Links for Mobile */}
              {isAuthenticated && authenticatedLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-gray-700 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                      <User className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg font-medium transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setOpen(false);
                      navigate('/login');
                    }}
                    className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;