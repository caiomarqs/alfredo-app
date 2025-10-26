import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, AlertTriangle, Calendar, DollarSign, Megaphone, BarChart2, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const stats = [{
    title: 'Moradores',
    value: '124',
    icon: Users,
    color: 'bg-blue-100 text-blue-600',
    link: '/admin/residents'
  }, {
    title: 'Ocorrências',
    value: '8',
    icon: AlertTriangle,
    color: 'bg-red-100 text-red-600',
    link: '/admin/reports',
    badge: '3 novas'
  }, {
    title: 'Reservas',
    value: '12',
    icon: Calendar,
    color: 'bg-green-100 text-green-600',
    link: '/admin/bookings'
  }, {
    title: 'Pagamentos',
    value: 'R$ 45.000',
    icon: DollarSign,
    color: 'bg-yellow-100 text-yellow-600',
    link: '/admin/bills',
    badge: '92% pago'
  }];
  const recentReports = [{
    id: 1,
    title: 'Vazamento no corredor',
    apartment: '302B',
    resident: 'Carlos Oliveira',
    date: 'Hoje, 10:30',
    status: 'pending',
    category: 'Maintenance'
  }, {
    id: 2,
    title: 'Barulho excessivo',
    apartment: '101A',
    resident: 'Anônimo',
    date: 'Ontem, 22:15',
    status: 'in_progress',
    category: 'Noise Complaint'
  }, {
    id: 3,
    title: 'Limpeza da piscina',
    apartment: '205C',
    resident: 'Maria Santos',
    date: '15/06/2023, 08:45',
    status: 'resolved',
    category: 'Cleaning'
  }];
  const upcomingBookings = [{
    id: 1,
    area: 'Salão de Festas',
    resident: 'João Silva',
    apartment: '302A',
    date: '25/06/2023',
    time: '19:00 - 23:00'
  }, {
    id: 2,
    area: 'Churrasqueira',
    resident: 'Ana Costa',
    apartment: '104B',
    date: '26/06/2023',
    time: '12:00 - 16:00'
  }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>;
      case 'in_progress':
        return <Badge variant="info">Em andamento</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolvido</Badge>;
      default:
        return null;
    }
  };
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Maintenance':
        return <Badge variant="warning">Manutenção</Badge>;
      case 'Noise Complaint':
        return <Badge variant="danger">Barulho</Badge>;
      case 'Cleaning':
        return <Badge variant="info">Limpeza</Badge>;
      case 'Security':
        return <Badge variant="default">Segurança</Badge>;
      default:
        return <Badge variant="default">Outros</Badge>;
    }
  };
  return <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100">
          {new Date().toLocaleDateString('pt-BR', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => <Card key={index} className="cursor-pointer hover:shadow-lg transition-all duration-200 border-none" onClick={() => navigate(stat.link)}>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div className={`p-4 rounded-lg ${stat.color}`}>
                  <stat.icon size={26} />
                </div>
                {stat.badge && <Badge variant="info">{stat.badge}</Badge>}
              </div>
              <h3 className="mt-5 text-3xl font-bold">{stat.value}</h3>
              <p className="text-gray-500 mt-1 font-medium">{stat.title}</p>
            </div>
          </Card>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reports */}
        <Card className="border-none shadow-md">
          <CardHeader title="Ocorrências Recentes" action={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/reports')}>
                Ver todas
              </Button>} />
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {recentReports.map(report => <div key={report.id} className="p-5 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate(`/admin/reports/${report.id}`)}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-lg">
                          {report.title}
                        </h4>
                        {getCategoryBadge(report.category)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Apto {report.apartment} • {report.resident}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(report.status)}
                      <span className="text-xs text-gray-500 mt-1.5">
                        {report.date}
                      </span>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
        {/* Upcoming Bookings */}
        <Card className="border-none shadow-md">
          <CardHeader title="Próximas Reservas" action={<Button variant="ghost" size="sm" onClick={() => navigate('/admin/bookings')}>
                Ver todas
              </Button>} />
          <CardContent className="p-0">
            <div className="divide-y divide-gray-100">
              {upcomingBookings.map(booking => <div key={booking.id} className="p-5 hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => navigate(`/admin/bookings/${booking.id}`)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-lg">{booking.area}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.resident} • Apto {booking.apartment}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.date}</p>
                      <p className="text-xs text-gray-500">{booking.time}</p>
                    </div>
                  </div>
                </div>)}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Quick Actions */}
      <Card className="border-none shadow-md">
        <CardHeader title="Ações Rápidas" />
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <Button variant="outline" className="flex justify-between items-center py-4 px-5" onClick={() => navigate('/admin/announcements/new')}>
              <div className="flex items-center">
                <Megaphone size={20} className="mr-3 text-[#4A90E2]" />
                <span className="font-medium">Novo Aviso</span>
              </div>
              <ChevronRight size={18} />
            </Button>
            <Button variant="outline" className="flex justify-between items-center py-4 px-5" onClick={() => navigate('/admin/polls/new')}>
              <div className="flex items-center">
                <BarChart2 size={20} className="mr-3 text-[#4A90E2]" />
                <span className="font-medium">Nova Enquete</span>
              </div>
              <ChevronRight size={18} />
            </Button>
            <Button variant="outline" className="flex justify-between items-center py-4 px-5" onClick={() => navigate('/admin/areas/new')}>
              <div className="flex items-center">
                <Calendar size={20} className="mr-3 text-[#4A90E2]" />
                <span className="font-medium">Nova Área</span>
              </div>
              <ChevronRight size={18} />
            </Button>
            <Button variant="outline" className="flex justify-between items-center py-4 px-5" onClick={() => navigate('/admin/residents/new')}>
              <div className="flex items-center">
                <Users size={20} className="mr-3 text-[#4A90E2]" />
                <span className="font-medium">Novo Morador</span>
              </div>
              <ChevronRight size={18} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};