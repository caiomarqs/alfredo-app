import React, { useState } from 'react';
import { ArrowLeft, Plus, Camera, MapPin, AlertCircle, Send, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
interface Report {
  id: number;
  title: string;
  description: string;
  category: 'maintenance' | 'noise' | 'security' | 'cleaning' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  location: string;
  date: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'cancelled';
  images?: string[];
  isAnonymous: boolean;
}
export const ReportsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showNewReport, setShowNewReport] = useState(false);
  const [activeTab, setActiveTab] = useState<'active' | 'resolved'>('active');
  const [newReport, setNewReport] = useState({
    title: '',
    description: '',
    category: 'maintenance',
    priority: 'medium',
    location: '',
    isAnonymous: false,
    images: [] as string[]
  });
  const reports: Report[] = [{
    id: 1,
    title: 'Vazamento na cozinha',
    description: 'Estou com um vazamento na pia da cozinha que está afetando o apartamento de baixo.',
    category: 'maintenance',
    priority: 'high',
    location: 'Apto 302A - Cozinha',
    date: '15/06/2023 - 10:30',
    status: 'in_progress',
    images: ['https://images.unsplash.com/photo-1585400044846-a470df5b143f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'],
    isAnonymous: false
  }, {
    id: 2,
    title: 'Barulho excessivo no apto 203',
    description: 'Há muito barulho vindo do apartamento 203, especialmente após as 22h. Já é a terceira vez essa semana.',
    category: 'noise',
    priority: 'medium',
    location: 'Apto 203 - Bloco A',
    date: '14/06/2023 - 23:15',
    status: 'pending',
    isAnonymous: true
  }, {
    id: 3,
    title: 'Lâmpada queimada no corredor',
    description: 'A lâmpada do corredor do 3º andar está queimada há mais de uma semana.',
    category: 'maintenance',
    priority: 'low',
    location: '3º andar - Corredor',
    date: '10/06/2023 - 18:20',
    status: 'resolved',
    images: ['https://images.unsplash.com/photo-1621274147744-cfb5753930f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1480&q=80'],
    isAnonymous: false
  }, {
    id: 4,
    title: 'Lixo acumulado na garagem',
    description: 'Há lixo acumulado na área da garagem próximo à vaga 15, gerando mau cheiro.',
    category: 'cleaning',
    priority: 'medium',
    location: 'Garagem - Próximo à vaga 15',
    date: '08/06/2023 - 09:45',
    status: 'resolved',
    images: ['https://images.unsplash.com/photo-1605600659453-779fb7a5426a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'],
    isAnonymous: false
  }];
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'maintenance':
        return <Badge variant="warning">Manutenção</Badge>;
      case 'noise':
        return <Badge variant="danger">Barulho</Badge>;
      case 'security':
        return <Badge variant="info">Segurança</Badge>;
      case 'cleaning':
        return <Badge variant="default">Limpeza</Badge>;
      default:
        return <Badge variant="default">Outros</Badge>;
    }
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
      case 'pending':
        return <Badge variant="warning">Pendente</Badge>;
      case 'in_progress':
        return <Badge variant="info">Em andamento</Badge>;
      case 'resolved':
        return <Badge variant="success">Resolvido</Badge>;
      case 'cancelled':
        return <Badge variant="default">Cancelado</Badge>;
      default:
        return null;
    }
  };
  const getProgressBar = (status: string) => {
    let percentage = 0;
    switch (status) {
      case 'pending':
        percentage = 25;
        break;
      case 'in_progress':
        percentage = 65;
        break;
      case 'resolved':
        percentage = 100;
        break;
      default:
        percentage = 0;
    }
    return <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
        <div className={`h-1 rounded-full ${status === 'resolved' ? 'bg-green-500' : status === 'in_progress' ? 'bg-blue-500' : 'bg-yellow-500'}`} style={{
        width: `${percentage}%`
      }}></div>
      </div>;
  };
  const handleSubmitReport = () => {
    // In a real app, this would send the report to the backend
    console.log('Submitting report:', newReport);
    setShowNewReport(false);
    // Reset form
    setNewReport({
      title: '',
      description: '',
      category: 'maintenance',
      priority: 'medium',
      location: '',
      isAnonymous: false,
      images: []
    });
  };
  const filteredReports = reports.filter(report => {
    if (activeTab === 'active') {
      return report.status === 'pending' || report.status === 'in_progress';
    } else {
      return report.status === 'resolved' || report.status === 'cancelled';
    }
  });
  return <div className="p-4 pb-20">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <button onClick={() => navigate('/resident')} className="mr-2">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <h1 className="text-xl font-bold">Ocorrências</h1>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={() => setShowNewReport(true)}>
          Nova
        </Button>
      </div>
      {/* Tabs */}
      <div className="flex mb-4 border-b">
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'active' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('active')}>
          Em Andamento
        </button>
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'resolved' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('resolved')}>
          Resolvidas
        </button>
      </div>
      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.length > 0 ? filteredReports.map(report => <Card key={report.id} className="overflow-hidden">
              <CardContent className="p-0">
                {report.images && report.images.length > 0 && <div className="h-32 overflow-hidden">
                    <img src={report.images[0]} alt={report.title} className="w-full h-full object-cover" />
                  </div>}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-medium">{report.title}</h3>
                        {report.isAnonymous && <span className="text-xs text-gray-500">
                            (Anônimo)
                          </span>}
                      </div>
                      <p className="text-sm text-gray-500">{report.date}</p>
                    </div>
                    <div className="flex space-x-1">
                      {getCategoryBadge(report.category)}
                      {getPriorityBadge(report.priority)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{report.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{report.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    {getStatusBadge(report.status)}
                    {report.status !== 'cancelled' && getProgressBar(report.status)}
                  </div>
                </div>
              </CardContent>
            </Card>) : <div className="text-center py-10">
            <AlertCircle size={48} className="mx-auto text-gray-300 mb-3" />
            <h3 className="text-lg font-medium text-gray-700">
              Nenhuma ocorrência{' '}
              {activeTab === 'active' ? 'ativa' : 'resolvida'}
            </h3>
            <p className="text-gray-500">
              {activeTab === 'active' ? 'Você não possui ocorrências em andamento' : 'Você não possui ocorrências resolvidas'}
            </p>
          </div>}
      </div>
      {/* New Report Modal */}
      {showNewReport && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Nova Ocorrência</h3>
              <button onClick={() => setShowNewReport(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <Input label="Título *" placeholder="Descreva brevemente o problema" value={newReport.title} onChange={e => setNewReport({
            ...newReport,
            title: e.target.value
          })} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição *
                </label>
                <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] min-h-[100px]" placeholder="Detalhe o problema" value={newReport.description} onChange={e => setNewReport({
              ...newReport,
              description: e.target.value
            })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Categoria *
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" value={newReport.category} onChange={e => setNewReport({
              ...newReport,
              category: e.target.value as any
            })}>
                  <option value="maintenance">Manutenção</option>
                  <option value="noise">Barulho</option>
                  <option value="security">Segurança</option>
                  <option value="cleaning">Limpeza</option>
                  <option value="other">Outros</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade *
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" value={newReport.priority} onChange={e => setNewReport({
              ...newReport,
              priority: e.target.value as any
            })}>
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <Input label="Localização *" placeholder="Ex: Apto 302A - Cozinha" value={newReport.location} onChange={e => setNewReport({
            ...newReport,
            location: e.target.value
          })} leftIcon={<MapPin size={18} className="text-gray-400" />} />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fotos (opcional)
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
                <input type="checkbox" id="anonymous" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" checked={newReport.isAnonymous} onChange={e => setNewReport({
              ...newReport,
              isAnonymous: e.target.checked
            })} />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                  Reportar anonimamente
                </label>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewReport(false)}>
                Cancelar
              </Button>
              <Button leftIcon={<Send size={16} />} onClick={handleSubmitReport}>
                Enviar
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};