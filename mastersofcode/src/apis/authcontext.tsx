import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

interface User {
  email: string;
  userId: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const initializeUser = () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const decoded: any = jwtDecode(token);
          setUser({ email: decoded.email, userId: decoded.sub });
        } catch (error) {
          console.error('Error decoding token:', error);
          setUser(null);
        }
      }
    };
    initializeUser();
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:3002/auth/login', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      const decoded: any = jwtDecode(token);
      setUser({ email: decoded.email, userId: decoded.sub });
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    }
  };

  const register = async (email: string, password: string) => {
    try {
      await axios.post('http://localhost:3002/auth/register', { email, password });
    } catch (error) {
      console.error('Error during registration:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};