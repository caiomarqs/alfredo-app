import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AlfredoLogo from '@/components/AlfredoLogo';
export const SplashScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    isLoading
  } = useAuth();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isAuthenticated) {
        navigate('/resident');
      } else {
        navigate('/login');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate, isAuthenticated, isLoading]);
  return <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 flex items-center justify-center mb-6 animate-pulse">
          <AlfredoLogo />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Alfredo</h1>
        <p className="text-gray-500">Gestão de Condomínios</p>
      </div>
    </div>;
};