import React, { useState } from 'react';
import { ArrowLeft, BarChart2, Clock, CheckCircle, MessageSquare, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
interface PollOption {
  id: number;
  text: string;
  votes: number;
  isSelected?: boolean;
}
interface Poll {
  id: number;
  title: string;
  description: string;
  category: 'building_decisions' | 'events' | 'rules' | 'budget';
  startDate: string;
  endDate: string;
  status: 'active' | 'ended' | 'upcoming';
  options: PollOption[];
  totalVotes: number;
  hasVoted: boolean;
  comments: number;
}
export const PollsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'active' | 'ended'>('active');
  const [expandedPoll, setExpandedPoll] = useState<number | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<number, number>>({});
  const polls: Poll[] = [{
    id: 1,
    title: 'Escolha da cor para pintura da fachada',
    description: 'Precisamos escolher a cor para a nova pintura da fachada do condomínio. Por favor, vote na sua preferência.',
    category: 'building_decisions',
    startDate: '10/06/2023',
    endDate: '25/06/2023',
    status: 'active',
    options: [{
      id: 1,
      text: 'Azul claro',
      votes: 25
    }, {
      id: 2,
      text: 'Bege',
      votes: 18
    }, {
      id: 3,
      text: 'Cinza',
      votes: 32
    }, {
      id: 4,
      text: 'Branco',
      votes: 15
    }],
    totalVotes: 90,
    hasVoted: false,
    comments: 12
  }, {
    id: 2,
    title: 'Definição do tema da festa de fim de ano',
    description: 'Vote no tema que você prefere para a nossa festa de confraternização de fim de ano.',
    category: 'events',
    startDate: '05/06/2023',
    endDate: '20/06/2023',
    status: 'active',
    options: [{
      id: 1,
      text: 'Anos 80',
      votes: 42
    }, {
      id: 2,
      text: 'Tropical',
      votes: 28
    }, {
      id: 3,
      text: 'Elegante (Black Tie)',
      votes: 35
    }, {
      id: 4,
      text: 'Sem tema específico',
      votes: 10
    }],
    totalVotes: 115,
    hasVoted: true,
    comments: 8
  }, {
    id: 3,
    title: 'Novo horário para uso da academia',
    description: 'Estamos avaliando a possibilidade de estender o horário de funcionamento da academia.',
    category: 'rules',
    startDate: '01/06/2023',
    endDate: '15/06/2023',
    status: 'ended',
    options: [{
      id: 1,
      text: 'Manter o horário atual (6h às 22h)',
      votes: 45
    }, {
      id: 2,
      text: 'Estender para 24h',
      votes: 68
    }, {
      id: 3,
      text: 'Estender apenas nos finais de semana',
      votes: 22
    }],
    totalVotes: 135,
    hasVoted: true,
    comments: 15
  }, {
    id: 4,
    title: 'Aprovação da nova taxa para fundo de reserva',
    description: 'Votação para aprovação do aumento da taxa destinada ao fundo de reserva do condomínio.',
    category: 'budget',
    startDate: '20/05/2023',
    endDate: '10/06/2023',
    status: 'ended',
    options: [{
      id: 1,
      text: 'Aprovar aumento para 10%',
      votes: 56
    }, {
      id: 2,
      text: 'Manter taxa atual de 5%',
      votes: 89
    }, {
      id: 3,
      text: 'Aprovar aumento para 7%',
      votes: 35
    }],
    totalVotes: 180,
    hasVoted: true,
    comments: 25
  }];
  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'building_decisions':
        return <Badge variant="info">Decisões do Condomínio</Badge>;
      case 'events':
        return <Badge variant="success">Eventos</Badge>;
      case 'rules':
        return <Badge variant="warning">Regras</Badge>;
      case 'budget':
        return <Badge variant="danger">Orçamento</Badge>;
      default:
        return <Badge variant="default">Outros</Badge>;
    }
  };
  const getStatusBadge = (status: string, endDate: string) => {
    switch (status) {
      case 'active':
        const daysLeft = getDaysLeft(endDate);
        return <div className="flex items-center">
            <Clock size={14} className="mr-1 text-[#4A90E2]" />
            <span className="text-xs text-[#4A90E2]">
              {daysLeft > 0 ? `${daysLeft} dias restantes` : 'Último dia'}
            </span>
          </div>;
      case 'ended':
        return <Badge variant="default">Encerrada</Badge>;
      case 'upcoming':
        return <Badge variant="info">Em breve</Badge>;
      default:
        return null;
    }
  };
  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate.split('/').reverse().join('-'));
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };
  const handleVote = (pollId: number, optionId: number) => {
    setSelectedOptions({
      ...selectedOptions,
      [pollId]: optionId
    });
  };
  const handleSubmitVote = (pollId: number) => {
    console.log(`Voted on poll ${pollId}, option ${selectedOptions[pollId]}`);
    // In a real app, this would send the vote to the backend
    setExpandedPoll(null);
  };
  const filteredPolls = polls.filter(poll => {
    if (activeTab === 'active') {
      return poll.status === 'active' || poll.status === 'upcoming';
    } else {
      return poll.status === 'ended';
    }
  });
  return <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/resident')} className="mr-2">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Enquetes</h1>
      </div>
      {/* Tabs */}
      <div className="flex mb-4 border-b">
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'active' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('active')}>
          Em Andamento
        </button>
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'ended' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('ended')}>
          Encerradas
        </button>
      </div>
      {/* Polls List */}
      <div className="space-y-4">
        {filteredPolls.map(poll => {
        const isExpanded = expandedPoll === poll.id;
        const selectedOption = selectedOptions[poll.id];
        return <Card key={poll.id}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium">{poll.title}</h3>
                      {poll.hasVoted && <CheckCircle size={16} className="text-green-500" />}
                    </div>
                    <div className="flex items-center space-x-2">
                      {getCategoryBadge(poll.category)}
                      {getStatusBadge(poll.status, poll.endDate)}
                    </div>
                  </div>
                  <button onClick={() => setExpandedPoll(isExpanded ? null : poll.id)} className="p-1 hover:bg-gray-100 rounded-full">
                    {isExpanded ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
                  </button>
                </div>
                {!isExpanded && <>
                    <p className="text-sm text-gray-500 mb-3">
                      {poll.startDate} - {poll.endDate}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <BarChart2 size={16} className="text-gray-400 mr-1" />
                        <span className="text-gray-600">
                          {poll.totalVotes} votos
                        </span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare size={16} className="text-gray-400 mr-1" />
                        <span className="text-gray-600">
                          {poll.comments} comentários
                        </span>
                      </div>
                    </div>
                  </>}
                {isExpanded && <div className="mt-3">
                    <p className="text-gray-600 mb-3">{poll.description}</p>
                    <p className="text-sm text-gray-500 mb-3">
                      Período de votação: {poll.startDate} - {poll.endDate}
                    </p>
                    <div className="space-y-3 mb-4">
                      {poll.options.map(option => {
                  const percentage = Math.round(option.votes / poll.totalVotes * 100) || 0;
                  const isSelected = selectedOption === option.id || option.isSelected;
                  return <div key={option.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {poll.status === 'active' && !poll.hasVoted ? <input type="radio" id={`option-${poll.id}-${option.id}`} name={`poll-${poll.id}`} className="h-4 w-4 text-[#4A90E2] focus:ring-[#4A90E2] border-gray-300" checked={selectedOption === option.id} onChange={() => handleVote(poll.id, option.id)} /> : isSelected && <CheckCircle size={16} className="text-green-500 mr-1" />}
                                <label htmlFor={`option-${poll.id}-${option.id}`} className={`ml-2 text-sm ${isSelected ? 'font-medium' : ''}`}>
                                  {option.text}
                                </label>
                              </div>
                              <span className="text-sm font-medium">
                                {percentage}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-200 rounded-full">
                              <div className={`h-2 rounded-full ${isSelected ? 'bg-[#4A90E2]' : 'bg-gray-400'}`} style={{
                        width: `${percentage}%`
                      }}></div>
                            </div>
                            <p className="text-xs text-gray-500 text-right">
                              {option.votes} votos
                            </p>
                          </div>;
                })}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-500">
                        Total: {poll.totalVotes} votos
                      </p>
                      {poll.status === 'active' && !poll.hasVoted && <Button onClick={() => handleSubmitVote(poll.id)} disabled={!selectedOption}>
                          Confirmar Voto
                        </Button>}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">
                          Comentários ({poll.comments})
                        </h4>
                        <button className="text-sm text-[#4A90E2]">
                          Ver todos
                        </button>
                      </div>
                      {/* Sample comments - in a real app these would come from the backend */}
                      <div className="mt-2 space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium">Ana Costa</p>
                            <span className="text-xs text-gray-500">Ontem</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Acredito que a opção mais viável seja...
                          </p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-medium">
                              Carlos Oliveira
                            </p>
                            <span className="text-xs text-gray-500">
                              2 dias atrás
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Concordo com a maioria, devemos considerar...
                          </p>
                        </div>
                      </div>
                      <div className="mt-3">
                        <textarea className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:border-[#4A90E2] focus:outline-none focus:ring-1 focus:ring-[#4A90E2] text-sm" placeholder="Adicione seu comentário..." rows={2} />
                        <Button size="sm" className="mt-2">
                          Comentar
                        </Button>
                      </div>
                    </div>
                  </div>}
              </div>
            </Card>;
      })}
      </div>
    </div>;
};