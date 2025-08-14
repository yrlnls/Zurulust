import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, ClipboardCheck, 
  DollarSign, Settings, Menu, X, LogOut, Bell
} from 'lucide-react';
import Avatar from './Avatar';

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    {
      name: 'Dashboard',
      path: '/',
      icon: <LayoutDashboard size={20} />,
      allowedRoles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      name: 'Employees',
      path: '/employees',
      icon: <Users size={20} />,
      allowedRoles: ['admin', 'hr', 'manager'],
    },
    {
      name: 'Attendance',
      path: '/attendance',
      icon: <ClipboardCheck size={20} />,
      allowedRoles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      name: 'Leave',
      path: '/leave',
      icon: <Calendar size={20} />,
      allowedRoles: ['admin', 'hr', 'manager', 'employee'],
    },
    {
      name: 'Payroll',
      path: '/payroll',
      icon: <DollarSign size={20} />,
      allowedRoles: ['admin', 'hr', 'employee'],
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={20} />,
      allowedRoles: ['admin', 'hr'],
    },
  ];

  const filteredLinks = links.filter((link) => 
    user && link.allowedRoles.includes(user.role)
  );

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200">
        <div className="flex items-center">
          <button 
            onClick={toggleMobileMenu}
            className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="ml-3 flex items-center">
            <span className="text-indigo-600 font-bold text-xl">Emplora</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 rounded-md hover:bg-gray-100">
            <Bell size={20} />
          </button>
          {user?.avatar ? (
            <Avatar src={user.avatar} size="sm" />
          ) : (
            <Avatar initials={user?.name.substring(0, 2) || 'U'} size="sm" />
          )}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
      >
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={closeMobileMenu}></div>
        <div className="fixed inset-y-0 left-0 flex flex-col z-40 w-64 bg-white">
          <div className="h-16 px-6 flex items-center justify-between border-b border-gray-200">
            <span className="text-indigo-600 font-bold text-xl">Emplora</span>
            <button 
              onClick={closeMobileMenu}
              className="p-2 text-gray-500 rounded-md hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <nav className="px-3 py-4">
              {filteredLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center px-3 py-2 my-1 text-sm font-medium rounded-md
                    ${location.pathname === link.path
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-700 hover:bg-gray-100'}
                  `}
                  onClick={closeMobileMenu}
                >
                  <span className="mr-3">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>
          {user && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                {user.avatar ? (
                  <Avatar src={user.avatar} size="sm" />
                ) : (
                  <Avatar initials={user.name.substring(0, 2)} size="sm" />
                )}
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="mt-4 flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
              >
                <LogOut size={18} className="mr-2" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:fixed lg:inset-y-0 lg:z-50 lg:w-64 lg:border-r lg:border-gray-200 lg:bg-white">
        <div className="h-16 px-6 flex items-center border-b border-gray-200">
          <span className="text-indigo-600 font-bold text-xl">Emplora</span>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="px-3 py-4">
            {filteredLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`
                  flex items-center px-3 py-2 my-1 text-sm font-medium rounded-md
                  transition-colors duration-150 ease-in-out
                  ${location.pathname === link.path
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-100'}
                `}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        {user && (
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center">
              {user.avatar ? (
                <Avatar src={user.avatar} size="sm" />
              ) : (
                <Avatar initials={user.name.substring(0, 2)} size="sm" />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">{user.name}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="mt-4 flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100"
            >
              <LogOut size={18} className="mr-2" />
              Sign out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;