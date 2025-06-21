import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Code2, LogOut, User, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../features/auth/authSlice';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Sample user data - replace with your actual selector
  const user = useSelector((state) => state.auth.user) || { name: 'John Doe' };
  
  const isActive = (path) => location.pathname === path;
  
  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-800 bg-gradient-to-r from-gray-900 to-black sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2 text-white">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="text-xl font-bold">DevPractice</span>
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link
                to="/dashboard"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/dashboard')
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                My Snippets
              </Link>
              <Link
                to="/community"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/community')
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Community
              </Link>
              <Link
                to="/editor"
                className={`text-sm font-medium transition-colors duration-200 ${
                  isActive('/editor')
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-blue-400'
                }`}
              >
                Editor
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Welcome User Message */}
            <div className="hidden sm:flex items-center space-x-2 text-gray-300">
              <User className="h-4 w-4 text-blue-400" />
              <span className="text-sm">
                Welcome, <span className="text-blue-400 font-medium">{user.name}</span>
              </span>
            </div>
            
            {/* Mobile welcome message - shorter version */}
            <div className="sm:hidden flex items-center space-x-1 text-gray-300">
              <User className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{user.name}</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="hidden md:flex p-2 text-gray-400 hover:text-gray-200 transition-colors duration-200 items-center space-x-2"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 text-gray-400 hover:text-gray-200 transition-colors duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/dashboard')
                    ? 'text-blue-400 bg-gray-800'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                My Snippets
              </Link>
              <Link
                to="/community"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/community')
                    ? 'text-blue-400 bg-gray-800'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                Community
              </Link>
              <Link
                to="/editor"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive('/editor')
                    ? 'text-blue-400 bg-gray-800'
                    : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                }`}
              >
                Editor
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-colors duration-200 flex items-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;