import React, { useState } from 'react';
import { Search, Filter, Plus, Calendar, User, Home, Clock, CheckCircle, AlertTriangle, ChevronDown, ChevronUp, X, Edit, Trash, MessageSquare } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
interface WorkOrder {
  id: number;
  title: string;
  description: string;
  area: string;
  requestedBy: string;
  apartment: string;
  assignedTo?: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'completed' | 'cancelled';
  dateCreated: string;
  dueDate?: string;
  completedDate?: string;
  comments: number;
  attachments: number;
}
export const WorkOrdersScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'in_progress' | 'completed'>('all');
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<number | null>(null);
  // Mock data for work orders
  const workOrders: WorkOrder[] = [{
    id: 1,
    title: 'Vazamento na pia do banheiro',
    description: 'O cano abaixo da pia está vazando água sempre que utilizada.',
    area: 'Hidráulica',
    requestedBy: 'João Silva',
    apartment: '302A',
    assignedTo: 'Carlos Técnico',
    priority: 'medium',
    status: 'in_progress',
    dateCreated: '15/06/2023',
    dueDate: '20/06/2023',
    comments: 3,
    attachments: 2
  }, {
    id: 2,
    title: 'Lâmpada queimada no corredor',
    description: 'A lâmpada do corredor do 2º andar próximo ao elevador está queimada.',
    area: 'Elétrica',
    requestedBy: 'Maria Santos',
    apartment: '101B',
    assignedTo: 'Pedro Eletricista',
    priority: 'low',
    status: 'open',
    dateCreated: '16/06/2023',
    dueDate: '23/06/2023',
    comments: 1,
    attachments: 0
  }, {
    id: 3,
    title: 'Ar condicionado não liga',
    description: 'O ar condicionado da sala não está ligando, controle remoto com pilhas novas.',
    area: 'Climatização',
    requestedBy: 'Carlos Oliveira',
    apartment: '203C',
    assignedTo: 'Roberto Técnico',
    priority: 'high',
    status: 'open',
    dateCreated: '14/06/2023',
    dueDate: '18/06/2023',
    comments: 2,
    attachments: 1
  }, {
    id: 4,
    title: 'Porta do elevador com problema',
    description: 'A porta do elevador social não está fechando completamente.',
    area: 'Manutenção Geral',
    requestedBy: 'Ana Costa',
    apartment: '104B',
    priority: 'urgent',
    status: 'in_progress',
    dateCreated: '13/06/2023',
    dueDate: '15/06/2023',
    comments: 5,
    attachments: 2
  }, {
    id: 5,
    title: 'Troca de fechadura',
    description: 'Solicito a troca da fechadura da porta principal que está com dificuldade para abrir.',
    area: 'Serralheria',
    requestedBy: 'Roberto Almeida',
    apartment: '401A',
    assignedTo: 'José Serralheiro',
    priority: 'medium',
    status: 'completed',
    dateCreated: '10/06/2023',
    dueDate: '17/06/2023',
    completedDate: '15/06/2023',
    comments: 2,
    attachments: 0
  }, {
    id: 6,
    title: 'Infiltração no teto',
    description: 'Há uma mancha de infiltração no teto da sala, próximo à janela.',
    area: 'Hidráulica',
    requestedBy: 'Patricia Lima',
    apartment: '502B',
    assignedTo: 'Carlos Técnico',
    priority: 'high',
    status: 'completed',
    dateCreated: '05/06/2023',
    dueDate: '12/06/2023',
    completedDate: '11/06/2023',
    comments: 4,
    attachments: 3
  }];
  const toggleOrderExpand = (id: number) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger">Urgente</Badge>;
      case 'high':
        return <Badge variant="warning">Alta</Badge>;
      case 'medium':
        return <Badge variant="info">Média</Badge>;
      case 'low':
        return <Badge variant="default">Baixa</Badge>;
      default:
        return null;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="default">Aberto</Badge>;
      case 'in_progress':
        return <Badge variant="info">Em Andamento</Badge>;
      case 'completed':
        return <Badge variant="success">Concluído</Badge>;
      case 'cancelled':
        return <Badge variant="danger">Cancelado</Badge>;
      default:
        return null;
    }
  };
  const getAreaIcon = (area: string) => {
    switch (area) {
      case 'Hidráulica':
        return <div className="p-2 bg-blue-100 rounded-full">
            <div size={20} className="text-blue-600" />
          </div>;
      case 'Elétrica':
        return <div className="p-2 bg-yellow-100 rounded-full">
            <div size={20} className="text-yellow-600" />
          </div>;
      case 'Climatização':
        return <div className="p-2 bg-green-100 rounded-full">
            <div size={20} className="text-green-600" />
          </div>;
      case 'Serralheria':
        return <div className="p-2 bg-purple-100 rounded-full">
            <div size={20} className="text-purple-600" />
          </div>;
      default:
        return <div className="p-2 bg-gray-100 rounded-full">
            <div size={20} className="text-gray-600" />
          </div>;
    }
  };
  const filteredWorkOrders = workOrders.filter(order => {
    // Filter by tab
    if (activeTab !== 'all' && order.status !== activeTab) {
      return false;
    }
    // Filter by search term
    if (searchTerm && !order.title.toLowerCase().includes(searchTerm.toLowerCase()) && !order.description.toLowerCase().includes(searchTerm.toLowerCase()) && !order.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) && !order.apartment.toLowerCase().includes(searchTerm.toLowerCase()) && !order.area.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  const statusCounts = {
    all: workOrders.length,
    open: workOrders.filter(order => order.status === 'open').length,
    in_progress: workOrders.filter(order => order.status === 'in_progress').length,
    completed: workOrders.filter(order => order.status === 'completed').length
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Ordens de Serviço
          </h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de solicitações de manutenção e reparos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button leftIcon={<Plus size={16} />} onClick={() => setShowNewOrderModal(true)}>
            Nova Ordem de Serviço
          </Button>
        </div>
      </div>
      {/* Search and Filter */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar ordens de serviço..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <Button variant="outline" size="sm" leftIcon={<Filter size={16} />} onClick={() => setShowFilters(!showFilters)} className="whitespace-nowrap">
              Filtros{' '}
              {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>
          </div>
          {showFilters && <div className="mt-4 pt-4 border-t grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="all">Todas</option>
                  <option value="urgent">Urgente</option>
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Área
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="all">Todas</option>
                  <option value="Hidráulica">Hidráulica</option>
                  <option value="Elétrica">Elétrica</option>
                  <option value="Climatização">Climatização</option>
                  <option value="Serralheria">Serralheria</option>
                  <option value="Manutenção Geral">Manutenção Geral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="date_desc">Data (mais recente)</option>
                  <option value="date_asc">Data (mais antiga)</option>
                  <option value="priority_desc">Prioridade (maior)</option>
                  <option value="priority_asc">Prioridade (menor)</option>
                  <option value="apartment">Apartamento</option>
                </select>
              </div>
            </div>}
        </CardContent>
      </Card>
      {/* Tabs */}
      <div className="flex overflow-x-auto bg-white rounded-lg border border-gray-200">
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'all' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('all')}>
          Todas ({statusCounts.all})
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'open' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('open')}>
          Abertas ({statusCounts.open})
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'in_progress' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('in_progress')}>
          Em Andamento ({statusCounts.in_progress})
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'completed' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('completed')}>
          Concluídas ({statusCounts.completed})
        </button>
      </div>
      {/* Work Orders List */}
      <div className="space-y-4">
        {filteredWorkOrders.length > 0 ? filteredWorkOrders.map(order => <Card key={order.id} className="overflow-hidden">
              <div className="p-4 cursor-pointer" onClick={() => toggleOrderExpand(order.id)}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    {getAreaIcon(order.area)}
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="font-medium text-lg">{order.title}</h3>
                        {getPriorityBadge(order.priority)}
                        {getStatusBadge(order.status)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1 flex-wrap gap-x-3">
                        <span className="flex items-center">
                          <User size={14} className="mr-1" />
                          {order.requestedBy}
                        </span>
                        <span className="flex items-center">
                          <Home size={14} className="mr-1" />
                          Apto {order.apartment}
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {order.dateCreated}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    {order.dueDate && <div className="flex items-center text-gray-500 text-sm">
                        <Clock size={16} className="mr-1" />
                        <span>Prazo: {order.dueDate}</span>
                      </div>}
                    <div>
                      {expandedOrder === order.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>
              {expandedOrder === order.id && <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">
                        Detalhes da Solicitação
                      </h4>
                      <p className="text-gray-700 whitespace-pre-wrap mb-4">
                        {order.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Área:</span>
                          <span>{order.area}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Prioridade:</span>
                          <span>{getPriorityBadge(order.priority)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span>{getStatusBadge(order.status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Data de Criação:
                          </span>
                          <span>{order.dateCreated}</span>
                        </div>
                        {order.dueDate && <div className="flex justify-between">
                            <span className="text-gray-500">Prazo:</span>
                            <span>{order.dueDate}</span>
                          </div>}
                        {order.completedDate && <div className="flex justify-between">
                            <span className="text-gray-500">Concluído em:</span>
                            <span>{order.completedDate}</span>
                          </div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Atribuição e Ações</h4>
                      <div className="p-3 bg-gray-50 rounded-lg mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Responsável
                          </span>
                          {order.status !== 'completed' && <Button variant="outline" size="sm">
                              Atribuir
                            </Button>}
                        </div>
                        {order.assignedTo ? <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                              <User size={16} className="text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium">{order.assignedTo}</p>
                              <p className="text-xs text-gray-500">
                                Técnico de Manutenção
                              </p>
                            </div>
                          </div> : <p className="text-gray-500 italic">
                            Nenhum responsável atribuído
                          </p>}
                      </div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center text-gray-500 text-sm">
                          <MessageSquare size={16} className="mr-1" />
                          <span>{order.comments} comentários</span>
                        </div>
                        <div className="flex items-center text-gray-500 text-sm">
                          <span>{order.attachments} anexos</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {order.status === 'open' && <Button variant="primary" className="w-full">
                            Iniciar Trabalho
                          </Button>}
                        {order.status === 'in_progress' && <Button variant="primary" className="w-full" leftIcon={<CheckCircle size={16} />}>
                            Marcar como Concluído
                          </Button>}
                        <Button variant="outline" className="w-full" leftIcon={<MessageSquare size={16} />}>
                          Adicionar Comentário
                        </Button>
                        <div className="flex space-x-2">
                          <Button variant="outline" className="flex-1" leftIcon={<Edit size={16} />}>
                            Editar
                          </Button>
                          {order.status !== 'completed' && order.status !== 'cancelled' && <Button variant="outline" className="flex-1 text-red-500 border-red-500 hover:bg-red-50" leftIcon={<X size={16} />}>
                                Cancelar
                              </Button>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>) : <Card className="py-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <div size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhuma ordem de serviço encontrada
              </h3>
              <p className="text-gray-500 mb-4">
                Não foram encontradas ordens de serviço com os filtros atuais.
              </p>
              <Button onClick={() => {
            setActiveTab('all');
            setSearchTerm('');
            setShowFilters(false);
          }}>
                Limpar Filtros
              </Button>
            </div>
          </Card>}
      </div>
      {/* New Work Order Modal */}
      {showNewOrderModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Nova Ordem de Serviço</h3>
              <button onClick={() => setShowNewOrderModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="Descreva o problema brevemente" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição Detalhada *
                </label>
                <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] min-h-[120px]" placeholder="Forneça detalhes sobre o problema, incluindo localização específica, sintomas, etc."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Área *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                    <option value="">Selecione a área</option>
                    <option value="Hidráulica">Hidráulica</option>
                    <option value="Elétrica">Elétrica</option>
                    <option value="Climatização">Climatização</option>
                    <option value="Serralheria">Serralheria</option>
                    <option value="Manutenção Geral">Manutenção Geral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridade *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                    <option value="low">Baixa</option>
                    <option value="medium">Média</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Solicitante *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                    <option value="">Selecione o morador</option>
                    <option value="João Silva">João Silva (302A)</option>
                    <option value="Maria Santos">Maria Santos (101B)</option>
                    <option value="Carlos Oliveira">
                      Carlos Oliveira (203C)
                    </option>
                    <option value="Ana Costa">Ana Costa (104B)</option>
                    <option value="Roberto Almeida">
                      Roberto Almeida (401A)
                    </option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prazo
                  </label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Atribuir Para
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                  <option value="">Não atribuir agora</option>
                  <option value="Carlos Técnico">
                    Carlos Técnico (Hidráulica)
                  </option>
                  <option value="Pedro Eletricista">
                    Pedro Eletricista (Elétrica)
                  </option>
                  <option value="Roberto Técnico">
                    Roberto Técnico (Climatização)
                  </option>
                  <option value="José Serralheiro">
                    José Serralheiro (Serralheria)
                  </option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Anexos
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                      <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#4A90E2] hover:text-blue-500 focus-within:outline-none">
                        <span>Carregar arquivos</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, PDF até 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewOrderModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewOrderModal(false)}>
                Criar Ordem de Serviço
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};