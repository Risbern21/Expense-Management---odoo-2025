import { createContext, useContext, useState } from 'react';
import { mockUsers, mockCompany } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, role) => {
    // Find user in mock data
    const foundUser = mockUsers.find(u => u.email === email && u.role === role);
    
    if (foundUser) {
      const userData = {
        ...foundUser,
        company_name: mockCompany.name,
        currency: mockCompany.currency
      };
      setUser(userData);
      setIsAuthenticated(true);
      return { success: true, user: userData };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
