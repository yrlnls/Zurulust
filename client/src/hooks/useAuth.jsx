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
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error parsing stored user:', err);
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockData.mockUsers.find(user => user.email === email);
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        setIsLoading(false);
        return user;
      } else {
        setError('Invalid email or password');
        setIsLoading(false);
        return null;
      }
    } catch (err) {
      setError('An error occurred during login');
      setIsLoading(false);
      return null;
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingUser = mockData.mockUsers.find(user => user.email === email);
      if (existingUser) {
        setError('Email already in use');
        setIsLoading(false);
        return null;
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
        
        // Add to mock data
        mockData.mockUsers.push(newUser);
        
        setCurrentUser(newUser);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        setIsLoading(false);
        return newUser;
      }
    } catch (err) {
      setError('An error occurred during registration');
      setIsLoading(false);
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      isLoading, 
      error, 
      login, 
      logout, 
      register 
    }}>
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