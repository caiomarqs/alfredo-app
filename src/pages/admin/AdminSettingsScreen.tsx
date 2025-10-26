import React, { useState } from 'react';
import { Settings, Bell, Moon, Shield, Users, Building, LogOut, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useAuth } from '../../context/AuthContext';
export const AdminSettingsScreen: React.FC = () => {
  const {
    logout
  } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      newResident: true,
      paymentAlert: true,
      maintenanceRequest: true
    },
    appearance: {
      darkMode: false,
      compactView: false
    },
    privacy: {
      showActivityStatus: true,
      twoFactorAuth: false
    }
  });
  const handleToggle = (category: string, setting: string) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: !prev[category][setting]
      }
    }));
  };
  const confirmLogout = () => {
    logout();
  };
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Configurações</h1>
          <p className="text-gray-500 mt-1">
            Personalize as configurações do sistema
          </p>
        </div>
        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" leftIcon={<LogOut size={16} />} onClick={() => setShowLogoutConfirm(true)}>
          Sair
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h3 className="font-medium">Categorias</h3>
            </div>
            <div className="p-2">
              <button className="flex items-center w-full p-3 text-left rounded-md bg-blue-50 text-[#4A90E2]">
                <Settings size={18} className="mr-3" />
                <span>Geral</span>
              </button>
              <button className="flex items-center w-full p-3 text-left rounded-md text-gray-700 hover:bg-gray-50">
                <Bell size={18} className="mr-3" />
                <span>Notificações</span>
              </button>
              <button className="flex items-center w-full p-3 text-left rounded-md text-gray-700 hover:bg-gray-50">
                <Shield size={18} className="mr-3" />
                <span>Privacidade e Segurança</span>
              </button>
              <button className="flex items-center w-full p-3 text-left rounded-md text-gray-700 hover:bg-gray-50">
                <Users size={18} className="mr-3" />
                <span>Usuários e Permissões</span>
              </button>
              <button className="flex items-center w-full p-3 text-left rounded-md text-gray-700 hover:bg-gray-50">
                <Building size={18} className="mr-3" />
                <span>Configurações do Condomínio</span>
              </button>
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader title="Notificações" />
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações por Email</p>
                    <p className="text-sm text-gray-500">
                      Receba notificações do sistema por email
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.notifications.email} onChange={() => handleToggle('notifications', 'email')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notificações Push</p>
                    <p className="text-sm text-gray-500">
                      Receba notificações em tempo real no navegador
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.notifications.push} onChange={() => handleToggle('notifications', 'push')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                  </label>
                </div>
                <div className="pt-4 border-t">
                  <p className="font-medium mb-3">Alertas específicos</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Novo morador cadastrado</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.notifications.newResident} onChange={() => handleToggle('notifications', 'newResident')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Alertas de pagamento</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.notifications.paymentAlert} onChange={() => handleToggle('notifications', 'paymentAlert')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Solicitações de manutenção</p>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={settings.notifications.maintenanceRequest} onChange={() => handleToggle('notifications', 'maintenanceRequest')} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Aparência" />
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Moon size={20} className="text-gray-500 mr-3" />
                    <div>
                      <p className="font-medium">Modo Escuro</p>
                      <p className="text-sm text-gray-500">
                        Ative o tema escuro para o painel
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.appearance.darkMode} onChange={() => handleToggle('appearance', 'darkMode')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Visualização Compacta</p>
                    <p className="text-sm text-gray-500">
                      Exibir mais informações em menos espaço
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.appearance.compactView} onChange={() => handleToggle('appearance', 'compactView')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Privacidade e Segurança" />
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Mostrar Status de Atividade</p>
                    <p className="text-sm text-gray-500">
                      Permitir que outros administradores vejam quando você está
                      online
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.privacy.showActivityStatus} onChange={() => handleToggle('privacy', 'showActivityStatus')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Autenticação de Dois Fatores</p>
                    <p className="text-sm text-gray-500">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={settings.privacy.twoFactorAuth} onChange={() => handleToggle('privacy', 'twoFactorAuth')} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A90E2]"></div>
                  </label>
                </div>
                <div className="pt-4 border-t">
                  <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50 mt-2">
                    Alterar Senha
                  </Button>
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