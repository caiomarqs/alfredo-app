import React, { useState } from 'react';
import { ArrowLeft, ThumbsUp, MessageSquare, Share, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  authorImage?: string;
  category: 'general' | 'urgent' | 'financial' | 'maintenance' | 'events';
  isNew: boolean;
  likes: number;
  comments: number;
  isLiked: boolean;
  priority?: 'high' | 'medium' | 'low';
}
export const AnnouncementsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [likedAnnouncements, setLikedAnnouncements] = useState<number[]>([]);
  const announcements: Announcement[] = [{
    id: 1,
    title: 'Manutenção na piscina',
    content: 'Informamos que a piscina ficará fechada nos dias 20 e 21 de junho para manutenção e limpeza. Pedimos a compreensão de todos.',
    date: '15/06/2023 - 10:30',
    author: 'Síndico João Silva',
    authorImage: 'https://randomuser.me/api/portraits/men/41.jpg',
    category: 'maintenance',
    isNew: true,
    likes: 12,
    comments: 5,
    isLiked: false,
    priority: 'medium'
  }, {
    id: 2,
    title: 'Assembleia de condomínio',
    content: 'Convocamos todos os moradores para assembleia geral que ocorrerá no dia 30/06/2023 às 19h no salão de festas. Pauta: aprovação de orçamento para reforma do playground.',
    date: '14/06/2023 - 18:00',
    author: 'Administração',
    authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    category: 'general',
    isNew: false,
    likes: 8,
    comments: 3,
    isLiked: false
  }, {
    id: 3,
    title: 'Novo horário da portaria',
    content: 'Informamos que a partir do dia 01/07, a portaria funcionará 24 horas com dois porteiros por turno para aumentar a segurança do condomínio.',
    date: '10/06/2023 - 09:15',
    author: 'Administração',
    category: 'general',
    isNew: false,
    likes: 15,
    comments: 2,
    isLiked: true
  }, {
    id: 4,
    title: "Limpeza das caixas d'água",
    content: "No próximo sábado (24/06) será realizada a limpeza semestral das caixas d'água. O fornecimento de água será interrompido das 8h às 14h.",
    date: '08/06/2023 - 14:20',
    author: 'Síndico João Silva',
    authorImage: 'https://randomuser.me/api/portraits/men/41.jpg',
    category: 'maintenance',
    isNew: false,
    likes: 5,
    comments: 8,
    isLiked: false
  }, {
    id: 5,
    title: 'Reajuste da taxa condominial',
    content: 'Comunicamos que a partir do próximo mês, a taxa de condomínio será reajustada em 5% conforme aprovado na última assembleia.',
    date: '05/06/2023 - 11:30',
    author: 'Administração',
    authorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
    category: 'financial',
    isNew: false,
    likes: 3,
    comments: 12,
    isLiked: false
  }, {
    id: 6,
    title: 'Festa junina do condomínio',
    content: 'Convidamos todos os moradores para a festa junina que será realizada no dia 29/06 a partir das 18h na área de lazer. Traga sua família!',
    date: '01/06/2023 - 16:45',
    author: 'Comissão de Eventos',
    category: 'events',
    isNew: false,
    likes: 25,
    comments: 10,
    isLiked: true,
    priority: 'low'
  }, {
    id: 7,
    title: 'URGENTE: Vazamento de gás no Bloco B',
    content: 'Detectamos um possível vazamento de gás no bloco B. Técnicos já foram chamados. Por favor, evite utilizar elevadores e mantenha janelas abertas.',
    date: '01/06/2023 - 08:10',
    author: 'Administração',
    authorImage: 'https://randomuser.me/api/portraits/men/41.jpg',
    category: 'urgent',
    isNew: false,
    likes: 0,
    comments: 18,
    isLiked: false,
    priority: 'high'
  }];
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'urgent':
        return <Badge variant="danger">Urgente</Badge>;
      case 'financial':
        return <Badge variant="warning">Financeiro</Badge>;
      case 'maintenance':
        return <Badge variant="info">Manutenção</Badge>;
      case 'events':
        return <Badge variant="success">Eventos</Badge>;
      default:
        return <Badge variant="default">Geral</Badge>;
    }
  };
  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    switch (priority) {
      case 'high':
        return <Badge variant="danger">Alta Prioridade</Badge>;
      case 'medium':
        return <Badge variant="warning">Média Prioridade</Badge>;
      case 'low':
        return <Badge variant="info">Baixa Prioridade</Badge>;
      default:
        return null;
    }
  };
  const handleLike = (id: number) => {
    if (likedAnnouncements.includes(id)) {
      setLikedAnnouncements(likedAnnouncements.filter(announcementId => announcementId !== id));
    } else {
      setLikedAnnouncements([...likedAnnouncements, id]);
    }
  };
  const filteredAnnouncements = activeCategory ? announcements.filter(announcement => announcement.category === activeCategory) : announcements;
  return <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/resident')} className="mr-2">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Avisos</h1>
      </div>

      {/* Filter tabs */}
      <div className="flex overflow-x-auto pb-2 mb-4 -mx-4 px-4">
        <button className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeCategory === null ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveCategory(null)}>
          Todos
        </button>
        <button className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeCategory === 'urgent' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveCategory('urgent')}>
          Urgente
        </button>
        <button className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeCategory === 'financial' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveCategory('financial')}>
          Financeiro
        </button>
        <button className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeCategory === 'maintenance' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveCategory('maintenance')}>
          Manutenção
        </button>
        <button className={`px-4 py-2 mr-2 rounded-full whitespace-nowrap ${activeCategory === 'events' ? 'bg-[#4A90E2] text-white' : 'bg-gray-100 text-gray-700'}`} onClick={() => setActiveCategory('events')}>
          Eventos
        </button>
      </div>

      <div className="space-y-4">
        {filteredAnnouncements.map(announcement => {
        const isLiked = likedAnnouncements.includes(announcement.id) || announcement.isLiked;
        return <Card key={announcement.id} className={`border-l-4 ${announcement.category === 'urgent' ? 'border-l-red-500' : 'border-l-[#4A90E2]'}`}>
              <div className="relative">
                {announcement.isNew && <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full mt-2 mr-2"></div>}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                        {announcement.authorImage ? <img src={announcement.authorImage} alt={announcement.author} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center bg-[#4A90E2]">
                            <span className="text-white font-medium">
                              {announcement.author.charAt(0)}
                            </span>
                          </div>}
                      </div>
                      <div>
                        <h3 className="font-medium text-lg">
                          {announcement.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                          {announcement.author}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      {getCategoryBadge(announcement.category)}
                      {getPriorityBadge(announcement.priority)}
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{announcement.content}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">{announcement.date}</p>
                    <div className="flex space-x-4">
                      <button className={`flex items-center text-sm ${isLiked ? 'text-[#4A90E2]' : 'text-gray-500'}`} onClick={() => handleLike(announcement.id)}>
                        <ThumbsUp size={16} className="mr-1" />
                        <span>
                          {isLiked ? announcement.likes + 1 : announcement.likes}
                        </span>
                      </button>
                      <button className="flex items-center text-sm text-gray-500">
                        <MessageSquare size={16} className="mr-1" />
                        <span>{announcement.comments}</span>
                      </button>
                      <button className="flex items-center text-sm text-gray-500">
                        <Share size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>;
      })}
      </div>
    </div>;
};