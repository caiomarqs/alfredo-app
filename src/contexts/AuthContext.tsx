import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, AuthCredentials } from '../@types';
import { authService } from '../api';
import { LOCAL_STORAGE_KEYS, ROUTES } from '../constants';

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  adminLogin: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  // Check if user is already logged in on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedUser = localStorage.getItem(LOCAL_STORAGE_KEYS.USER);
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);

        if (storedUser && storedToken) {
          // Validate token
          const isValid = await authService.validateToken(storedToken);
          
          if (isValid) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token invalid, clear storage
            localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
            localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
          }
        }
      } catch (error) {
        console.error('Failed to initialize auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      setUser(response.user);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(response.user));
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
      
      navigate(ROUTES.RESIDENT_DASHBOARD);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const adminLogin = useCallback(async (credentials: AuthCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.adminLogin(credentials);
      
      setUser(response.user);
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(response.user));
      localStorage.setItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN, response.token);
      
      navigate(ROUTES.ADMIN_DASHBOARD);
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.USER);
      localStorage.removeItem(LOCAL_STORAGE_KEYS.AUTH_TOKEN);
      
      navigate(user?.role === 'admin' ? ROUTES.ADMIN_LOGIN : ROUTES.LOGIN);
    }
  }, [user, navigate]);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => {
      if (!prev) return null;
      const updated = { ...prev, ...userData };
      localStorage.setItem(LOCAL_STORAGE_KEYS.USER, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    adminLogin,
    logout,
    updateUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
