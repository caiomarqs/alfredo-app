import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Megaphone, Calendar, DollarSign, Settings, ChevronRight, ChevronDown, X, LogOut, BoxIcon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  subItems?: {
    to: string;
    label: string;
  }[];
  onClose?: () => void;
}
const NavItem: React.FC<NavItemProps> = ({
  to,
  icon: Icon,
  label,
  subItems,
  onClose
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleClick = () => {
    if (onClose && !subItems) {
      onClose();
    }
  };
  if (subItems) {
    return <div className="mb-1">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center w-full p-3 text-gray-600 hover:bg-blue-50 hover:text-[#4A90E2] rounded-lg transition-colors">
          <Icon size={20} className="mr-3" />
          <span className="flex-1 text-left">{label}</span>
          {isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
        {isOpen && <div className="ml-8 mt-1 space-y-1">
            {subItems.map((subItem, index) => <NavLink key={index} to={subItem.to} className={({
          isActive
        }) => `block p-2 text-sm rounded-md ${isActive ? 'bg-blue-50 text-[#4A90E2] font-medium' : 'text-gray-600 hover:bg-blue-50 hover:text-[#4A90E2]'}`} onClick={onClose}>
                {subItem.label}
              </NavLink>)}
          </div>}
      </div>;
  }
  return <NavLink to={to} className={({
    isActive
  }) => `flex items-center p-3 mb-1 rounded-lg ${isActive ? 'bg-blue-50 text-[#4A90E2] font-medium' : 'text-gray-600 hover:bg-blue-50 hover:text-[#4A90E2]'}`} onClick={handleClick}>
      <Icon size={20} className="mr-3" />
      <span>{label}</span>
    </NavLink>;
};
interface AdminSidebarProps {
  onClose?: () => void;
}
export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  onClose
}) => {
  const {
    user,
    logout
  } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navItems = [{
    to: '/admin',
    icon: Home,
    label: 'Dashboard'
  }, {
    to: '/admin/residents',
    icon: Users,
    label: 'Moradores'
  }, {
    to: '/admin/announcements',
    icon: Megaphone,
    label: 'Comunicação',
    subItems: [{
      to: '/admin/announcements',
      label: 'Avisos'
    }, {
      to: '/admin/reports',
      label: 'Ocorrências'
    }, {
      to: '/admin/polls',
      label: 'Enquetes'
    }]
  }, {
    to: '/admin/areas',
    icon: Calendar,
    label: 'Áreas Comuns',
    subItems: [{
      to: '/admin/areas',
      label: 'Gerenciar Áreas'
    }, {
      to: '/admin/bookings',
      label: 'Reservas'
    }]
  }, {
    to: '/admin/bills',
    icon: DollarSign,
    label: 'Financeiro',
    subItems: [{
      to: '/admin/bills',
      label: 'Cobranças'
    }, {
      to: '/admin/payments',
      label: 'Acompanhamento'
    }]
  }, {
    to: '/admin/work-orders',
    icon: BoxIcon,
    label: 'Manutenção'
  }, {
    to: '/admin/settings',
    icon: Settings,
    label: 'Configurações'
  }];
  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };
  const confirmLogout = () => {
    logout();
    setShowLogoutConfirm(false);
  };
  return <aside className="w-72 bg-white border-r border-gray-200 h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#4A90E2] flex items-center justify-center mr-3">
            <span className="text-white font-bold">A</span>
          </div>
          <div>
            <h2 className="font-bold text-gray-800">Alfredo</h2>
            <p className="text-xs text-gray-500">Painel Administrativo</p>
          </div>
        </div>
        {onClose && <button onClick={onClose} className="p-2 rounded-md text-gray-500 hover:bg-gray-100 md:hidden">
            <X size={20} />
          </button>}
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        <nav className="space-y-1">
          {navItems.map((item, index) => <NavItem key={index} to={item.to} icon={item.icon} label={item.label} subItems={item.subItems} onClose={onClose} />)}
        </nav>
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
              {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                  <span className="text-white font-medium">
                    {user?.name?.charAt(0)}
                  </span>
                </div>}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
          </div>
          <button className="p-1.5 rounded-md text-gray-500 hover:bg-gray-100" onClick={handleLogout}>
            <LogOut size={18} />
          </button>
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
    </aside>;
};