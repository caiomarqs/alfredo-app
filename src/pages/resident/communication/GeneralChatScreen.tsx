import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Input } from '../../../components/ui/Input';
interface Message {
  id: number;
  sender: string;
  apartment: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}
export const GeneralChatScreen: React.FC = () => {
  const navigate = useNavigate();
  const {
    user
  } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([{
    id: 1,
    sender: 'Maria Souza',
    apartment: '101A',
    content: 'Alguém sabe se a academia está funcionando hoje?',
    timestamp: '14:30',
    isCurrentUser: false
  }, {
    id: 2,
    sender: 'Carlos Oliveira',
    apartment: '205B',
    content: 'Sim, está funcionando normalmente. Acabei de voltar de lá.',
    timestamp: '14:35',
    isCurrentUser: false
  }, {
    id: 3,
    sender: 'João Silva',
    apartment: '302A',
    content: 'Obrigado pela informação!',
    timestamp: '14:40',
    isCurrentUser: true
  }]);
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const newMsg: Message = {
      id: messages.length + 1,
      sender: user?.name || 'Você',
      apartment: user?.apartment || '',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      }),
      isCurrentUser: true
    };
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };
  return <div className="flex flex-col h-screen">
      <div className="p-4 border-b">
        <div className="flex items-center">
          <button onClick={() => navigate('/resident')} className="mr-2">
            <ArrowLeft size={24} className="text-gray-600" />
          </button>
          <div>
            <h1 className="text-xl font-bold">Chat Geral</h1>
            <p className="text-sm text-gray-500">Todos os moradores</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => <div key={message.id} className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-lg p-3 ${message.isCurrentUser ? 'bg-[#4A90E2] text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'}`}>
              {!message.isCurrentUser && <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium">{message.sender}</span>
                  <span className="text-gray-500">
                    Apto {message.apartment}
                  </span>
                </div>}
              <p>{message.content}</p>
              <p className={`text-xs text-right mt-1 ${message.isCurrentUser ? 'text-blue-100' : 'text-gray-500'}`}>
                {message.timestamp}
              </p>
            </div>
          </div>)}
      </div>
      <div className="p-4 border-t">
        <div className="flex items-center">
          <Input placeholder="Digite sua mensagem..." value={newMessage} onChange={e => setNewMessage(e.target.value)} className="flex-1" onKeyPress={e => {
          if (e.key === 'Enter') handleSendMessage();
        }} />
          <button onClick={handleSendMessage} className="ml-2 bg-[#4A90E2] text-white p-3 rounded-full" disabled={!newMessage.trim()}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>;
};