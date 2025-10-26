import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, ChevronRight, DollarSign, Calendar, AlertTriangle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
export const ResidentDashboard: React.FC = () => {
  const {
    user
  } = useAuth();
  const navigate = useNavigate();
  const announcements = [{
    id: 1,
    title: 'Manutenção na piscina',
    date: 'Hoje, 10:30',
    isNew: true
  }, {
    id: 2,
    title: 'Assembleia de condomínio',
    date: 'Ontem, 18:00',
    isNew: false
  }];
  const bookings = [{
    id: 1,
    area: 'Salão de Festas',
    date: '25/06/2023',
    time: '19:00 - 23:00'
  }];
  const bills = [{
    id: 1,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'pending'
  }, {
    id: 2,
    title: 'Taxa Extra - Reforma',
    amount: 150.0,
    dueDate: '20/06/2023',
    status: 'pending'
  }];
  return <div className="p-4 pb-24">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Olá, {user?.name?.split(' ')[0]}
          </h1>
          <p className="text-gray-500 mt-1">Apto {user?.apartment}</p>
        </div>
        <div className="relative">
          <Button variant="outline" className="w-10 h-10 rounded-full p-0 flex items-center justify-center">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
          </Button>
        </div>
      </div>
      {/* Stats Section */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 mb-1">Contas a Pagar</span>
              <span className="text-lg font-bold text-gray-900">R$ 600,00</span>
              <span className="text-xs text-gray-500 mt-1">Próximo: 15/06</span>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-none shadow-sm">
          <CardContent className="p-3">
            <div className="flex flex-col">
              <span className="text-xs text-gray-600 mb-1">Reservas</span>
              <span className="text-lg font-bold text-gray-900">1 Ativa</span>
              <span className="text-xs text-gray-500 mt-1">Próxima: 25/06</span>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Announcements Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Avisos recentes</h2>
          <button onClick={() => navigate('/resident/announcements')} className="text-[#4A90E2] flex items-center font-medium text-sm">
            Ver todos
            <ChevronRight size={16} className="ml-0.5" />
          </button>
        </div>
        <div className="space-y-3">
          {announcements.map(announcement => <Card key={announcement.id} className="border-l-4 border-l-[#4A90E2] hover:shadow-md transition-shadow" onClick={() => navigate(`/resident/announcements/${announcement.id}`)}>
              <CardContent className="p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{announcement.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {announcement.date}
                    </p>
                  </div>
                  {announcement.isNew && <Badge variant="info">Novo</Badge>}
                </div>
              </CardContent>
            </Card>)}
        </div>
      </section>
      {/* Bookings Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Suas reservas</h2>
          <button onClick={() => navigate('/resident/area-booking')} className="text-[#4A90E2] flex items-center font-medium text-sm">
            Ver todas
            <ChevronRight size={16} className="ml-0.5" />
          </button>
        </div>
        {bookings.length > 0 ? <div className="space-y-3">
            {bookings.map(booking => <Card key={booking.id} className="hover:shadow-md transition-shadow" onClick={() => navigate(`/resident/area-booking/${booking.id}`)}>
                <CardContent className="p-3 flex items-center">
                  <div className="bg-blue-100 p-2.5 rounded-lg mr-3">
                    <Calendar size={20} className="text-[#4A90E2]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{booking.area}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {booking.date} • {booking.time}
                    </p>
                  </div>
                </CardContent>
              </Card>)}
          </div> : <Card className="text-center py-6 bg-gray-50">
            <p className="text-gray-600 text-sm mb-3">
              Você não tem reservas agendadas
            </p>
            <Button onClick={() => navigate('/resident/area-booking')} variant="primary" size="sm">
              Fazer uma reserva
            </Button>
          </Card>}
      </section>
      {/* Bills Section */}
      <section className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-gray-800">Contas a pagar</h2>
          <button onClick={() => navigate('/resident/bills')} className="text-[#4A90E2] flex items-center font-medium text-sm">
            Ver todas
            <ChevronRight size={16} className="ml-0.5" />
          </button>
        </div>
        <div className="space-y-3">
          {bills.map(bill => <Card key={bill.id} className="hover:shadow-md transition-shadow" onClick={() => navigate(`/resident/bills/${bill.id}`)}>
              <CardContent className="p-3 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-yellow-100 p-2.5 rounded-lg mr-3">
                    <DollarSign size={20} className="text-[#F5D547]" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{bill.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Vence em {bill.dueDate}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {bill.amount.toFixed(2)}</p>
                  <Badge variant="warning" className="mt-1 text-xs">
                    Pendente
                  </Badge>
                </div>
              </CardContent>
            </Card>)}
        </div>
      </section>
      {/* Quick Actions */}
      <section>
        <h2 className="text-lg font-bold text-gray-800 mb-3">Ações rápidas</h2>
        <div className="grid grid-cols-3 gap-3">
          <Button variant="outline" className="flex flex-col h-20 py-2" onClick={() => navigate('/resident/area-booking')}>
            <Calendar size={18} className="mb-1 text-[#4A90E2]" />
            <span className="text-xs">Reservar</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 py-2" onClick={() => navigate('/resident/bills')}>
            <DollarSign size={18} className="mb-1 text-[#4A90E2]" />
            <span className="text-xs">Pagar</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 py-2" onClick={() => navigate('/resident/reports')}>
            <AlertTriangle size={18} className="mb-1 text-[#4A90E2]" />
            <span className="text-xs">Reportar</span>
          </Button>
        </div>
      </section>
    </div>;
};