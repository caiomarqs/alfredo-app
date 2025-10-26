import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Calendar, Edit, Camera, Save, LogOut, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
export const AdminProfileScreen: React.FC = () => {
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '(11) 98765-4321',
    position: 'Administrador',
    joinDate: '01/01/2023',
    lastLogin: new Date().toLocaleDateString('pt-BR')
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      name,
      value
    } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSave = () => {
    // In a real app, this would update the user profile
    // through an API call or similar mechanism
    console.log('Saving profile data:', profileData);
    setIsEditing(false);
  };
  const confirmLogout = () => {
    logout();
    // Navigation to login page is handled by the AuthContext
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
          <p className="text-gray-500 mt-1">
            Gerencie suas informações pessoais
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {isEditing ? <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancelar
              </Button>
              <Button leftIcon={<Save size={16} />} onClick={handleSave}>
                Salvar Alterações
              </Button>
            </> : <>
              <Button variant="outline" leftIcon={<Edit size={16} />} onClick={() => setIsEditing(true)}>
                Editar Perfil
              </Button>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" leftIcon={<LogOut size={16} />} onClick={() => setShowLogoutConfirm(true)}>
                Sair
              </Button>
            </>}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden">
                    {user?.profileImage ? <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                        <span className="text-white font-medium text-4xl">
                          {user?.name?.charAt(0)}
                        </span>
                      </div>}
                  </div>
                  {isEditing && <button className="absolute bottom-0 right-0 bg-[#4A90E2] text-white p-2 rounded-full shadow-md">
                      <Camera size={18} />
                    </button>}
                </div>
                <h2 className="text-xl font-bold text-center">{user?.name}</h2>
                <p className="text-gray-500 text-center">
                  {profileData.position}
                </p>
                <div className="mt-4 w-full">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-3">
                    <div className="flex items-center">
                      <Shield size={18} className="text-[#4A90E2] mr-2" />
                      <span className="text-sm font-medium">
                        Nível de Acesso
                      </span>
                    </div>
                    <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Administrador
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <Calendar size={18} className="text-gray-500 mr-2" />
                      <span className="text-sm font-medium">Membro desde</span>
                    </div>
                    <span className="text-sm">{profileData.joinDate}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2">
          <Card>
            <CardHeader title="Informações Pessoais" />
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo
                  </label>
                  {isEditing ? <Input name="name" value={profileData.name} onChange={handleChange} placeholder="Seu nome completo" leftIcon={<User size={18} className="text-gray-400" />} /> : <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <User size={18} className="text-gray-400 mr-3" />
                      <span>{profileData.name}</span>
                    </div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  {isEditing ? <Input name="email" type="email" value={profileData.email} onChange={handleChange} placeholder="seu.email@exemplo.com" leftIcon={<Mail size={18} className="text-gray-400" />} /> : <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Mail size={18} className="text-gray-400 mr-3" />
                      <span>{profileData.email}</span>
                    </div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone
                  </label>
                  {isEditing ? <Input name="phone" value={profileData.phone} onChange={handleChange} placeholder="(00) 00000-0000" leftIcon={<Phone size={18} className="text-gray-400" />} /> : <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Phone size={18} className="text-gray-400 mr-3" />
                      <span>{profileData.phone}</span>
                    </div>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo
                  </label>
                  {isEditing ? <Input name="position" value={profileData.position} onChange={handleChange} placeholder="Seu cargo" leftIcon={<Shield size={18} className="text-gray-400" />} /> : <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <Shield size={18} className="text-gray-400 mr-3" />
                      <span>{profileData.position}</span>
                    </div>}
                </div>
                {isEditing && <div className="pt-4 mt-4 border-t">
                    <h3 className="font-medium text-gray-900 mb-3">
                      Alterar Senha
                    </h3>
                    <div className="space-y-4">
                      <Input type="password" placeholder="Senha atual" className="w-full" />
                      <Input type="password" placeholder="Nova senha" className="w-full" />
                      <Input type="password" placeholder="Confirmar nova senha" className="w-full" />
                    </div>
                  </div>}
              </div>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader title="Atividades Recentes" />
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="min-w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <User size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Login realizado</p>
                    <p className="text-sm text-gray-500">Hoje às 08:45</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="min-w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <Edit size={20} className="text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Perfil atualizado</p>
                    <p className="text-sm text-gray-500">15/06/2023 às 14:30</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="min-w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                    <Shield size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Permissões alteradas</p>
                    <p className="text-sm text-gray-500">10/06/2023 às 11:15</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">
                Confirmar saída
              </h3>
            </div>
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
    </div>;
};