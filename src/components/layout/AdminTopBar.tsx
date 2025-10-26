import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Bell, Search, X, User, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../ui/Badge';
interface AdminTopBarProps {
  toggleSidebar: () => void;
}
export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  toggleSidebar
}) => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const notifications = [{
    id: 1,
    title: 'Nova ocorrência registrada',
    message: 'Morador do apt 302B reportou problema na academia',
    time: '10 min atrás',
    read: false
  }, {
    id: 2,
    title: 'Reserva confirmada',
    message: 'Reserva do Salão de Festas para 25/06 foi confirmada',
    time: '1 hora atrás',
    read: true
  }, {
    id: 3,
    title: 'Enquete finalizada',
    message: 'A enquete "Pintura da fachada" foi encerrada',
    time: '2 horas atrás',
    read: true
  }];
  const handleLogout = () => {
    setShowUserMenu(false);
    setShowLogoutConfirm(true);
  };
  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
    // Navigation to login page is handled by the AuthContext
  };
  return <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button className="p-2 rounded-md text-gray-600 md:hidden" onClick={toggleSidebar} aria-label="Open sidebar menu">
            <Menu size={24} />
          </button>
          <div className="md:flex items-center hidden md:ml-4">
            <div className="w-8 h-8 rounded-full bg-[#4A90E2] flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <h2 className="font-bold text-gray-800">Alfredo</h2>
          </div>
          <div className="relative ml-4 hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input type="search" className="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar..." />
          </div>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <button className="p-2 rounded-full text-gray-600 hover:bg-gray-100 relative" onClick={() => setShowNotifications(!showNotifications)} aria-label="Notifications">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            {showNotifications && <div className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-3 border-b flex justify-between items-center">
                  <h3 className="font-medium">Notificações</h3>
                  <button className="text-gray-400 hover:text-gray-600" onClick={() => setShowNotifications(false)}>
                    <X size={18} />
                  </button>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map(notification => <div key={notification.id} className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notification.read ? '' : 'bg-blue-50'}`}>
                      <div className="flex justify-between">
                        <h4 className="font-medium text-sm">
                          {notification.title}
                        </h4>
                        {!notification.read && <span className="w-2 h-2 bg-[#4A90E2] rounded-full"></span>}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {notification.time}
                      </p>
                    </div>)}
                </div>
                <div className="p-3 text-center border-t">
                  <button className="text-sm text-[#4A90E2] hover:underline" onClick={() => {
                setShowNotifications(false);
              }}>
                    Ver todas as notificações
                  </button>
                </div>
              </div>}
          </div>
          <div className="ml-3 relative">
            <button className="flex items-center space-x-2" onClick={() => setShowUserMenu(!showUserMenu)}>
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                    <span className="text-white font-medium">
                      {user?.name?.charAt(0)}
                    </span>
                  </div>}
              </div>
            </button>
            {showUserMenu && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="py-1">
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => {
                navigate('/admin/profile');
                setShowUserMenu(false);
              }}>
                    <User size={16} className="mr-2" />
                    Meu Perfil
                  </button>
                  <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center" onClick={() => {
                navigate('/admin/settings');
                setShowUserMenu(false);
              }}>
                    <Settings size={16} className="mr-2" />
                    Configurações
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center" onClick={handleLogout}>
                    <LogOut size={16} className="mr-2" />
                    Sair
                  </button>
                </div>
              </div>}
          </div>
        </div>
      </div>
      {/* Mobile search bar */}
      <div className="px-4 pb-3 md:hidden">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar..." />
        </div>
      </div>
      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Confirmar saída
            </h3>
            <p className="mb-6 text-gray-600">
              Tem certeza que deseja sair do painel administrativo?
            </p>
            <div className="flex justify-end space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none" onClick={() => setShowLogoutConfirm(false)}>
                Cancelar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none" onClick={confirmLogout}>
                Sair
              </button>
            </div>
          </div>
        </div>}
    </header>;
};