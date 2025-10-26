import React, { useState, memo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Mail, Phone, Home, Calendar, MessageSquare, FileText, Edit, Trash, AlertTriangle, Clock, CheckCircle, DollarSign, Car, Users, Key, Shield, ChevronDown, ChevronUp, Plus } from 'lucide-react';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  profileImage?: string;
  accessLevel: 'full' | 'limited' | 'none';
}
interface Vehicle {
  id: string;
  model: string;
  plate: string;
  color: string;
  type: 'car' | 'motorcycle' | 'other';
  parkingSpot: string;
}
interface Payment {
  id: string;
  title: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  method?: 'bank_slip' | 'credit_card' | 'pix' | 'cash';
}
interface Violation {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'pending' | 'acknowledged' | 'resolved' | 'disputed';
  severity: 'low' | 'medium' | 'high';
}
interface Communication {
  id: string;
  type: 'message' | 'notification' | 'report' | 'request';
  title: string;
  content: string;
  date: string;
  read: boolean;
  direction: 'incoming' | 'outgoing';
}
interface TimelineEvent {
  id: string;
  type: 'move_in' | 'payment' | 'violation' | 'communication' | 'access' | 'document' | 'other';
  title: string;
  description: string;
  date: string;
  icon: React.ElementType;
  iconColor: string;
}
export const ResidentProfileScreen: React.FC = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'personal' | 'payments' | 'violations' | 'communications'>('personal');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    familyMembers: true,
    vehicles: true,
    documents: false,
    access: false
  });
  // Mock data for a resident
  const resident = {
    id: '1',
    name: 'João Silva',
    email: 'joao.silva@example.com',
    phone: '(11) 98765-4321',
    apartment: '302A',
    block: 'A',
    floor: '3',
    status: 'active',
    type: 'owner',
    paymentStatus: 'current',
    moveInDate: '15/03/2022',
    birthDate: '10/05/1985',
    cpf: '123.456.789-00',
    profileImage: 'https://randomuser.me/api/portraits/men/32.jpg',
    emergencyContact: {
      name: 'Maria Silva',
      relationship: 'Cônjuge',
      phone: '(11) 91234-5678'
    },
    accessCard: 'AC12345',
    hasRemoteControl: true,
    notes: 'Proprietário do apartamento desde março de 2022. Participa ativamente das assembleias.'
  };
  const familyMembers: FamilyMember[] = [{
    id: '101',
    name: 'Maria Silva',
    relationship: 'Cônjuge',
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    accessLevel: 'full'
  }, {
    id: '102',
    name: 'Pedro Silva',
    relationship: 'Filho',
    profileImage: 'https://randomuser.me/api/portraits/men/76.jpg',
    accessLevel: 'limited'
  }, {
    id: '103',
    name: 'Ana Silva',
    relationship: 'Filha',
    profileImage: 'https://randomuser.me/api/portraits/women/17.jpg',
    accessLevel: 'limited'
  }];
  const vehicles: Vehicle[] = [{
    id: '201',
    model: 'Honda Civic',
    plate: 'ABC1D23',
    color: 'Prata',
    type: 'car',
    parkingSpot: 'A12'
  }, {
    id: '202',
    model: 'Honda CB 500',
    plate: 'XYZ9J87',
    color: 'Preta',
    type: 'motorcycle',
    parkingSpot: 'M05'
  }];
  const payments: Payment[] = [{
    id: '301',
    title: 'Taxa de Condomínio - Junho/2023',
    amount: 450.0,
    dueDate: '15/06/2023',
    paymentDate: '12/06/2023',
    status: 'paid',
    method: 'pix'
  }, {
    id: '302',
    title: 'Taxa de Condomínio - Maio/2023',
    amount: 450.0,
    dueDate: '15/05/2023',
    paymentDate: '10/05/2023',
    status: 'paid',
    method: 'bank_slip'
  }, {
    id: '303',
    title: 'Taxa de Condomínio - Abril/2023',
    amount: 450.0,
    dueDate: '15/04/2023',
    paymentDate: '18/04/2023',
    status: 'paid',
    method: 'credit_card'
  }, {
    id: '304',
    title: 'Taxa Extra - Reforma do Playground',
    amount: 150.0,
    dueDate: '20/07/2023',
    status: 'pending'
  }];
  const violations: Violation[] = [{
    id: '401',
    title: 'Barulho excessivo após 22h',
    description: 'Reclamações de vizinhos sobre barulho excessivo vindo do apartamento após o horário permitido.',
    date: '05/05/2023',
    status: 'resolved',
    severity: 'medium'
  }, {
    id: '402',
    title: 'Estacionamento em vaga não designada',
    description: 'Veículo estacionado em vaga de outro morador sem autorização.',
    date: '20/04/2023',
    status: 'acknowledged',
    severity: 'low'
  }];
  const communications: Communication[] = [{
    id: '501',
    type: 'message',
    title: 'Resposta sobre solicitação de manutenção',
    content: 'Prezado morador, informamos que sua solicitação de manutenção do ar condicionado foi agendada para o dia 25/06/2023 no período da manhã.',
    date: '20/06/2023',
    read: true,
    direction: 'incoming'
  }, {
    id: '502',
    type: 'report',
    title: 'Vazamento no banheiro',
    content: 'Estou com um vazamento no banheiro que está afetando o apartamento de baixo. Preciso de assistência urgente.',
    date: '18/06/2023',
    read: true,
    direction: 'outgoing'
  }, {
    id: '503',
    type: 'notification',
    title: 'Lembrete de Assembleia',
    content: 'Lembramos que a assembleia geral de condomínio ocorrerá no próximo domingo às 10h no salão de festas.',
    date: '15/06/2023',
    read: false,
    direction: 'incoming'
  }, {
    id: '504',
    type: 'request',
    title: 'Solicitação de reserva do salão de festas',
    content: 'Solicito a reserva do salão de festas para o dia 30/07/2023 para comemoração de aniversário.',
    date: '10/06/2023',
    read: true,
    direction: 'outgoing'
  }];
  const timelineEvents: TimelineEvent[] = [{
    id: '601',
    type: 'move_in',
    title: 'Mudança para o condomínio',
    description: 'Registro inicial como morador do apartamento 302A.',
    date: '15/03/2022',
    icon: Home,
    iconColor: 'text-blue-500'
  }, {
    id: '602',
    type: 'document',
    title: 'Documentos cadastrados',
    description: 'Documentos pessoais e contrato registrados no sistema.',
    date: '16/03/2022',
    icon: FileText,
    iconColor: 'text-purple-500'
  }, {
    id: '603',
    type: 'access',
    title: 'Cartão de acesso emitido',
    description: 'Cartão de acesso AC12345 emitido e entregue.',
    date: '17/03/2022',
    icon: Key,
    iconColor: 'text-green-500'
  }, {
    id: '604',
    type: 'payment',
    title: 'Primeira taxa de condomínio',
    description: 'Pagamento da primeira taxa de condomínio realizado.',
    date: '15/04/2022',
    icon: DollarSign,
    iconColor: 'text-yellow-500'
  }, {
    id: '605',
    type: 'violation',
    title: 'Notificação de barulho',
    description: 'Primeira notificação sobre barulho excessivo após 22h.',
    date: '05/05/2023',
    icon: AlertTriangle,
    iconColor: 'text-red-500'
  }];
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };
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
  const getPaymentMethodBadge = (method: string | undefined) => {
    if (!method) return null;
    switch (method) {
      case 'bank_slip':
        return <Badge variant="default">Boleto</Badge>;
      case 'credit_card':
        return <Badge variant="info">Cartão de Crédito</Badge>;
      case 'pix':
        return <Badge variant="success">PIX</Badge>;
      case 'cash':
        return <Badge variant="warning">Dinheiro</Badge>;
      default:
        return null;
    }
  };
  const getViolationSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="danger">Alta</Badge>;
      case 'medium':
        return <Badge variant="warning">Média</Badge>;
      case 'low':
        return <Badge variant="info">Baixa</Badge>;
      default:
        return null;
    }
  };
  const getViolationStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>;
      case 'acknowledged':
        return <Badge variant="info">Reconhecida</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolvida</Badge>;
      case 'disputed':
        return <Badge variant="danger">Contestada</Badge>;
      default:
        return null;
    }
  };
  const getAccessLevelBadge = (level: string) => {
    switch (level) {
      case 'full':
        return <Badge variant="success">Acesso Total</Badge>;
      case 'limited':
        return <Badge variant="warning">Acesso Limitado</Badge>;
      case 'none':
        return <Badge variant="danger">Sem Acesso</Badge>;
      default:
        return null;
    }
  };
  return <div className="space-y-6">
      <div className="flex items-center">
        <button onClick={() => navigate('/admin/residents')} className="mr-4">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Perfil do Morador
          </h1>
          <p className="text-gray-500 mt-1">
            Visualize e gerencie as informações do morador
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden mr-4">
                {resident.profileImage ? <img src={resident.profileImage} alt={resident.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                    <span className="text-white font-medium text-2xl">
                      {resident.name.charAt(0)}
                    </span>
                  </div>}
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-bold">{resident.name}</h2>
                  {getStatusBadge(resident.status)}
                </div>
                <p className="text-gray-600">
                  Apto {resident.apartment} • Bloco {resident.block} •{' '}
                  {resident.floor}º andar
                </p>
                <div className="flex space-x-3 mt-1">
                  <Badge variant={resident.type === 'owner' ? 'info' : 'default'}>
                    {resident.type === 'owner' ? 'Proprietário' : 'Inquilino'}
                  </Badge>
                  {getPaymentStatusBadge(resident.paymentStatus)}
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" leftIcon={<MessageSquare size={16} />} onClick={() => {
              // Handle send message
            }}>
                Enviar Mensagem
              </Button>
              <Button variant="outline" leftIcon={<Edit size={16} />} onClick={() => navigate(`/admin/residents/${id}/edit`)}>
                Editar
              </Button>
              <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" leftIcon={<AlertTriangle size={16} />} onClick={() => setShowDeactivateConfirm(true)}>
                Desativar
              </Button>
            </div>
          </div>
        </div>

        <div className="border-b">
          <div className="flex overflow-x-auto">
            <button className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'personal' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('personal')}>
              Informações Pessoais
            </button>
            <button className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'payments' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('payments')}>
              Histórico de Pagamentos
            </button>
            <button className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'violations' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('violations')}>
              Ocorrências
            </button>
            <button className={`px-6 py-3 font-medium text-sm whitespace-nowrap ${activeTab === 'communications' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('communications')}>
              Comunicações
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'personal' && <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader title="Informações de Contato" />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Nome Completo</p>
                          <p>{resident.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Mail size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p>{resident.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Phone size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Telefone</p>
                          <p>{resident.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <FileText size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">CPF</p>
                          <p>{resident.cpf}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Data de Nascimento
                          </p>
                          <p>{resident.birthDate}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader title="Informações do Apartamento" />
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Home size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Unidade</p>
                          <p>
                            Apartamento {resident.apartment}, Bloco{' '}
                            {resident.block}, {resident.floor}º andar
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Calendar size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Data de Mudança
                          </p>
                          <p>{resident.moveInDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <User size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">Tipo</p>
                          <p>
                            {resident.type === 'owner' ? 'Proprietário' : 'Inquilino'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Shield size={18} className="text-gray-400 mr-3" />
                        <div>
                          <p className="text-sm text-gray-500">
                            Status do Pagamento
                          </p>
                          <div className="flex items-center mt-1">
                            {resident.paymentStatus === 'current' ? <CheckCircle size={16} className="text-green-500 mr-1" /> : resident.paymentStatus === 'late' ? <Clock size={16} className="text-yellow-500 mr-1" /> : <AlertTriangle size={16} className="text-red-500 mr-1" />}
                            <span>
                              {resident.paymentStatus === 'current' ? 'Em dia' : resident.paymentStatus === 'late' ? 'Atrasado' : 'Inadimplente'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleSection('familyMembers')}>
                  <h3 className="text-lg font-medium">Membros da Família</h3>
                  {expandedSections.familyMembers ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </div>
                {expandedSections.familyMembers && <CardContent>
                    <div className="space-y-4">
                      {familyMembers.map(member => <div key={member.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden mr-3">
                              {member.profileImage ? <img src={member.profileImage} alt={member.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                                  <span className="text-white font-medium">
                                    {member.name.charAt(0)}
                                  </span>
                                </div>}
                            </div>
                            <div>
                              <p className="font-medium">{member.name}</p>
                              <p className="text-sm text-gray-500">
                                {member.relationship}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {getAccessLevelBadge(member.accessLevel)}
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Edit size={16} className="text-gray-500" />
                            </button>
                          </div>
                        </div>)}
                      <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={() => {
                  // Handle add family member
                }}>
                        Adicionar Membro
                      </Button>
                    </div>
                  </CardContent>}
              </Card>
              <Card>
                <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleSection('vehicles')}>
                  <h3 className="text-lg font-medium">Veículos</h3>
                  {expandedSections.vehicles ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </div>
                {expandedSections.vehicles && <CardContent>
                    <div className="space-y-4">
                      {vehicles.map(vehicle => <div key={vehicle.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                              <Car size={20} className="text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{vehicle.model}</p>
                              <div className="flex items-center text-sm text-gray-500 space-x-2">
                                <span>Placa: {vehicle.plate}</span>
                                <span>•</span>
                                <span>Cor: {vehicle.color}</span>
                                <span>•</span>
                                <span>Vaga: {vehicle.parkingSpot}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={vehicle.type === 'car' ? 'info' : vehicle.type === 'motorcycle' ? 'warning' : 'default'}>
                              {vehicle.type === 'car' ? 'Carro' : vehicle.type === 'motorcycle' ? 'Moto' : 'Outro'}
                            </Badge>
                            <button className="p-1 hover:bg-gray-100 rounded">
                              <Edit size={16} className="text-gray-500" />
                            </button>
                          </div>
                        </div>)}
                      <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={() => {
                  // Handle add vehicle
                }}>
                        Adicionar Veículo
                      </Button>
                    </div>
                  </CardContent>}
              </Card>
              <Card>
                <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleSection('access')}>
                  <h3 className="text-lg font-medium">Acesso</h3>
                  {expandedSections.access ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </div>
                {expandedSections.access && <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium mb-2">
                          Credenciais de Acesso
                        </h4>
                        <div className="space-y-3">
                          <div className="flex items-center">
                            <Key size={18} className="text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Cartão de Acesso
                              </p>
                              <p>{resident.accessCard}</p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Shield size={18} className="text-gray-400 mr-3" />
                            <div>
                              <p className="text-sm text-gray-500">
                                Controle Remoto
                              </p>
                              <p>{resident.hasRemoteControl ? 'Sim' : 'Não'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Áreas Permitidas</h4>
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <input type="checkbox" id="pool" checked={true} readOnly className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                            <label htmlFor="pool" className="ml-2 block text-sm text-gray-700">
                              Piscina
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="gym" checked={true} readOnly className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                            <label htmlFor="gym" className="ml-2 block text-sm text-gray-700">
                              Academia
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="partyRoom" checked={true} readOnly className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                            <label htmlFor="partyRoom" className="ml-2 block text-sm text-gray-700">
                              Salão de Festas
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input type="checkbox" id="bbqArea" checked={true} readOnly className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" />
                            <label htmlFor="bbqArea" className="ml-2 block text-sm text-gray-700">
                              Churrasqueira
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>}
              </Card>
              <Card>
                <div className="flex justify-between items-center p-4 cursor-pointer" onClick={() => toggleSection('documents')}>
                  <h3 className="text-lg font-medium">Documentos</h3>
                  {expandedSections.documents ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                </div>
                {expandedSections.documents && <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText size={20} className="text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">
                              Documento de Identidade
                            </p>
                            <p className="text-sm text-gray-500">
                              Enviado em 16/03/2022
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Visualizar
                        </Button>
                      </div>
                      <div className="p-3 border rounded-lg flex justify-between items-center">
                        <div className="flex items-center">
                          <FileText size={20} className="text-gray-500 mr-3" />
                          <div>
                            <p className="font-medium">
                              Comprovante de Residência
                            </p>
                            <p className="text-sm text-gray-500">
                              Enviado em 16/03/2022
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          Visualizar
                        </Button>
                      </div>
                      <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={() => {
                  // Handle add document
                }}>
                        Adicionar Documento
                      </Button>
                    </div>
                  </CardContent>}
              </Card>
              <Card>
                <CardHeader title="Linha do Tempo" />
                <CardContent>
                  <div className="relative border-l-2 border-gray-200 ml-3 pl-8 space-y-6">
                    {timelineEvents.map(event => <div key={event.id} className="relative">
                        <div className="absolute -left-10 mt-1.5">
                          <div className={`w-6 h-6 rounded-full ${event.iconColor === 'text-blue-500' ? 'bg-blue-100' : event.iconColor === 'text-green-500' ? 'bg-green-100' : event.iconColor === 'text-yellow-500' ? 'bg-yellow-100' : event.iconColor === 'text-red-500' ? 'bg-red-100' : event.iconColor === 'text-purple-500' ? 'bg-purple-100' : 'bg-gray-100'} flex items-center justify-center`}>
                            <event.icon size={14} className={event.iconColor} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between">
                            <h4 className="font-medium">{event.title}</h4>
                            <p className="text-sm text-gray-500">
                              {event.date}
                            </p>
                          </div>
                          <p className="text-gray-600">{event.description}</p>
                        </div>
                      </div>)}
                  </div>
                </CardContent>
              </Card>
            </div>}
          {activeTab === 'payments' && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Histórico de Pagamentos</h3>
                <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={() => {
              // Handle add payment
            }}>
                  Registrar Pagamento
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vencimento
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pagamento
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Método
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.map(payment => <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {payment.title}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            R$ {payment.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.dueDate}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.paymentDate || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {payment.status === 'paid' ? <Badge variant="success">Pago</Badge> : payment.status === 'pending' ? <Badge variant="warning">Pendente</Badge> : <Badge variant="danger">Atrasado</Badge>}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {getPaymentMethodBadge(payment.method)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Button variant="outline" size="sm" onClick={() => {
                      // Handle view payment details
                    }}>
                            Detalhes
                          </Button>
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="font-medium mb-2">Resumo Financeiro</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-white rounded border">
                    <p className="text-sm text-gray-500">Total Pago (2023)</p>
                    <p className="text-lg font-medium">R$ 1.350,00</p>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <p className="text-sm text-gray-500">Pendente</p>
                    <p className="text-lg font-medium">R$ 150,00</p>
                  </div>
                  <div className="p-3 bg-white rounded border">
                    <p className="text-sm text-gray-500">
                      Histórico de Atrasos
                    </p>
                    <p className="text-lg font-medium">0 meses</p>
                  </div>
                </div>
              </div>
            </div>}
          {activeTab === 'violations' && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Ocorrências e Infrações</h3>
                <Button variant="outline" size="sm" leftIcon={<Plus size={16} />} onClick={() => {
              // Handle add violation
            }}>
                  Registrar Ocorrência
                </Button>
              </div>
              <div className="space-y-4">
                {violations.map(violation => <Card key={violation.id}>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{violation.title}</h4>
                            {getViolationSeverityBadge(violation.severity)}
                          </div>
                          <p className="text-sm text-gray-500">
                            {violation.date}
                          </p>
                        </div>
                        <div>{getViolationStatusBadge(violation.status)}</div>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {violation.description}
                      </p>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" size="sm" onClick={() => {
                    // Handle edit violation
                  }}>
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                    // Handle view violation details
                  }}>
                          Detalhes
                        </Button>
                      </div>
                    </div>
                  </Card>)}
                {violations.length === 0 && <div className="text-center py-10">
                    <CheckCircle size={48} className="mx-auto text-green-300 mb-3" />
                    <h3 className="text-lg font-medium text-gray-700">
                      Sem Ocorrências
                    </h3>
                    <p className="text-gray-500">
                      Este morador não possui ocorrências registradas
                    </p>
                  </div>}
              </div>
            </div>}
          {activeTab === 'communications' && <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Comunicações</h3>
                <Button variant="outline" size="sm" leftIcon={<MessageSquare size={16} />} onClick={() => {
              // Handle send message
            }}>
                  Nova Mensagem
                </Button>
              </div>
              <div className="space-y-4">
                {communications.map(communication => <Card key={communication.id}>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">
                              {communication.title}
                            </h4>
                            <Badge variant={communication.type === 'message' ? 'info' : communication.type === 'notification' ? 'default' : communication.type === 'report' ? 'warning' : 'success'}>
                              {communication.type === 'message' ? 'Mensagem' : communication.type === 'notification' ? 'Notificação' : communication.type === 'report' ? 'Ocorrência' : 'Solicitação'}
                            </Badge>
                            {!communication.read && <Badge variant="danger">Não lida</Badge>}
                          </div>
                          <p className="text-sm text-gray-500">
                            {communication.date}
                          </p>
                        </div>
                        <div>
                          <Badge variant={communication.direction === 'incoming' ? 'default' : 'info'}>
                            {communication.direction === 'incoming' ? 'Recebida' : 'Enviada'}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-3">
                        {communication.content}
                      </p>
                      <div className="flex justify-end">
                        {communication.direction === 'incoming' && <Button variant="outline" size="sm" leftIcon={<MessageSquare size={16} />} onClick={() => {
                    // Handle reply
                  }}>
                            Responder
                          </Button>}
                      </div>
                    </div>
                  </Card>)}
              </div>
            </div>}
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" className="text-red-500 border-red-500 hover:bg-red-50" leftIcon={<Trash size={16} />} onClick={() => setShowDeleteConfirm(true)}>
          Excluir Morador
        </Button>
        <Button onClick={() => navigate('/admin/residents')} variant="outline">
          Voltar para a Lista
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-red-500 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">
                Confirmar exclusão
              </h3>
            </div>
            <p className="mb-6 text-gray-600">
              Tem certeza que deseja excluir permanentemente o registro de{' '}
              <strong>{resident.name}</strong>? Esta ação não pode ser desfeita.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeleteConfirm(false)}>
                Cancelar
              </Button>
              <Button variant="outline" className="bg-red-500 text-white border-red-500 hover:bg-red-600" onClick={() => {
            // Handle delete resident
            navigate('/admin/residents');
          }}>
                Excluir Permanentemente
              </Button>
            </div>
          </div>
        </div>}

      {/* Deactivate Confirmation Modal */}
      {showDeactivateConfirm && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex items-center mb-4">
              <AlertTriangle size={24} className="text-yellow-500 mr-3" />
              <h3 className="text-lg font-medium text-gray-900">
                Confirmar desativação
              </h3>
            </div>
            <p className="mb-6 text-gray-600">
              Tem certeza que deseja desativar o morador{' '}
              <strong>{resident.name}</strong>? Isso bloqueará o acesso ao
              aplicativo e às áreas comuns.
            </p>
            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowDeactivateConfirm(false)}>
                Cancelar
              </Button>
              <Button variant="outline" className="bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600" onClick={() => {
            // Handle deactivate resident
            setShowDeactivateConfirm(false);
          }}>
                Desativar Morador
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};