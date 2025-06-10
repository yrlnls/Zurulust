import { useState, useEffect, createContext, useContext } from 'react';
import * as mockData from '../data/mockData';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        const user = mockData.mockUsers.find(user => user.email === email);
        if (user) {
          setCurrentUser(user);
          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          setError('Invalid credentials');
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = async (name, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      setTimeout(() => {
        const existingUser = mockData.mockUsers.find(user => user.email === email);
        if (existingUser) {
          setError('Email already in use');
        } else {
          const newUser = {
            id: `user-${Date.now()}`,
            name,
            email,
            preferences: {
              budget: 'moderate',
              interests: [],
              travelStyle: []
            }
          };
          mockData.mockUsers.push(newUser);
          setCurrentUser(newUser);
          localStorage.setItem('currentUser', JSON.stringify(newUser));
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('An error occurred during registration');
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, error, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};