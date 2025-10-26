import React from 'react';
import { ArrowLeft, User, Mail, Phone, Home, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '../../../components/ui/Button';
export const ProfileScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    user,
    logout
  } = useAuth();
  const menuItems = [{
    icon: Settings,
    label: 'Configurações',
    action: () => console.log('Settings')
  }, {
    icon: HelpCircle,
    label: 'Ajuda e Suporte',
    action: () => console.log('Help')
  }, {
    icon: LogOut,
    label: 'Sair',
    action: logout,
    danger: true
  }];
  return <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/resident')} className="mr-2">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Meu Perfil</h1>
      </div>
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-full bg-[#4A90E2] flex items-center justify-center mb-3">
          {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="w-full h-full rounded-full object-cover" /> : <span className="text-white text-3xl font-bold">
              {user?.name.charAt(0)}
            </span>}
        </div>
        <h2 className="text-xl font-bold">{user?.name}</h2>
        <p className="text-gray-500">Apto {user?.apartment}</p>
      </div>
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b">
          <h3 className="font-medium">Informações Pessoais</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center">
            <User size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Nome</p>
              <p>{user?.name}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Mail size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p>{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center">
            <Phone size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p>(11) 98765-4321</p>
            </div>
          </div>
          <div className="flex items-center">
            <Home size={20} className="text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-500">Apartamento</p>
              <p>{user?.apartment}</p>
            </div>
          </div>
        </div>
        <div className="p-4 border-t">
          <Button variant="outline" fullWidth>
            Editar Perfil
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow">
        {menuItems.map((item, index) => <button key={index} onClick={item.action} className={`w-full flex items-center p-4 ${index < menuItems.length - 1 ? 'border-b' : ''}`}>
            <item.icon size={20} className={item.danger ? 'text-red-500 mr-3' : 'text-gray-500 mr-3'} />
            <span className={item.danger ? 'text-red-500' : ''}>
              {item.label}
            </span>
          </button>)}
      </div>
    </div>;
};