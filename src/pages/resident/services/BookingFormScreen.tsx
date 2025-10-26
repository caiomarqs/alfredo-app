import React, { useEffect, useState } from 'react';
import { ArrowLeft, Calendar, Clock, Users, DollarSign, Check, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
interface TimeSlot {
  id: number;
  start: string;
  end: string;
  available: boolean;
}
interface EquipmentItem {
  id: number;
  name: string;
  price: number;
  available: number;
  selected: number;
}
interface Area {
  id: number;
  name: string;
  description: string;
  images: string[];
  price: number;
  capacity: number;
  minHours: number;
  maxHours: number;
  rules: string[];
  timeSlots: TimeSlot[];
  equipment: EquipmentItem[];
  reviews: {
    rating: number;
    count: number;
  };
}
export const BookingFormScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    areaId
  } = useParams<{
    areaId: string;
  }>();
  const [currentStep, setCurrentStep] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<number[]>([]);
  const [guestCount, setGuestCount] = useState(1);
  const [additionalServices, setAdditionalServices] = useState({
    cleaning: false,
    security: false
  });
  const [specialRequests, setSpecialRequests] = useState('');
  const [equipment, setEquipment] = useState<EquipmentItem[]>([]);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  // Mock area data based on areaId
  const area: Area = {
    id: Number(areaId) || 1,
    name: 'Salão de Festas',
    description: 'Espaço amplo e confortável para festas e eventos, com cozinha completa, sistema de som e ar condicionado.',
    images: ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1498&q=80', 'https://images.unsplash.com/photo-1562967914-608f82629710?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80', 'https://images.unsplash.com/photo-1563970163896-7d5e2dc7f4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80', 'https://images.unsplash.com/photo-1519741347686-c1e331fcb994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80'],
    price: 200,
    capacity: 50,
    minHours: 4,
    maxHours: 8,
    rules: ['Proibido som alto após às 22h', 'Capacidade máxima de 50 pessoas', 'Limpeza é responsabilidade do locatário', 'Proibido fumar nas dependências', 'Reservas devem ser feitas com 48h de antecedência'],
    timeSlots: [{
      id: 1,
      start: '08:00',
      end: '12:00',
      available: true
    }, {
      id: 2,
      start: '12:00',
      end: '16:00',
      available: false
    }, {
      id: 3,
      start: '16:00',
      end: '20:00',
      available: true
    }, {
      id: 4,
      start: '20:00',
      end: '00:00',
      available: true
    }],
    equipment: [{
      id: 1,
      name: 'Mesa',
      price: 10,
      available: 10,
      selected: 0
    }, {
      id: 2,
      name: 'Cadeira',
      price: 5,
      available: 50,
      selected: 0
    }, {
      id: 3,
      name: 'Caixa de Som',
      price: 50,
      available: 2,
      selected: 0
    }, {
      id: 4,
      name: 'Cooler',
      price: 20,
      available: 3,
      selected: 0
    }],
    reviews: {
      rating: 4.5,
      count: 28
    }
  };
  // Initialize equipment state from area data
  useEffect(() => {
    setEquipment(area.equipment);
  }, [area.equipment]);
  const handleTimeSlotToggle = (id: number) => {
    if (selectedTimeSlots.includes(id)) {
      setSelectedTimeSlots(selectedTimeSlots.filter(slotId => slotId !== id));
    } else {
      setSelectedTimeSlots([...selectedTimeSlots, id]);
    }
  };
  const handleEquipmentChange = (id: number, change: number) => {
    setEquipment(equipment.map(item => {
      if (item.id === id) {
        const newValue = Math.max(0, Math.min(item.available, item.selected + change));
        return {
          ...item,
          selected: newValue
        };
      }
      return item;
    }));
  };
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  const handleImageNavigation = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      setCurrentImageIndex(prev => prev === 0 ? area.images.length - 1 : prev - 1);
    } else {
      setCurrentImageIndex(prev => prev === area.images.length - 1 ? 0 : prev + 1);
    }
  };
  const calculateTotalHours = () => {
    if (selectedTimeSlots.length === 0) return 0;
    return selectedTimeSlots.length * 4; // Assuming each slot is 4 hours
  };
  const calculateBasePrice = () => {
    return area.price * calculateTotalHours();
  };
  const calculateEquipmentPrice = () => {
    return equipment.reduce((total, item) => total + item.price * item.selected, 0);
  };
  const calculateAdditionalServicesPrice = () => {
    let price = 0;
    if (additionalServices.cleaning) price += 100;
    if (additionalServices.security) price += 150;
    return price;
  };
  const calculateTotalPrice = () => {
    return calculateBasePrice() + calculateEquipmentPrice() + calculateAdditionalServicesPrice();
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div className="relative h-64 overflow-hidden rounded-lg">
              <img src={area.images[currentImageIndex]} alt={area.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white" onClick={() => handleImageNavigation('prev')}>
                  <ChevronLeft size={20} />
                </button>
                <button className="w-8 h-8 rounded-full bg-black bg-opacity-50 flex items-center justify-center text-white" onClick={() => handleImageNavigation('next')}>
                  <ChevronRight size={20} />
                </button>
              </div>
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                {currentImageIndex + 1}/{area.images.length}
              </div>
            </div>
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold">{area.name}</h2>
                  <div className="flex items-center mt-1">
                    <Badge variant="success">Disponível</Badge>
                    <span className="mx-2">•</span>
                    <span className="text-sm text-gray-500">
                      Capacidade: até {area.capacity} pessoas
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">R$ {area.price}/hora</p>
                </div>
              </div>
              <p className="mt-3 text-gray-600">{area.description}</p>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Regras e restrições:</h3>
                <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                  {area.rules.map((rule, index) => <li key={index}>{rule}</li>)}
                </ul>
              </div>
              <div className="mt-4">
                <h3 className="font-medium mb-2">Avaliações:</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {Array.from({
                    length: 5
                  }).map((_, i) => <svg key={i} className={`w-4 h-4 ${i < Math.floor(area.reviews.rating) ? 'text-yellow-400' : i < area.reviews.rating ? 'text-yellow-300' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>)}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {area.reviews.rating} ({area.reviews.count} avaliações)
                  </span>
                </div>
              </div>
            </div>
            <Button fullWidth onClick={nextStep}>
              Continuar para Reserva
            </Button>
          </div>;
      case 2:
        return <div className="space-y-6">
            <h2 className="text-lg font-medium">Selecione a data e horário</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data da reserva
              </label>
              <input type="date" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" min={new Date().toISOString().split('T')[0]} onChange={e => setSelectedDate(e.target.value ? new Date(e.target.value) : null)} />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Horários disponíveis
              </label>
              <div className="grid grid-cols-2 gap-2">
                {area.timeSlots.map(slot => <button key={slot.id} disabled={!slot.available} className={`p-3 rounded-lg border flex items-center justify-between ${!slot.available ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : selectedTimeSlots.includes(slot.id) ? 'bg-blue-50 border-[#4A90E2] text-[#4A90E2]' : 'bg-white border-gray-300 hover:bg-gray-50'}`} onClick={() => slot.available && handleTimeSlotToggle(slot.id)}>
                    <span>
                      {slot.start} - {slot.end}
                    </span>
                    {selectedTimeSlots.includes(slot.id) && <Check size={16} className="text-[#4A90E2]" />}
                  </button>)}
              </div>
              <p className="mt-2 text-xs text-gray-500">
                Mínimo: {area.minHours}h | Máximo: {area.maxHours}h
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Número de convidados
              </label>
              <div className="flex items-center">
                <button className="w-10 h-10 rounded-l-lg border border-gray-300 flex items-center justify-center bg-gray-50" onClick={() => setGuestCount(Math.max(1, guestCount - 1))}>
                  -
                </button>
                <input type="number" className="w-20 h-10 border-t border-b border-gray-300 text-center" value={guestCount} onChange={e => setGuestCount(Math.min(area.capacity, Math.max(1, Number(e.target.value))))} />
                <button className="w-10 h-10 rounded-r-lg border border-gray-300 flex items-center justify-center bg-gray-50" onClick={() => setGuestCount(Math.min(area.capacity, guestCount + 1))}>
                  +
                </button>
                <span className="ml-2 text-sm text-gray-500">
                  (máx. {area.capacity})
                </span>
              </div>
            </div>
            <div className="flex justify-between space-x-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>
                Voltar
              </Button>
              <Button className="flex-1" onClick={nextStep} disabled={!selectedDate || selectedTimeSlots.length === 0}>
                Continuar
              </Button>
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <h2 className="text-lg font-medium">Serviços adicionais</h2>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Equipamentos
              </h3>
              <div className="space-y-3">
                {equipment.map(item => <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        R$ {item.price} por unidade
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button className="w-8 h-8 rounded-l border border-gray-300 flex items-center justify-center bg-gray-50" onClick={() => handleEquipmentChange(item.id, -1)} disabled={item.selected === 0}>
                        -
                      </button>
                      <div className="w-10 h-8 border-t border-b border-gray-300 flex items-center justify-center">
                        {item.selected}
                      </div>
                      <button className="w-8 h-8 rounded-r border border-gray-300 flex items-center justify-center bg-gray-50" onClick={() => handleEquipmentChange(item.id, 1)} disabled={item.selected === item.available}>
                        +
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Serviços
              </h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Serviço de limpeza</p>
                    <p className="text-sm text-gray-500">
                      Limpeza completa após o evento
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium">R$ 100</span>
                    <button className={`w-10 h-6 ${additionalServices.cleaning ? 'bg-[#4A90E2]' : 'bg-gray-200'} rounded-full relative transition-colors`} onClick={() => setAdditionalServices({
                    ...additionalServices,
                    cleaning: !additionalServices.cleaning
                  })}>
                      <span className={`absolute top-1 ${additionalServices.cleaning ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`}></span>
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Segurança</p>
                    <p className="text-sm text-gray-500">
                      Segurança privada durante o evento
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-sm font-medium">R$ 150</span>
                    <button className={`w-10 h-6 ${additionalServices.security ? 'bg-[#4A90E2]' : 'bg-gray-200'} rounded-full relative transition-colors`} onClick={() => setAdditionalServices({
                    ...additionalServices,
                    security: !additionalServices.security
                  })}>
                      <span className={`absolute top-1 ${additionalServices.security ? 'right-1' : 'left-1'} w-4 h-4 bg-white rounded-full transition-all`}></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Solicitações especiais (opcional)
              </label>
              <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" rows={3} placeholder="Informe quaisquer necessidades especiais ou solicitações para sua reserva..." value={specialRequests} onChange={e => setSpecialRequests(e.target.value)} />
            </div>
            <div className="flex justify-between space-x-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>
                Voltar
              </Button>
              <Button className="flex-1" onClick={nextStep}>
                Revisar e Confirmar
              </Button>
            </div>
          </div>;
      case 4:
        return <div className="space-y-6">
            <h2 className="text-lg font-medium">Revise sua reserva</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{area.name}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedDate?.toLocaleDateString('pt-BR', {
                    weekday: 'long',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                  </p>
                </div>
                <Badge variant="success">Disponível</Badge>
              </div>
              <div className="flex space-x-2 text-sm text-gray-500">
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span>
                    {selectedTimeSlots.map(id => {
                    const slot = area.timeSlots.find(s => s.id === id);
                    return slot ? `${slot.start} - ${slot.end}` : '';
                  }).join(', ')}
                  </span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{guestCount} convidados</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="font-medium">Resumo de valores</h3>
              <div className="flex justify-between text-sm">
                <span>
                  Aluguel ({calculateTotalHours()}h x R$ {area.price})
                </span>
                <span>R$ {calculateBasePrice().toFixed(2)}</span>
              </div>
              {equipment.some(item => item.selected > 0) && <>
                  <div className="text-sm font-medium">Equipamentos:</div>
                  {equipment.filter(item => item.selected > 0).map(item => <div key={item.id} className="flex justify-between text-sm pl-4">
                        <span>
                          {item.name} ({item.selected} x R$ {item.price})
                        </span>
                        <span>
                          R$ {(item.selected * item.price).toFixed(2)}
                        </span>
                      </div>)}
                </>}
              {(additionalServices.cleaning || additionalServices.security) && <>
                  <div className="text-sm font-medium">
                    Serviços adicionais:
                  </div>
                  {additionalServices.cleaning && <div className="flex justify-between text-sm pl-4">
                      <span>Serviço de limpeza</span>
                      <span>R$ 100,00</span>
                    </div>}
                  {additionalServices.security && <div className="flex justify-between text-sm pl-4">
                      <span>Segurança</span>
                      <span>R$ 150,00</span>
                    </div>}
                </>}
              <div className="border-t pt-2 flex justify-between font-bold">
                <span>Total</span>
                <span>R$ {calculateTotalPrice().toFixed(2)}</span>
              </div>
            </div>
            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" checked={acceptedTerms} onChange={e => setAcceptedTerms(e.target.checked)} />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                Li e aceito os{' '}
                <a href="#" className="text-[#4A90E2]">
                  termos e condições
                </a>{' '}
                e as{' '}
                <a href="#" className="text-[#4A90E2]">
                  regras de utilização
                </a>{' '}
                do espaço.
              </label>
            </div>
            <div className="flex justify-between space-x-3">
              <Button variant="outline" className="flex-1" onClick={prevStep}>
                Voltar
              </Button>
              <Button className="flex-1" disabled={!acceptedTerms} onClick={() => {
              // Here you would submit the booking
              console.log('Booking submitted');
              navigate('/resident/area-booking');
            }}>
                Confirmar Reserva
              </Button>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/resident/area-booking')} className="mr-2">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Reserva</h1>
      </div>
      {/* Progress steps */}
      <div className="mb-6">
        <div className="flex justify-between">
          {[1, 2, 3, 4].map(step => <div key={step} className="flex flex-col items-center" style={{
          width: '25%'
        }}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${currentStep >= step ? 'bg-[#4A90E2] text-white' : 'bg-gray-200 text-gray-500'}`}>
                {step}
              </div>
              <span className="text-xs text-center text-gray-500">
                {step === 1 ? 'Detalhes' : step === 2 ? 'Data/Hora' : step === 3 ? 'Serviços' : 'Confirmar'}
              </span>
            </div>)}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-0 h-1 bg-gray-200 w-full"></div>
          <div className="absolute top-0 left-0 h-1 bg-[#4A90E2] transition-all" style={{
          width: `${(currentStep - 1) / 3 * 100}%`
        }}></div>
        </div>
      </div>
      <Card>
        <div className="p-4">{renderStepContent()}</div>
      </Card>
    </div>;
};