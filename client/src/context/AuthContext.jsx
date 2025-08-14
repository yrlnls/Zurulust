import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, login as authLogin, logout as authLogout } from '../data/mockData';

const AuthContext = createContext({
  user: null,
  loading: true,
  login: async () => null,
  logout: () => {},
  error: null,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing user on mount (simulate checking auth token)
  useEffect(() => {
    const initAuth = () => {
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (err) {
        console.error('Auth initialization error:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, we'd call an API
      const user = authLogin(email, password);
      
      if (user) {
        setUser(user);
        return user;
      } else {
        setError('Invalid email or password');
        return null;
      }
    } catch (err) {
      setError('An error occurred during login');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};