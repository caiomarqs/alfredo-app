import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Filter, ChevronDown, User, Mail, Phone, Home, MoreHorizontal, MessageSquare, FileText, Calendar, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Input } from '../../../components/ui/Input';
interface Resident {
  id: string;
  name: string;
  email: string;
  apartment: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
  profileImage?: string;
  type: 'owner' | 'tenant';
  paymentStatus: 'current' | 'late' | 'overdue';
  moveInDate: string;
  familyMembers: number;
  vehicles: number;
}
export const AdminResidentsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPayment, setFilterPayment] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showActions, setShowActions] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const residents: Resident[] = [{
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    apartment: '302A',
    phone: '(11) 98765-4321',
    status: 'active',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    type: 'owner',
    paymentStatus: 'current',
    moveInDate: '15/03/2022',
    familyMembers: 3,
    vehicles: 1
  }, {
    id: '2',
    name: 'Maria Souza',
    email: 'maria.souza@example.com',
    apartment: '101A',
    phone: '(11) 91234-5678',
    status: 'active',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    type: 'tenant',
    paymentStatus: 'late',
    moveInDate: '05/07/2022',
    familyMembers: 2,
    vehicles: 0
  }, {
    id: '3',
    name: 'Carlos Oliveira',
    email: 'carlos.oliveira@example.com',
    apartment: '205B',
    phone: '(11) 99876-5432',
    status: 'inactive',
    profileImage: 'https://randomuser.me/api/portraits/men/67.jpg',
    type: 'owner',
    paymentStatus: 'overdue',
    moveInDate: '10/01/2021',
    familyMembers: 1,
    vehicles: 1
  }, {
    id: '4',
    name: 'Ana Costa',
    email: 'ana.costa@example.com',
    apartment: '104B',
    phone: '(11) 95432-1098',
    status: 'pending',
    profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
    type: 'tenant',
    paymentStatus: 'current',
    moveInDate: '20/11/2022',
    familyMembers: 4,
    vehicles: 2
  }, {
    id: '5',
    name: 'Roberto Almeida',
    email: 'roberto.almeida@example.com',
    apartment: '502C',
    phone: '(11) 97890-1234',
    status: 'active',
    profileImage: 'https://randomuser.me/api/portraits/men/22.jpg',
    type: 'owner',
    paymentStatus: 'current',
    moveInDate: '03/05/2021',
    familyMembers: 2,
    vehicles: 1
  }, {
    id: '6',
    name: 'Fernanda Lima',
    email: 'fernanda.lima@example.com',
    apartment: '201D',
    phone: '(11) 96543-2109',
    status: 'active',
    profileImage: 'https://randomuser.me/api/portraits/women/28.jpg',
    type: 'tenant',
    paymentStatus: 'overdue',
    moveInDate: '12/08/2022',
    familyMembers: 1,
    vehicles: 1
  }];
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="success">Ativo</Badge>;
      case 'inactive':
        return <Badge variant="default">Inativo</Badge>;
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>;
      default:
        return null;
    }
  };
  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'current':
        return <Badge variant="success">Em dia</Badge>;
      case 'late':
        return <Badge variant="warning">Atrasado</Badge>;
      case 'overdue':
        return <Badge variant="danger">Inadimplente</Badge>;
      default:
        return null;
    }
  };
  const getPaymentStatusIcon = (status: string) => {
    switch (status) {
      case 'current':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'late':
        return <Clock size={16} className="text-yellow-500" />;
      case 'overdue':
        return <AlertCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  const getResidentTypeBadge = (type: string) => {
    switch (type) {
      case 'owner':
        return <Badge variant="info">Proprietário</Badge>;
      case 'tenant':
        return <Badge variant="default">Inquilino</Badge>;
      default:
        return null;
    }
  };
  const filteredResidents = residents.filter(resident => {
    // Search filter
    const matchesSearch = resident.name.toLowerCase().includes(searchQuery.toLowerCase()) || resident.email.toLowerCase().includes(searchQuery.toLowerCase()) || resident.apartment.toLowerCase().includes(searchQuery.toLowerCase()) || resident.phone.toLowerCase().includes(searchQuery.toLowerCase());
    // Status filter
    const matchesStatus = filterStatus ? resident.status === filterStatus : true;
    // Type filter
    const matchesType = filterType ? resident.type === filterType : true;
    // Payment filter
    const matchesPayment = filterPayment ? resident.paymentStatus === filterPayment : true;
    return matchesSearch && matchesStatus && matchesType && matchesPayment;
  });
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Moradores</h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de moradores do condomínio
          </p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={() => navigate('/admin/residents/add')}>
          Adicionar Morador
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar por nome, email, apartamento ou telefone..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <div className="relative">
            <Button variant="outline" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
              <Filter size={16} className="mr-2" />
              Filtros
              <ChevronDown size={16} className="ml-2" />
            </Button>
            {showFilters && <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                <div className="p-4 space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Status
                    </p>
                    <div className="space-y-1">
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterStatus === null ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterStatus(null)}>
                        Todos
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterStatus === 'active' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterStatus('active')}>
                        Ativos
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterStatus === 'inactive' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterStatus('inactive')}>
                        Inativos
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterStatus === 'pending' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterStatus('pending')}>
                        Pendentes
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Tipo
                    </p>
                    <div className="space-y-1">
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterType === null ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterType(null)}>
                        Todos
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterType === 'owner' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterType('owner')}>
                        Proprietários
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterType === 'tenant' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterType('tenant')}>
                        Inquilinos
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Pagamento
                    </p>
                    <div className="space-y-1">
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterPayment === null ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterPayment(null)}>
                        Todos
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterPayment === 'current' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterPayment('current')}>
                        Em dia
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterPayment === 'late' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterPayment('late')}>
                        Atrasados
                      </button>
                      <button className={`block w-full text-left px-2 py-1 text-sm rounded ${filterPayment === 'overdue' ? 'bg-blue-50 text-[#4A90E2]' : 'hover:bg-gray-100'}`} onClick={() => setFilterPayment('overdue')}>
                        Inadimplentes
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button size="sm" variant="outline" onClick={() => {
                  setFilterStatus(null);
                  setFilterType(null);
                  setFilterPayment(null);
                }}>
                      Limpar filtros
                    </Button>
                  </div>
                </div>
              </div>}
          </div>
          <div className="flex space-x-2">
            <Button variant={viewMode === 'cards' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('cards')}>
              Cartões
            </Button>
            <Button variant={viewMode === 'table' ? 'primary' : 'outline'} size="sm" onClick={() => setViewMode('table')}>
              Tabela
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
              Mostrando {filteredResidents.length} de {residents.length}{' '}
              moradores
            </p>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Ordenar por:</span>
              <select className="border border-gray-300 rounded-md text-sm py-1 px-2">
                <option value="name">Nome</option>
                <option value="apartment">Apartamento</option>
                <option value="status">Status</option>
                <option value="payment">Pagamento</option>
              </select>
            </div>
          </div>
        </div>
        {viewMode === 'cards' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredResidents.map(resident => <Card key={resident.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate(`/admin/residents/${resident.id}`)}>
                <div className="p-5">
                  <div className="flex items-center mb-4">
                    <div className="relative">
                      <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden mr-4">
                        {resident.profileImage ? <img src={resident.profileImage} alt={resident.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                            <span className="text-white font-medium text-xl">
                              {resident.name.charAt(0)}
                            </span>
                          </div>}
                      </div>
                      <div className="absolute -bottom-1 -right-1">
                        {getPaymentStatusIcon(resident.paymentStatus)}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{resident.name}</h3>
                      <div className="flex items-center space-x-2">
                        <p className="text-sm text-gray-500">
                          Apto {resident.apartment}
                        </p>
                        <span className="text-gray-300">•</span>
                        <p className="text-sm text-gray-500">
                          {resident.familyMembers} membros
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <button onClick={e => {
                  e.stopPropagation();
                  setShowActions(showActions === resident.id ? null : resident.id);
                }} className="p-2 rounded-full hover:bg-gray-100">
                        <MoreHorizontal size={20} className="text-gray-500" />
                      </button>
                      {showActions === resident.id && <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                          <div className="py-1">
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={e => {
                      e.stopPropagation();
                      navigate(`/admin/residents/${resident.id}/edit`);
                    }}>
                              <User size={16} className="mr-2" />
                              Editar
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={e => {
                      e.stopPropagation();
                      // Handle message action
                    }}>
                              <MessageSquare size={16} className="mr-2" />
                              Enviar mensagem
                            </button>
                            <button className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left" onClick={e => {
                      e.stopPropagation();
                      // Handle history action
                    }}>
                              <FileText size={16} className="mr-2" />
                              Ver histórico
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {getStatusBadge(resident.status)}
                    {getResidentTypeBadge(resident.type)}
                    {getPaymentStatusBadge(resident.paymentStatus)}
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">{resident.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">{resident.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-400 mr-2" />
                      <span className="text-gray-600">
                        Desde {resident.moveInDate}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={e => {
                e.stopPropagation();
                navigate(`/admin/residents/${resident.id}`);
              }}>
                      Detalhes
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={e => {
                e.stopPropagation();
                // Handle message action
              }}>
                      Mensagem
                    </Button>
                  </div>
                </div>
              </Card>)}
          </div> : <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Morador
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Pagamento
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Desde
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredResidents.map(resident => <tr key={resident.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/admin/residents/${resident.id}`)}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                            {resident.profileImage ? <img src={resident.profileImage} alt={resident.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                                <span className="text-white font-medium">
                                  {resident.name.charAt(0)}
                                </span>
                              </div>}
                          </div>
                          <div className="absolute -bottom-1 -right-1">
                            {getPaymentStatusIcon(resident.paymentStatus)}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {resident.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            Apto {resident.apartment}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {resident.email}
                      </div>
                      <div className="text-sm text-gray-500">
                        {resident.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(resident.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getResidentTypeBadge(resident.type)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentStatusBadge(resident.paymentStatus)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {resident.moveInDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button onClick={e => {
                    e.stopPropagation();
                    navigate(`/admin/residents/${resident.id}/edit`);
                  }} className="text-[#4A90E2] hover:text-blue-700">
                          Editar
                        </button>
                        <button onClick={e => {
                    e.stopPropagation();
                    // Handle message action
                  }} className="text-[#4A90E2] hover:text-blue-700">
                          Mensagem
                        </button>
                      </div>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>}
        {filteredResidents.length === 0 && <div className="text-center py-10">
            <User size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700">
              Nenhum morador encontrado
            </h3>
            <p className="text-gray-500">
              Tente ajustar os filtros ou adicione um novo morador
            </p>
            <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/residents/add')} leftIcon={<Plus size={16} />}>
              Adicionar Morador
            </Button>
          </div>}
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="text-sm text-gray-500">
          Mostrando {filteredResidents.length} de {residents.length} moradores
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm" disabled>
            Próximo
          </Button>
        </div>
      </div>
    </div>;
};