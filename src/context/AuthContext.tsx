import React, { useEffect, useState, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
interface User {
  id: string;
  name: string;
  email: string;
  apartment?: string;
  profileImage?: string;
  role: 'resident' | 'admin';
  isOnline?: boolean;
  lastActive?: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (cpf: string, password: string) => Promise<void>;
  adminLogin: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType>({} as AuthContextType);
export const useAuth = () => useContext(AuthContext);
export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('alfredo_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);
  const login = async (cpf: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      // In a real app, this would be a fetch to your authentication endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock user data
      const userData: User = {
        id: '1',
        name: 'João Silva',
        email: 'joao.silva@example.com',
        apartment: '302A',
        profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
        role: 'resident',
        isOnline: true,
        lastActive: new Date().toISOString()
      };
      setUser(userData);
      localStorage.setItem('alfredo_user', JSON.stringify(userData));
      navigate('/resident');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const adminLogin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      // Mock admin user data
      const adminData: User = {
        id: 'admin1',
        name: 'Admin Silva',
        email: 'admin@alfredo.com',
        profileImage: 'https://randomuser.me/api/portraits/men/41.jpg',
        role: 'admin',
        isOnline: true,
        lastActive: new Date().toISOString()
      };
      setUser(adminData);
      localStorage.setItem('alfredo_user', JSON.stringify(adminData));
      navigate('/admin');
    } catch (error) {
      console.error('Admin login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem('alfredo_user');
    navigate(user?.role === 'admin' ? '/admin/login' : '/login');
  };
  return <AuthContext.Provider value={{
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    adminLogin,
    logout
  }}>
      {children}
    </AuthContext.Provider>;
};