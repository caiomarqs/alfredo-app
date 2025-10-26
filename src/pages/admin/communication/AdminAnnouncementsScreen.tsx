import React, { useState } from 'react';
import { Plus, Search, Filter, ChevronDown, ChevronUp, X, Edit, Trash, Eye, Calendar, Users, MessageCircle, Bell, Send } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  target: 'all' | 'block_a' | 'block_b' | 'owners' | 'tenants';
  priority: 'normal' | 'high' | 'urgent';
  status: 'draft' | 'published' | 'scheduled';
  scheduledDate?: string;
  readCount: number;
  commentCount: number;
}
export const AdminAnnouncementsScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'published' | 'drafts' | 'scheduled'>('all');
  const [showNewAnnouncementModal, setShowNewAnnouncementModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedAnnouncement, setExpandedAnnouncement] = useState<number | null>(null);
  const announcements: Announcement[] = [{
    id: 1,
    title: 'Manutenção na piscina',
    content: 'Informamos que a piscina estará fechada para manutenção nos dias 20 e 21 de junho. Agradecemos a compreensão.',
    date: '15/06/2023',
    author: 'Admin',
    target: 'all',
    priority: 'normal',
    status: 'published',
    readCount: 45,
    commentCount: 3
  }, {
    id: 2,
    title: 'Assembleia de condomínio',
    content: 'Convocamos todos os moradores para a assembleia geral que acontecerá no dia 25/06/2023 às 19h no salão de festas.',
    date: '14/06/2023',
    author: 'Admin',
    target: 'all',
    priority: 'high',
    status: 'published',
    readCount: 32,
    commentCount: 5
  }, {
    id: 3,
    title: 'Alteração no horário da academia',
    content: 'A partir do dia 01/07, a academia funcionará das 6h às 22h todos os dias.',
    date: '16/06/2023',
    author: 'Admin',
    target: 'all',
    priority: 'normal',
    status: 'scheduled',
    scheduledDate: '25/06/2023',
    readCount: 0,
    commentCount: 0
  }, {
    id: 4,
    title: 'Rascunho - Normas de uso do elevador',
    content: 'Este é um rascunho das novas normas de uso do elevador que será publicado após revisão.',
    date: '12/06/2023',
    author: 'Admin',
    target: 'all',
    priority: 'normal',
    status: 'draft',
    readCount: 0,
    commentCount: 0
  }, {
    id: 5,
    title: 'URGENTE: Vazamento de gás',
    content: 'Detectamos um vazamento de gás no bloco A. Por favor, evacue o prédio imediatamente e aguarde instruções.',
    date: '10/06/2023',
    author: 'Admin',
    target: 'block_a',
    priority: 'urgent',
    status: 'published',
    readCount: 28,
    commentCount: 12
  }];
  const toggleAnnouncementExpand = (id: number) => {
    setExpandedAnnouncement(expandedAnnouncement === id ? null : id);
  };
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="danger">Urgente</Badge>;
      case 'high':
        return <Badge variant="warning">Alta</Badge>;
      case 'normal':
        return <Badge variant="default">Normal</Badge>;
      default:
        return null;
    }
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="success">Publicado</Badge>;
      case 'draft':
        return <Badge variant="default">Rascunho</Badge>;
      case 'scheduled':
        return <Badge variant="info">Agendado</Badge>;
      default:
        return null;
    }
  };
  const getTargetLabel = (target: string) => {
    switch (target) {
      case 'all':
        return 'Todos os moradores';
      case 'block_a':
        return 'Bloco A';
      case 'block_b':
        return 'Bloco B';
      case 'owners':
        return 'Proprietários';
      case 'tenants':
        return 'Inquilinos';
      default:
        return target;
    }
  };
  const filteredAnnouncements = announcements.filter(announcement => {
    // Filter by tab
    if (activeTab !== 'all' && announcement.status !== activeTab) {
      return false;
    }
    // Filter by search term
    if (searchTerm && !announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) && !announcement.content.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });
  return <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Avisos</h1>
          <p className="text-gray-500 mt-1">
            Gerenciamento de comunicações com os moradores
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button leftIcon={<Plus size={16} />} onClick={() => setShowNewAnnouncementModal(true)}>
            Novo Aviso
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
                <input type="search" className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]" placeholder="Buscar avisos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
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
                  <option value="normal">Normal</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destinatários
                </label>
                <select className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#4A90E2] focus:border-[#4A90E2]">
                  <option value="all">Todos</option>
                  <option value="block_a">Bloco A</option>
                  <option value="block_b">Bloco B</option>
                  <option value="owners">Proprietários</option>
                  <option value="tenants">Inquilinos</option>
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
                  <option value="title">Título</option>
                </select>
              </div>
            </div>}
        </CardContent>
      </Card>

      {/* Tabs */}
      <div className="flex overflow-x-auto bg-white rounded-lg border border-gray-200">
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'all' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('all')}>
          Todos
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'published' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('published')}>
          Publicados
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'drafts' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('drafts')}>
          Rascunhos
        </button>
        <button className={`px-4 py-3 font-medium text-sm whitespace-nowrap flex-1 ${activeTab === 'scheduled' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500 hover:text-gray-700'}`} onClick={() => setActiveTab('scheduled')}>
          Agendados
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length > 0 ? filteredAnnouncements.map(announcement => <Card key={announcement.id} className="overflow-hidden">
              <div className="p-4 cursor-pointer" onClick={() => toggleAnnouncementExpand(announcement.id)}>
                <div className="flex flex-col md:flex-row justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-full ${announcement.priority === 'urgent' ? 'bg-red-100' : announcement.priority === 'high' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                      <Bell size={20} className={announcement.priority === 'urgent' ? 'text-red-500' : announcement.priority === 'high' ? 'text-yellow-500' : 'text-[#4A90E2]'} />
                    </div>
                    <div>
                      <div className="flex items-center flex-wrap gap-2">
                        <h3 className="font-medium text-lg">
                          {announcement.title}
                        </h3>
                        {getPriorityBadge(announcement.priority)}
                        {getStatusBadge(announcement.status)}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {announcement.date} • {announcement.author}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Eye size={16} className="mr-1" />
                      <span>{announcement.readCount}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <MessageCircle size={16} className="mr-1" />
                      <span>{announcement.commentCount}</span>
                    </div>
                    <div>
                      {expandedAnnouncement === announcement.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </div>
                  </div>
                </div>
              </div>
              {expandedAnnouncement === announcement.id && <div className="px-4 pb-4 pt-2 border-t border-gray-100">
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Conteúdo</h4>
                    <p className="text-gray-700 whitespace-pre-wrap">
                      {announcement.content}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium mb-2">Detalhes</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span>{getStatusBadge(announcement.status)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Destinatários:</span>
                          <span>{getTargetLabel(announcement.target)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            Data de Criação:
                          </span>
                          <span>{announcement.date}</span>
                        </div>
                        {announcement.status === 'scheduled' && announcement.scheduledDate && <div className="flex justify-between">
                              <span className="text-gray-500">
                                Data de Publicação:
                              </span>
                              <span>{announcement.scheduledDate}</span>
                            </div>}
                        <div className="flex justify-between">
                          <span className="text-gray-500">Prioridade:</span>
                          <span>{getPriorityBadge(announcement.priority)}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Ações</h4>
                      <div className="space-y-2">
                        {announcement.status === 'draft' ? <Button variant="primary" size="sm" className="w-full mb-2" leftIcon={<Send size={16} />}>
                            Publicar
                          </Button> : announcement.status === 'scheduled' ? <Button variant="primary" size="sm" className="w-full mb-2" leftIcon={<Send size={16} />}>
                            Publicar Agora
                          </Button> : null}
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
                  <div>
                    <h4 className="font-medium mb-2">Estatísticas</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Leituras
                          </span>
                          <span className="font-medium">
                            {announcement.readCount}
                          </span>
                        </div>
                        {announcement.status === 'published' && <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                            <div className="h-2 bg-green-500 rounded-full" style={{
                    width: `${Math.min(announcement.readCount / 100 * 100, 100)}%`
                  }}></div>
                          </div>}
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Comentários
                          </span>
                          <span className="font-medium">
                            {announcement.commentCount}
                          </span>
                        </div>
                      </div>
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Destinatários
                          </span>
                          <span className="font-medium">
                            {announcement.target === 'all' ? '100' : '50'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>}
            </Card>) : <Card className="py-12">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <Bell size={32} className="text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Nenhum aviso encontrado
              </h3>
              <p className="text-gray-500 mb-4">
                Não foram encontrados avisos com os filtros atuais.
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

      {/* New Announcement Modal */}
      {showNewAnnouncementModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg max-h-[90vh] overflow-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-medium">Novo Aviso</h3>
              <button onClick={() => setShowNewAnnouncementModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Título *
                </label>
                <input type="text" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" placeholder="Título do aviso" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Conteúdo *
                </label>
                <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] min-h-[150px]" placeholder="Escreva o conteúdo do aviso..."></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prioridade *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                    <option value="normal">Normal</option>
                    <option value="high">Alta</option>
                    <option value="urgent">Urgente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Destinatários *
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]">
                    <option value="all">Todos os moradores</option>
                    <option value="block_a">Bloco A</option>
                    <option value="block_b">Bloco B</option>
                    <option value="owners">Proprietários</option>
                    <option value="tenants">Inquilinos</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Publicação
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="radio" id="publish_now" name="publish_option" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300" defaultChecked />
                    <label htmlFor="publish_now" className="ml-2 text-sm text-gray-700">
                      Publicar imediatamente
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="schedule" name="publish_option" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300" />
                    <label htmlFor="schedule" className="ml-2 text-sm text-gray-700">
                      Agendar publicação
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input type="radio" id="save_draft" name="publish_option" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300" />
                    <label htmlFor="save_draft" className="ml-2 text-sm text-gray-700">
                      Salvar como rascunho
                    </label>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Publicação
                </label>
                <input type="datetime-local" className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2]" disabled />
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="send_notification" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" defaultChecked />
                <label htmlFor="send_notification" className="ml-2 text-sm text-gray-700">
                  Enviar notificação push aos destinatários
                </label>
              </div>
              <div className="flex items-center">
                <input type="checkbox" id="allow_comments" className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300 rounded" defaultChecked />
                <label htmlFor="allow_comments" className="ml-2 text-sm text-gray-700">
                  Permitir comentários
                </label>
              </div>
            </div>
            <div className="p-4 border-t flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowNewAnnouncementModal(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setShowNewAnnouncementModal(false)}>
                Criar Aviso
              </Button>
            </div>
          </div>
        </div>}
    </div>;
};