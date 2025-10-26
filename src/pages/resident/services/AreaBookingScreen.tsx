import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Plus, Star, Users, DollarSign, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
interface Area {
  id: number;
  name: string;
  image: string;
  availableToday: boolean;
  capacity: number;
  rating: number;
  price: number;
  amenities: string[];
  availabilityColor?: string;
}
interface Booking {
  id: number;
  area: string;
  date: string;
  time: string;
  status: 'confirmed' | 'pending' | 'completed';
  guestCount?: number;
  additionalServices?: string[];
}
export const AreaBookingScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'areas' | 'bookings'>('areas');
  const [activeDate, setActiveDate] = useState(new Date());
  const [filterAreaType, setFilterAreaType] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  // Generate dates for the calendar
  const dates = Array.from({
    length: 7
  }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });
  const areas: Area[] = [{
    id: 1,
    name: 'Salão de Festas',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80',
    availableToday: true,
    capacity: 50,
    rating: 4.5,
    price: 200,
    amenities: ['Som', 'Cozinha', 'Ar condicionado', 'Churrasqueira'],
    availabilityColor: 'green'
  }, {
    id: 2,
    name: 'Churrasqueira',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    availableToday: true,
    capacity: 20,
    rating: 4.2,
    price: 100,
    amenities: ['Grelha', 'Pia', 'Geladeira', 'Mesas'],
    availabilityColor: 'green'
  }, {
    id: 3,
    name: 'Espaço Gourmet',
    image: 'https://images.unsplash.com/photo-1556912167-f556f1f39fdf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    availableToday: false,
    capacity: 15,
    rating: 4.8,
    price: 150,
    amenities: ['Fogão', 'Forno', 'Geladeira', 'Utensílios'],
    availabilityColor: 'red'
  }, {
    id: 4,
    name: 'Quadra Poliesportiva',
    image: 'https://images.unsplash.com/photo-1626248801379-51a0748a5f96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    availableToday: true,
    capacity: 12,
    rating: 4.0,
    price: 50,
    amenities: ['Iluminação', 'Redes', 'Vestiário'],
    availabilityColor: 'yellow'
  }, {
    id: 5,
    name: 'Piscina',
    image: 'https://images.unsplash.com/photo-1576013551627-0ae7d1d6f79e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    availableToday: false,
    capacity: 30,
    rating: 4.7,
    price: 0,
    amenities: ['Espreguiçadeiras', 'Chuveiros', 'Banheiros'],
    availabilityColor: 'blue'
  }];
  const bookings: Booking[] = [{
    id: 1,
    area: 'Salão de Festas',
    date: '25/06/2023',
    time: '19:00 - 23:00',
    status: 'confirmed',
    guestCount: 25,
    additionalServices: ['Limpeza', 'Segurança']
  }, {
    id: 2,
    area: 'Churrasqueira',
    date: '10/07/2023',
    time: '12:00 - 16:00',
    status: 'pending',
    guestCount: 10
  }];
  const statusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <Badge variant="success">Confirmada</Badge>;
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>;
      case 'completed':
        return <Badge variant="default">Concluída</Badge>;
      default:
        return null;
    }
  };
  const getAvailabilityIndicator = (color: string) => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-700';
    let label = 'Indisponível';
    switch (color) {
      case 'green':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
        label = 'Disponível';
        break;
      case 'red':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        label = 'Reservado';
        break;
      case 'yellow':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-700';
        label = 'Em manutenção';
        break;
      case 'blue':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-700';
        label = 'Evento';
        break;
    }
    return <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 ${bgColor} ${textColor} text-xs font-medium`}>
        <div className={`w-2 h-2 rounded-full mr-1 bg-${color}-500`}></div>
        {label}
      </div>;
  };
  const formatDay = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short'
    }).charAt(0).toUpperCase();
  };
  const formatDate = (date: Date) => {
    return date.getDate().toString().padStart(2, '0');
  };
  const isActiveDate = (date: Date) => {
    return date.toDateString() === activeDate.toDateString();
  };
  const filteredAreas = filterAreaType ? areas.filter(area => area.name.toLowerCase().includes(filterAreaType.toLowerCase())) : areas;
  return <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate('/resident')} className="mr-2">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Áreas Comuns</h1>
        </div>
        {activeTab === 'areas' && <Button variant="outline" leftIcon={<Filter size={16} />} onClick={() => setShowFilters(!showFilters)}>
            Filtrar
          </Button>}
      </div>
      <div className="flex mb-4 border-b">
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'areas' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('areas')}>
          Áreas Disponíveis
        </button>
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'bookings' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('bookings')}>
          Minhas Reservas
        </button>
      </div>
      {activeTab === 'areas' ? <>
          {/* Calendar view */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-700 mb-3">
              Selecione uma data
            </h2>
            <div className="flex overflow-x-auto space-x-2 pb-2">
              {dates.map((date, index) => <button key={index} className={`flex flex-col items-center justify-center w-12 h-16 rounded-lg ${isActiveDate(date) ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveDate(date)}>
                  <span className="text-xs">{formatDay(date)}</span>
                  <span className="text-lg font-medium">
                    {formatDate(date)}
                  </span>
                </button>)}
            </div>
          </div>
          {/* Filter options */}
          {showFilters && <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Filtrar por tipo
              </h3>
              <div className="flex overflow-x-auto space-x-2 pb-2">
                <button className={`px-3 py-1 rounded-full text-sm ${filterAreaType === null ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilterAreaType(null)}>
                  Todos
                </button>
                <button className={`px-3 py-1 rounded-full text-sm ${filterAreaType === 'salão' ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilterAreaType('salão')}>
                  Salão de Festas
                </button>
                <button className={`px-3 py-1 rounded-full text-sm ${filterAreaType === 'churrasqueira' ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilterAreaType('churrasqueira')}>
                  Churrasqueira
                </button>
                <button className={`px-3 py-1 rounded-full text-sm ${filterAreaType === 'espaço' ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilterAreaType('espaço')}>
                  Espaço Gourmet
                </button>
                <button className={`px-3 py-1 rounded-full text-sm ${filterAreaType === 'quadra' ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilterAreaType('quadra')}>
                  Quadra
                </button>
                <button className={`px-3 py-1 rounded-full text-sm ${filterAreaType === 'piscina' ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-700'}`} onClick={() => setFilterAreaType('piscina')}>
                  Piscina
                </button>
              </div>
              <div className="flex justify-between mt-4">
                <h3 className="text-sm font-medium text-gray-700">Legenda:</h3>
                <div className="flex space-x-3">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Disponível</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Reservado</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Manutenção</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                    <span className="text-xs text-gray-600">Evento</span>
                  </div>
                </div>
              </div>
            </div>}
          <div className="space-y-6">
            {filteredAreas.map(area => <Card key={area.id} className="overflow-hidden">
                <div className="h-48 overflow-hidden relative">
                  <img src={area.image} alt={area.name} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2">
                    {area.availabilityColor && getAvailabilityIndicator(area.availabilityColor)}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-medium">{area.name}</h3>
                      <div className="flex items-center mt-1">
                        <Star size={16} className="text-yellow-400" fill="#FBBF24" />
                        <span className="ml-1 text-sm text-gray-600">
                          {area.rating}
                        </span>
                        <span className="mx-2 text-gray-300">|</span>
                        <Users size={16} className="text-gray-400" />
                        <span className="ml-1 text-sm text-gray-600">
                          Até {area.capacity} pessoas
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-500" />
                      <span className="font-medium">
                        {area.price > 0 ? `R$ ${area.price}` : 'Grátis'}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">
                      Comodidades:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {area.amenities.map((amenity, index) => <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                          {amenity}
                        </span>)}
                    </div>
                  </div>
                  <Button variant="primary" fullWidth leftIcon={<Calendar size={16} />} onClick={() => navigate(`/resident/area-booking/${area.id}`)} disabled={!area.availableToday}>
                    Reservar
                  </Button>
                </CardContent>
              </Card>)}
          </div>
        </> : <div className="space-y-4">
          {bookings.map(booking => <Card key={booking.id}>
              <CardHeader title={booking.area} subtitle={`${booking.date} • ${booking.time}`} action={statusBadge(booking.status)} />
              <CardContent>
                <div className="space-y-3">
                  <div className="flex space-x-2 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>{booking.date}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="mr-1" />
                      <span>{booking.time}</span>
                    </div>
                  </div>
                  {booking.guestCount && <div className="flex items-center text-sm text-gray-500">
                      <Users size={16} className="mr-1" />
                      <span>{booking.guestCount} convidados</span>
                    </div>}
                  {booking.additionalServices && booking.additionalServices.length > 0 && <div className="text-sm text-gray-500">
                        <p className="mb-1">Serviços adicionais:</p>
                        <div className="flex flex-wrap gap-2">
                          {booking.additionalServices.map((service, index) => <span key={index} className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                              {service}
                            </span>)}
                        </div>
                      </div>}
                  <div className="flex flex-col space-y-2">
                    {booking.status === 'confirmed' && <>
                        <div className="p-3 bg-gray-50 rounded-lg flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <Calendar size={20} className="text-[#4A90E2]" />
                            </div>
                            <div>
                              <p className="text-sm font-medium">
                                Código de acesso
                              </p>
                              <p className="text-xs text-gray-500">
                                Apresente na portaria
                              </p>
                            </div>
                          </div>
                          <div className="bg-white p-2 rounded-md border">
                            <p className="text-lg font-mono font-bold">A45B7</p>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1">
                            Modificar
                          </Button>
                          <Button variant="outline" className="flex-1 text-red-500 border-red-500 hover:bg-red-50">
                            Cancelar
                          </Button>
                        </div>
                      </>}
                    {booking.status === 'pending' && <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50">
                        Cancelar Solicitação
                      </Button>}
                  </div>
                </div>
              </CardContent>
            </Card>)}
          <Button variant="secondary" fullWidth className="mt-4" leftIcon={<Plus size={16} />} onClick={() => setActiveTab('areas')}>
            Nova Reserva
          </Button>
        </div>}
    </div>;
};