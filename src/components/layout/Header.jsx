import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../ui/Button';
import { Menu, X, User, LogOut, Map, PlaneLanding, CreditCard, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative z-10">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <PlaneLanding className="h-8 w-8 text-teal-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Wanderlust</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:space-x-6">
              <nav className="flex space-x-8">
                <Link to="/explore" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Explore
                </Link>
                <Link to="/trips" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  My Trips
                </Link>
                <Link to="/favorites" className="text-gray-700 hover:text-teal-600 px-3 py-2 text-sm font-medium transition-colors duration-200">
                  Favorites
                </Link>
              </nav>

              {currentUser ? (
                <div className="flex items-center space-x-4">
                  <div className="relative group">
                    <button className="flex items-center text-sm font-medium text-gray-700 rounded-full hover:text-teal-600 focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      {currentUser.avatar ? (
                        <img
                          className="h-8 w-8 rounded-full object-cover"
                          src={currentUser.avatar}
                          alt={currentUser.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-teal-600" />
                        </div>
                      )}
                      <span className="ml-2">{currentUser.name}</span>
                    </button>
                    <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link to="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <User className="mr-2 h-4 w-4" />
                        Profile
                      </Link>
                      <Link to="/trips" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <Map className="mr-2 h-4 w-4" />
                        My Trips
                      </Link>
                      <button
                        onClick={logout}
                        className="flex w-full text-left items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>Sign up</Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-teal-600 hover:bg-gray-100 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={toggleMenu}
              >
                <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
                {isMenuOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg absolute w-full">
          <Link to="/explore" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50">
            Explore
          </Link>
          <Link to="/trips" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50">
            My Trips
          </Link>
          <Link to="/favorites" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50">
            Favorites
          </Link>

          {currentUser ? (
            <>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="px-3 py-2">
                <div className="flex items-center">
                  {currentUser.avatar ? (
                    <img
                      className="h-10 w-10 rounded-full object-cover"
                      src={currentUser.avatar}
                      alt={currentUser.name}
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-teal-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-teal-600" />
                    </div>
                  )}
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">{currentUser.name}</div>
                    <div className="text-sm font-medium text-gray-500">{currentUser.email}</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1">
                  <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50">
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-teal-600 hover:bg-gray-50"
                  >
                    Sign out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="mt-4 px-3 space-y-2">
              <Link to="/login">
                <Button variant="outline" fullWidth>Log in</Button>
              </Link>
              <Link to="/signup">
                <Button fullWidth>Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;