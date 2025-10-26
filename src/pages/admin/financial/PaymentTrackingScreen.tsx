import React, { useState } from 'react';
import { Search, Filter, Download, Calendar, DollarSign, CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronUp, User, Home, ArrowRight, Plus } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
interface Payment {
  id: number;
  residentId: number;
  residentName: string;
  apartment: string;
  amount: number;
  dueDate: string;
  paymentDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: 'bank_slip' | 'credit_card' | 'pix' | 'cash';
  description: string;
}
interface Resident {
  id: number;
  name: string;
  apartment: string;
  paymentStatus: 'current' | 'late' | 'overdue';
  pendingAmount: number;
  lastPaymentDate?: string;
}
export const PaymentTrackingScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'summary' | 'residents' | 'payments'>('summary');
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('Junho 2023');
  const [expandedResident, setExpandedResident] = useState<number | null>(null);
  // Mock data for payments
  const payments: Payment[] = [{
    id: 1,
    residentId: 101,
    residentName: 'João Silva',
    apartment: '302A',
    amount: 450.0,
    dueDate: '15/06/2023',
    paymentDate: '12/06/2023',
    status: 'paid',
    paymentMethod: 'pix',
    description: 'Taxa de Condomínio - Junho/2023'
  }, {
    id: 2,
    residentId: 102,
    residentName: 'Maria Santos',
    apartment: '101B',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'pending',
    description: 'Taxa de Condomínio - Junho/2023'
  }, {
    id: 3,
    residentId: 103,
    residentName: 'Carlos Oliveira',
    apartment: '203C',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'overdue',
    description: 'Taxa de Condomínio - Junho/2023'
  }, {
    id: 4,
    residentId: 101,
    residentName: 'João Silva',
    apartment: '302A',
    amount: 150.0,
    dueDate: '20/06/2023',
    paymentDate: '18/06/2023',
    status: 'paid',
    paymentMethod: 'credit_card',
    description: 'Taxa Extra - Reforma do Playground'
  }, {
    id: 5,
    residentId: 104,
    residentName: 'Ana Costa',
    apartment: '104B',
    amount: 150.0,
    dueDate: '20/06/2023',
    status: 'pending',
    description: 'Taxa Extra - Reforma do Playground'
  }, {
    id: 6,
    residentId: 105,
    residentName: 'Roberto Almeida',
    apartment: '401A',
    amount: 450.0,
    dueDate: '15/05/2023',
    status: 'overdue',
    description: 'Taxa de Condomínio - Maio/2023'
  }];
  // Mock data for residents
  const residents: Resident[] = [{
    id: 101,
    name: 'João Silva',
    apartment: '302A',
    paymentStatus: 'current',
    pendingAmount: 0,
    lastPaymentDate: '12/06/2023'
  }, {
    id: 102,
    name: 'Maria Santos',
    apartment: '101B',
    paymentStatus: 'current',
    pendingAmount: 450.0,
    lastPaymentDate: '15/05/2023'
  }, {
    id: 103,
    name: 'Carlos Oliveira',
    apartment: '203C',
    paymentStatus: 'late',
    pendingAmount: 450.0,
    lastPaymentDate: '15/05/2023'
  }, {
    id: 104,
    name: 'Ana Costa',
    apartment: '104B',
    paymentStatus: 'current',
    pendingAmount: 150.0,
    lastPaymentDate: '15/06/2023'
  }, {
    id: 105,
    name: 'Roberto Almeida',
    apartment: '401A',
    paymentStatus: 'overdue',
    pendingAmount: 900.0,
    lastPaymentDate: '15/04/2023'
  }, {
    id: 106,
    name: 'Patricia Lima',
    apartment: '502B',
    paymentStatus: 'current',
    pendingAmount: 0,
    lastPaymentDate: '10/06/2023'
  }];
  const toggleResidentExpand = (id: number) => {
    setExpandedResident(expandedResident === id ? null : id);
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="success">Pago</Badge>;
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>;
      case 'overdue':
        return <Badge variant="danger">Atrasado</Badge>;
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
  const filteredResidents = residents.filter(resident => {
    if (searchTerm && !resident.name.toLowerCase().includes(searchTerm.toLowerCase()) && !resident.apartment.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  const filteredPayments = payments.filter(payment => {
    if (searchTerm && !payment.residentName.toLowerCase().includes(searchTerm.toLowerCase()) && !payment.apartment.toLowerCase().includes(searchTerm.toLowerCase()) && !payment.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  // Calculate summary statistics
  const summaryStats = {
    totalResidents: residents.length,
    totalBilled: payments.reduce((sum, payment) => sum + payment.amount, 0),
    totalPaid: payments.filter(payment => payment.status === 'paid').reduce((sum, payment) => sum + payment.amount, 0),
    totalPending: payments.filter(payment => payment.status === 'pending').reduce((sum, payment) => sum + payment.amount, 0),
    totalOverdue: payments.filter(payment => payment.status === 'overdue').reduce((sum, payment) => sum + payment.amount, 0),
    residentsInGoodStanding: residents.filter(resident => resident.paymentStatus === 'current').length,
    residentsLate: residents.filter(resident => resident.paymentStatus === 'late').length,
    residentsOverdue: residents.filter(resident => resident.paymentStatus === 'overdue').length
  };
  const paymentsByStatus = {
    paid: payments.filter(payment => payment.status === 'paid').length,
    pending: payments.filter(payment => payment.status === 'pending').length,
    overdue: payments.filter(payment => payment.status === 'overdue').length
  };
  const residentPayments = (residentId: number) => {
    return payments.filter(payment => payment.residentId === residentId);
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Acompanhamento de Pagamentos
          </h1>
          <p className="text-gray-500 mt-1">
            Monitoramento de pagamentos e status dos moradores
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" leftIcon={<Calendar size={16} />}>
            {selectedMonth} <ChevronDown size={16} className="ml-1" />
          </Button>
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Exportar
          </Button>
          <Button leftIcon={<Plus size={16} />}>Nova Cobrança</Button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex overflow-x-auto bg-white rounded-lg border border-gray-200">
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'summary' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('summary')}>
          Resumo
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'residents' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('residents')}>
          Moradores
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'payments' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('payments')}>
          Pagamentos
        </button>
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
                <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder={activeTab === 'residents' ? 'Buscar por nome ou apartamento...' : 'Buscar por morador, apartamento ou descrição...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
                  Status
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="all">Todos</option>
                  <option value="paid">Pagos</option>
                  <option value="pending">Pendentes</option>
                  <option value="overdue">Atrasados</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Período
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="current_month">Mês Atual</option>
                  <option value="last_month">Mês Anterior</option>
                  <option value="last_3_months">Últimos 3 Meses</option>
                  <option value="last_6_months">Últimos 6 Meses</option>
                  <option value="custom">Personalizado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordenar por
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="due_date_desc">
                    Data de Vencimento (mais recente)
                  </option>
                  <option value="due_date_asc">
                    Data de Vencimento (mais antiga)
                  </option>
                  <option value="amount_desc">Valor (maior)</option>
                  <option value="amount_asc">Valor (menor)</option>
                  <option value="apartment">Apartamento</option>
                  <option value="name">Nome do Morador</option>
                </select>
              </div>
            </div>}
        </CardContent>
      </Card>
      {/* Content based on active tab */}
      {activeTab === 'summary' && <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-blue-100 mr-4">
                    <DollarSign size={20} className="text-[#4A90E2]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Cobrado</p>
                    <p className="text-xl font-bold">
                      R$ {summaryStats.totalBilled.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedMonth}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-green-100 mr-4">
                    <CheckCircle size={20} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Pago</p>
                    <p className="text-xl font-bold">
                      R$ {summaryStats.totalPaid.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(summaryStats.totalPaid / summaryStats.totalBilled * 100).toFixed(0)}
                      % do total
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-yellow-100 mr-4">
                    <Clock size={20} className="text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pendente</p>
                    <p className="text-xl font-bold">
                      R$ {summaryStats.totalPending.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(summaryStats.totalPending / summaryStats.totalBilled * 100).toFixed(0)}
                      % do total
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-red-100 mr-4">
                    <AlertTriangle size={20} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Em Atraso</p>
                    <p className="text-xl font-bold">
                      R$ {summaryStats.totalOverdue.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(summaryStats.totalOverdue / summaryStats.totalBilled * 100).toFixed(0)}
                      % do total
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Payment Status Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader title="Status de Pagamento por Morador" />
              <CardContent className="p-4">
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">
                          Em dia ({summaryStats.residentsInGoodStanding})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(summaryStats.residentsInGoodStanding / summaryStats.totalResidents * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: `${summaryStats.residentsInGoodStanding / summaryStats.totalResidents * 100}%`
                  }}></div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">
                          Atrasado ({summaryStats.residentsLate})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(summaryStats.residentsLate / summaryStats.totalResidents * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                    width: `${summaryStats.residentsLate / summaryStats.totalResidents * 100}%`
                  }}></div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">
                          Inadimplente ({summaryStats.residentsOverdue})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(summaryStats.residentsOverdue / summaryStats.totalResidents * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{
                    width: `${summaryStats.residentsOverdue / summaryStats.totalResidents * 100}%`
                  }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Distribuição de Pagamentos" />
              <CardContent className="p-4">
                <div className="h-64 flex items-center justify-center">
                  <div className="w-full max-w-xs">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm">
                          Pagos ({paymentsByStatus.paid})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(paymentsByStatus.paid / payments.length * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{
                    width: `${paymentsByStatus.paid / payments.length * 100}%`
                  }}></div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                        <span className="text-sm">
                          Pendentes ({paymentsByStatus.pending})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(paymentsByStatus.pending / payments.length * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{
                    width: `${paymentsByStatus.pending / payments.length * 100}%`
                  }}></div>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm">
                          Atrasados ({paymentsByStatus.overdue})
                        </span>
                      </div>
                      <span className="text-sm font-medium">
                        {(paymentsByStatus.overdue / payments.length * 100).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div className="bg-red-500 h-2.5 rounded-full" style={{
                    width: `${paymentsByStatus.overdue / payments.length * 100}%`
                  }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Recent Payments */}
          <Card>
            <CardHeader title="Pagamentos Recentes" />
            <CardContent className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Morador
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Método
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {payments.slice(0, 5).map(payment => <tr key={payment.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-sm font-medium text-gray-900">
                              {payment.residentName}
                            </div>
                            <div className="ml-2 text-sm text-gray-500">
                              ({payment.apartment})
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.description}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          R$ {payment.amount.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {payment.status === 'paid' ? payment.paymentDate : payment.dueDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(payment.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPaymentMethodBadge(payment.paymentMethod)}
                        </td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" onClick={() => setActiveTab('payments')} rightIcon={<ArrowRight size={16} />}>
                  Ver todos os pagamentos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>}
      {activeTab === 'residents' && <div className="space-y-4">
          {filteredResidents.map(resident => <Card key={resident.id} className="overflow-hidden">
              <div className="p-4 cursor-pointer" onClick={() => toggleResidentExpand(resident.id)}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-full ${resident.paymentStatus === 'current' ? 'bg-green-100' : resident.paymentStatus === 'late' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      <User size={20} className={resident.paymentStatus === 'current' ? 'text-green-500' : resident.paymentStatus === 'late' ? 'text-yellow-500' : 'text-red-500'} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{resident.name}</h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Home size={16} className="mr-1" />
                        <span>Apto {resident.apartment}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
                    <div className="text-right">
                      {resident.pendingAmount > 0 ? <>
                          <p className="font-bold">
                            R$ {resident.pendingAmount.toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-500">Pendente</p>
                        </> : <p className="font-bold text-green-500">
                          Sem pendências
                        </p>}
                    </div>
                    <div className="flex flex-col items-end">
                      {getPaymentStatusBadge(resident.paymentStatus)}
                    </div>
                    <div>
                      {expandedResident === resident.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>
              {expandedResident === resident.id && <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <h4 className="font-medium mb-3">Histórico de Pagamentos</h4>
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
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {residentPayments(resident.id).map(payment => <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.description}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              R$ {payment.amount.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.dueDate}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.paymentDate || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getStatusBadge(payment.status)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {getPaymentMethodBadge(payment.paymentMethod)}
                            </td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      Ver Perfil Completo
                    </Button>
                    <Button variant="outline" size="sm" leftIcon={<Plus size={16} />}>
                      Nova Cobrança
                    </Button>
                    {resident.pendingAmount > 0 && <Button size="sm">Registrar Pagamento</Button>}
                  </div>
                </div>}
            </Card>)}
        </div>}
      {activeTab === 'payments' && <div className="space-y-4">
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Morador
                  </th>
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
                {filteredPayments.map(payment => <tr key={payment.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="text-sm font-medium text-gray-900">
                          {payment.residentName}
                        </div>
                        <div className="ml-2 text-sm text-gray-500">
                          ({payment.apartment})
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      R$ {payment.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.dueDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {payment.paymentDate || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getPaymentMethodBadge(payment.paymentMethod)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="outline" size="sm">
                        Detalhes
                      </Button>
                    </td>
                  </tr>)}
              </tbody>
            </table>
          </div>
        </div>}
    </div>;
};