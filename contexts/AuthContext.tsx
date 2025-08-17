
'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { apiService } from '../lib/api';

interface User {
  id: number;
  email: string;
  user_type: 'PERSON' | 'CLUB';
  person?: {
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    image_url?: string;
  };
  club?: {
    id: number;
    name: string;
    description: string;
    image_url?: string;
  };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string, userType: 'PERSON' | 'CLUB') => Promise<boolean>;
  logout: () => void;
  registerPerson: (userData: any, personData: any) => Promise<boolean>;
  registerClub: (userData: any, clubData: any) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await apiService.getCurrentUser();
        if (response.data) {
          setUser(response.data);
        } else {
          // Invalid token, clear it
          localStorage.removeItem('authToken');
          apiService.clearToken();
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('authToken');
      apiService.clearToken();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string, userType: 'PERSON' | 'CLUB'): Promise<boolean> => {
    try {
      const response = await apiService.login(email, password, userType);
      if (response.access_token) {
        await checkAuth(); // This will set the user
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    apiService.clearToken();
  };

  const registerPerson = async (userData: any, personData: any): Promise<boolean> => {
    try {
      const response = await apiService.registerPerson(userData, personData);
      return !!response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const registerClub = async (userData: any, clubData: any): Promise<boolean> => {
    try {
      const response = await apiService.registerClub(userData, clubData);
      return !!response.data;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    login,
    logout,
    registerPerson,
    registerClub,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};