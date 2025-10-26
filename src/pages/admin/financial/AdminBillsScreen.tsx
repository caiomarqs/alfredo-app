import React, { useState } from 'react';
import { Plus, Search, Filter, Download, Calendar, DollarSign, CheckCircle, Clock, AlertTriangle, ChevronDown, ChevronUp, X, Edit, Trash } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
interface Bill {
  id: number;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  paidDate?: string;
  resident: string;
  apartment: string;
  paymentMethod?: 'bank_slip' | 'credit_card' | 'pix' | 'cash';
}
export const AdminBillsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'paid' | 'overdue'>('all');
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedBill, setExpandedBill] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState('Junho 2023');
  const bills: Bill[] = [{
    id: 1,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'paid',
    paidDate: '10/06/2023',
    resident: 'João Silva',
    apartment: '302A',
    paymentMethod: 'pix'
  }, {
    id: 2,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'pending',
    resident: 'Maria Santos',
    apartment: '101B'
  }, {
    id: 3,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'overdue',
    resident: 'Carlos Oliveira',
    apartment: '203C'
  }, {
    id: 4,
    title: 'Taxa Extra - Reforma',
    amount: 150.0,
    dueDate: '20/06/2023',
    status: 'paid',
    paidDate: '18/06/2023',
    resident: 'João Silva',
    apartment: '302A',
    paymentMethod: 'credit_card'
  }, {
    id: 5,
    title: 'Taxa Extra - Reforma',
    amount: 150.0,
    dueDate: '20/06/2023',
    status: 'pending',
    resident: 'Ana Costa',
    apartment: '104B'
  }];
  const toggleBillExpand = (id: number) => {
    setExpandedBill(expandedBill === id ? null : id);
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
  const filteredBills = bills.filter(bill => {
    // Filter by tab
    if (activeTab !== 'all' && bill.status !== activeTab) return false;
    // Filter by search term
    if (searchTerm && !bill.title.toLowerCase().includes(searchTerm.toLowerCase()) && !bill.resident.toLowerCase().includes(searchTerm.toLowerCase()) && !bill.apartment.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  const summaryStats = {
    totalBilled: bills.reduce((sum, bill) => sum + bill.amount, 0),
    totalPaid: bills.filter(bill => bill.status === 'paid').reduce((sum, bill) => sum + bill.amount, 0),
    totalPending: bills.filter(bill => bill.status === 'pending').reduce((sum, bill) => sum + bill.amount, 0),
    totalOverdue: bills.filter(bill => bill.status === 'overdue').reduce((sum, bill) => sum + bill.amount, 0)
  };
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Financeiro</h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de taxas e pagamentos
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button leftIcon={<Plus size={16} />} onClick={() => setShowNewBillModal(true)}>
            Nova Cobrança
          </Button>
          <Button variant="outline" leftIcon={<Download size={16} />}>
            Exportar
          </Button>
        </div>
      </div>

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
                <p className="text-xs text-gray-500 mt-1">{selectedMonth}</p>
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

      {/* Search and Filter */}
      <Card className="bg-white">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar por título, morador ou apartamento..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" leftIcon={<Calendar size={16} />} className="whitespace-nowrap">
                {selectedMonth}
              </Button>
              <Button variant="outline" size="sm" leftIcon={<Filter size={16} />} onClick={() => setShowFilters(!showFilters)} className="whitespace-nowrap">
                Filtros{' '}
                {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </Button>
            </div>
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
                  Tipo de Cobrança
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="all">Todos</option>
                  <option value="condo_fee">Taxa de Condomínio</option>
                  <option value="extra_fee">Taxa Extra</option>
                  <option value="service_fee">Taxa de Serviço</option>
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
                </select>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex overflow-x-auto bg-white rounded-lg border border-gray-200">
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'all' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('all')}>
          Todas
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'pending' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('pending')}>
          Pendentes
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'paid' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('paid')}>
          Pagas
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'overdue' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('overdue')}>
          Em Atraso
        </button>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        {filteredBills.length > 0 ? filteredBills.map(bill => <Card key={bill.id} className="overflow-hidden">
              <div className="p-4 cursor-pointer" onClick={() => toggleBillExpand(bill.id)}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-full ${bill.status === 'paid' ? 'bg-green-100' : bill.status === 'pending' ? 'bg-yellow-100' : 'bg-red-100'}`}>
                      <DollarSign size={20} className={bill.status === 'paid' ? 'text-green-500' : bill.status === 'pending' ? 'text-yellow-500' : 'text-red-500'} />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{bill.title}</h3>
                      <p className="text-sm text-gray-500">
                        Apto {bill.apartment} • {bill.resident}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-between md:justify-end gap-3">
                    <div className="text-right">
                      <p className="font-bold">R$ {bill.amount.toFixed(2)}</p>
                      <p className="text-sm text-gray-500">
                        Vence em {bill.dueDate}
                      </p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(bill.status)}
                      {bill.status === 'paid' && bill.paymentMethod && <div className="mt-1">
                          {getPaymentMethodBadge(bill.paymentMethod)}
                        </div>}
                    </div>
                    <div>
                      {expandedBill === bill.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>
              {expandedBill === bill.id && <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Detalhes da Cobrança</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Título:</span>
                          <span>{bill.title}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Valor:</span>
                          <span>R$ {bill.amount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Data de Vencimento:
                          </span>
                          <span>{bill.dueDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span>{getStatusBadge(bill.status)}</span>
                        </div>
                        {bill.status === 'paid' && bill.paidDate && <div className="flex justify-between">
                            <span className="text-gray-500">
                              Data de Pagamento:
                            </span>
                            <span>{bill.paidDate}</span>
                          </div>}
                        {bill.status === 'paid' && bill.paymentMethod && <div className="flex justify-between">
                            <span className="text-gray-500">
                              Método de Pagamento:
                            </span>
                            <span>
                              {getPaymentMethodBadge(bill.paymentMethod)}
                            </span>
                          </div>}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Ações</h4>
                      <div className="space-y-2">
                        {bill.status === 'pending' || bill.status === 'overdue' ? <>
                            <Button variant="primary" size="sm" className="w-full mb-2">
                              Registrar Pagamento
                            </Button>
                            <Button variant="outline" size="sm" className="w-full mb-2" leftIcon={<Download size={16} />}>
                              Baixar Boleto
                            </Button>
                          </> : <Button variant="outline" size="sm" className="w-full mb-2" leftIcon={<Download size={16} />}>
                            Baixar Comprovante
                          </Button>}
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1" leftIcon={<Edit size={16} />}>
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 text-red-500 border-red-500 hover:bg-red-50" leftIcon={<Trash size={16} />}>
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>) : <Card className="py-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <DollarSign size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhuma cobrança encontrada
              </h3>
              <p className="text-gray-500 mb-4">
                Não foram encontradas cobranças com os filtros atuais.
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

      {/* New Bill Modal */}
      {showNewBillModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Nova Cobrança</h3>
              <button onClick={() => setShowNewBillModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="Ex: Taxa de Condomínio - Junho/2023" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Cobrança *
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                  <option value="">Selecione o tipo</option>
                  <option value="condo_fee">Taxa de Condomínio</option>
                  <option value="extra_fee">Taxa Extra</option>
                  <option value="service_fee">Taxa de Serviço</option>
                  <option value="other">Outro</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valor (R$) *
                  </label>
                  <input type="number" step="0.01" min="0" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="0,00" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data de Vencimento *
                  </label>
                  <input type="date" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinatários *
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                  <option value="all">Todos os moradores</option>
                  <option value="specific">Moradores específicos</option>
                  <option value="block_a">Bloco A</option>
                  <option value="block_b">Bloco B</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição
                </label>
                <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] min-h-[100px]" placeholder="Detalhes adicionais sobre a cobrança..."></textarea>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="send_notification" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" defaultChecked />
                <label htmlFor="send_notification" className="ml-2 text-sm text-gray-700">
                  Enviar notificação aos moradores
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="generate_boleto" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" defaultChecked />
                <label htmlFor="generate_boleto" className="ml-2 text-sm text-gray-700">
                  Gerar boleto bancário automaticamente
                </label>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewBillModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewBillModal(false)}>
                Criar Cobrança
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};