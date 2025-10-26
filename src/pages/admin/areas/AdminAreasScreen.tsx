import React, { useState, memo } from 'react';
import { Plus, Search, Calendar, Clock, Users, DollarSign, Edit, Trash, X, ChevronDown, ChevronUp, Camera, Image } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
interface Area {
  id: number;
  name: string;
  description: string;
  capacity: number;
  openingHours: string;
  bookingFee: number;
  status: 'active' | 'maintenance' | 'inactive';
  bookingCount: number;
  images: string[];
  rules: string[];
}
export const AdminAreasScreen: React.FC = () => {
  const [showNewAreaModal, setShowNewAreaModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedArea, setExpandedArea] = useState<number | null>(null);
  const areas: Area[] = [{
    id: 1,
    name: 'Salão de Festas',
    description: 'Espaço amplo para eventos e comemorações com cozinha completa e banheiros.',
    capacity: 50,
    openingHours: '09:00 - 22:00',
    bookingFee: 150.0,
    status: 'active',
    bookingCount: 8,
    images: ['https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGFydHklMjBoYWxsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60', 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhcnR5JTIwaGFsbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60'],
    rules: ['Proibido som alto após 22h', 'Limpeza por conta do morador', 'Máximo de 50 pessoas', 'Reserva com 7 dias de antecedência']
  }, {
    id: 2,
    name: 'Churrasqueira',
    description: 'Área de churrasco coberta com mesas, cadeiras e equipamentos para churrasco.',
    capacity: 20,
    openingHours: '10:00 - 22:00',
    bookingFee: 50.0,
    status: 'active',
    bookingCount: 12,
    images: ['https://images.unsplash.com/photo-1555395015-38133bd5cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFyYmVjdWUlMjBhcmVhfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'],
    rules: ['Trazer próprio carvão', 'Limpeza por conta do morador', 'Máximo de 20 pessoas', 'Reserva com 3 dias de antecedência']
  }, {
    id: 3,
    name: 'Piscina',
    description: 'Piscina adulto e infantil com área de descanso.',
    capacity: 30,
    openingHours: '09:00 - 20:00',
    bookingFee: 0,
    status: 'maintenance',
    bookingCount: 0,
    images: ['https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZG8lMjBwb29sfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60'],
    rules: ['Obrigatório uso de toalha', 'Crianças somente com responsável', 'Proibido consumo de alimentos na água', 'Proibido uso de copos de vidro']
  }, {
    id: 4,
    name: 'Academia',
    description: 'Sala de musculação e aeróbicos com equipamentos modernos.',
    capacity: 15,
    openingHours: '06:00 - 22:00',
    bookingFee: 0,
    status: 'active',
    bookingCount: 0,
    images: ['https://images.unsplash.com/photo-1540497077202-7c8a3999166f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y29uZG8lMjBneW18ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    rules: ['Uso de toalha obrigatório', 'Recolocar os pesos no lugar', 'Proibido menores de 16 anos', 'Tempo máximo de 1h em horários de pico']
  }, {
    id: 5,
    name: 'Quadra Poliesportiva',
    description: 'Quadra para prática de diversos esportes como futebol, vôlei e basquete.',
    capacity: 20,
    openingHours: '08:00 - 21:00',
    bookingFee: 30.0,
    status: 'inactive',
    bookingCount: 0,
    images: ['https://images.unsplash.com/photo-1569597967185-cd6120712154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzJTIwY291cnR8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60'],
    rules: ['Uso de calçado apropriado', 'Reserva por 1h', 'Máximo de 20 pessoas', 'Proibido consumo de alimentos']
  }];
  const toggleAreaExpand = (id: number) => {
    setExpandedArea(expandedArea === id ? null : id);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Ativo</Badge>;
      case 'maintenance':
        return <Badge variant="warning">Em Manutenção</Badge>;
      case 'inactive':
        return <Badge variant="default">Inativo</Badge>;
      default:
        return null;
    }
  };
  const filteredAreas = areas.filter(area => {
    if (searchTerm && !area.name.toLowerCase().includes(searchTerm.toLowerCase()) && !area.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Áreas Comuns</h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de áreas disponíveis para reserva
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button leftIcon={<Plus size={16} />} onClick={() => setShowNewAreaModal(true)}>
            Nova Área
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar áreas..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
          </div>
        </CardContent>
      </Card>

      {/* Areas List */}
      <div className="space-y-4">
        {filteredAreas.length > 0 ? filteredAreas.map(area => <Card key={area.id} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Area Image */}
                <div className="md:w-1/3 h-48 md:h-auto">
                  {area.images && area.images.length > 0 ? <img src={area.images[0]} alt={area.name} className="w-full h-full object-cover" /> : <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <Image size={48} className="text-gray-400" />
                    </div>}
                </div>
                {/* Area Details */}
                <div className="p-4 md:w-2/3">
                  <div className="flex flex-col md:flex-row justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="font-medium text-lg">{area.name}</h3>
                        {getStatusBadge(area.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {area.description}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2 md:mt-0">
                      <Button variant="outline" size="sm" leftIcon={<Edit size={16} />}>
                        Editar
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50" leftIcon={<Trash size={16} />}>
                        Excluir
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mb-3">
                    <div className="flex items-center">
                      <Users size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{area.capacity} pessoas</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">{area.openingHours}</span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">
                        {area.bookingFee > 0 ? `R$ ${area.bookingFee.toFixed(2)}` : 'Gratuito'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-sm">
                        {area.bookingCount} reservas este mês
                      </span>
                    </div>
                    <button onClick={() => toggleAreaExpand(area.id)} className="flex items-center text-[#4A90E2] text-sm">
                      {expandedArea === area.id ? <>
                          Menos detalhes{' '}
                          <ChevronUp size={16} className="ml-1" />
                        </> : <>
                          Ver detalhes{' '}
                          <ChevronDown size={16} className="ml-1" />
                        </>}
                    </button>
                  </div>
                  {expandedArea === area.id && <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium mb-2">Regras de Uso</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {area.rules.map((rule, index) => <li key={index}>{rule}</li>)}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium mb-2">Fotos</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {area.images.map((image, index) => <div key={index} className="h-20 rounded-lg overflow-hidden">
                                <img src={image} alt={`${area.name} - ${index + 1}`} className="w-full h-full object-cover" />
                              </div>)}
                            <button className="h-20 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:text-[#4A90E2] hover:border-[#4A90E2]">
                              <Camera size={20} />
                              <span className="text-xs mt-1">Adicionar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Button variant="outline" size="sm" leftIcon={<Calendar size={16} />}>
                          Ver Reservas
                        </Button>
                        {area.status === 'active' ? <Button variant="outline" size="sm" className="text-yellow-500 border-yellow-500 hover:bg-yellow-50">
                            Colocar em Manutenção
                          </Button> : area.status === 'maintenance' ? <Button variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-50">
                            Ativar Área
                          </Button> : <Button variant="outline" size="sm" className="text-green-500 border-green-500 hover:bg-green-50">
                            Ativar Área
                          </Button>}
                      </div>
                    </div>}
                </div>
              </div>
            </Card>) : <Card className="py-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Calendar size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhuma área encontrada
              </h3>
              <p className="text-gray-500 mb-4">
                Não foram encontradas áreas com o termo de busca.
              </p>
              <Button onClick={() => setSearchTerm('')}>Limpar Busca</Button>
            </div>
          </Card>}
      </div>

      {/* New Area Modal */}
      {showNewAreaModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Nova Área</h3>
              <button onClick={() => setShowNewAreaModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nome da Área *
                </label>
                <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="Ex: Salão de Festas" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição *
                </label>
                <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] min-h-[100px]" placeholder="Descreva a área e suas características..."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacidade (pessoas) *
                  </label>
                  <input type="number" min="1" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="Ex: 50" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Taxa de Reserva (R$) *
                  </label>
                  <input type="number" step="0.01" min="0" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="0,00" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Abertura *
                  </label>
                  <input type="time" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horário de Fechamento *
                  </label>
                  <input type="time" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status *
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                  <option value="active">Ativo</option>
                  <option value="maintenance">Em Manutenção</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Regras de Uso
                </label>
                <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] min-h-[100px]" placeholder="Adicione cada regra em uma nova linha..."></textarea>
                <p className="text-xs text-gray-500 mt-1">
                  Adicione cada regra em uma linha separada
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fotos
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Camera size={24} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Clique para adicionar fotos ou arraste e solte aqui
                  </p>
                  <input type="file" className="hidden" accept="image/*" multiple />
                  <Button variant="outline" size="sm" className="mt-2">
                    Escolher arquivos
                  </Button>
                </div>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="requires_approval" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" defaultChecked />
                <label htmlFor="requires_approval" className="ml-2 text-sm text-gray-700">
                  Reservas requerem aprovação do administrador
                </label>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewAreaModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewAreaModal(false)}>
                Criar Área
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};