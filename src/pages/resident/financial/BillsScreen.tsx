import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, FileText, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
interface Bill {
  id: number;
  title: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  details?: {
    reference: string;
    paymentMethod?: string;
    paymentDate?: string;
    barcode?: string;
  };
}
export const BillsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'pending' | 'paid'>('pending');
  const [expandedBill, setExpandedBill] = useState<number | null>(null);
  const pendingBills: Bill[] = [{
    id: 1,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/06/2023',
    status: 'pending',
    details: {
      reference: 'Junho/2023',
      barcode: '34191.09008 12345.678901 23456.789012 3 45678901234567'
    }
  }, {
    id: 2,
    title: 'Taxa Extra - Reforma',
    amount: 150.0,
    dueDate: '20/06/2023',
    status: 'pending',
    details: {
      reference: 'Reforma Playground',
      barcode: '34191.09008 98765.432109 87654.321098 7 89012345678901'
    }
  }];
  const paidBills: Bill[] = [{
    id: 3,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/05/2023',
    status: 'paid',
    details: {
      reference: 'Maio/2023',
      paymentMethod: 'Boleto Bancário',
      paymentDate: '10/05/2023'
    }
  }, {
    id: 4,
    title: 'Taxa de Condomínio',
    amount: 450.0,
    dueDate: '15/04/2023',
    status: 'paid',
    details: {
      reference: 'Abril/2023',
      paymentMethod: 'PIX',
      paymentDate: '12/04/2023'
    }
  }];
  const toggleExpand = (id: number) => {
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
  return <div className="p-4 pb-20">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate('/resident')} className="mr-2">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h1 className="text-xl font-bold">Contas</h1>
      </div>
      <div className="flex mb-4 border-b">
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'pending' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('pending')}>
          Pendentes
        </button>
        <button className={`flex-1 py-3 text-center font-medium ${activeTab === 'paid' ? 'text-[#4A90E2] border-b-2 border-[#4A90E2]' : 'text-gray-500'}`} onClick={() => setActiveTab('paid')}>
          Pagas
        </button>
      </div>
      <div className="space-y-4">
        {(activeTab === 'pending' ? pendingBills : paidBills).map(bill => <Card key={bill.id}>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{bill.title}</h3>
                  <p className="text-sm text-gray-500">
                    Vencimento: {bill.dueDate}
                  </p>
                  {bill.details?.reference && <p className="text-sm text-gray-500">
                      Ref: {bill.details.reference}
                    </p>}
                </div>
                <div className="text-right">
                  <p className="font-bold">R$ {bill.amount.toFixed(2)}</p>
                  {getStatusBadge(bill.status)}
                </div>
              </div>
              <button onClick={() => toggleExpand(bill.id)} className="flex items-center text-[#4A90E2] text-sm mt-2">
                {expandedBill === bill.id ? <>
                    Menos detalhes <ChevronUp size={16} className="ml-1" />
                  </> : <>
                    Ver detalhes <ChevronDown size={16} className="ml-1" />
                  </>}
              </button>
              {expandedBill === bill.id && <div className="mt-4 pt-4 border-t border-gray-200">
                  {bill.status === 'paid' ? <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Data de pagamento:</span>{' '}
                        {bill.details?.paymentDate}
                      </p>
                      <p className="text-sm">
                        <span className="font-medium">
                          Método de pagamento:
                        </span>{' '}
                        {bill.details?.paymentMethod}
                      </p>
                      <Button variant="outline" size="sm" className="mt-2" leftIcon={<Download size={16} />}>
                        Baixar comprovante
                      </Button>
                    </div> : <div className="space-y-3">
                      {bill.details?.barcode && <div>
                          <p className="text-sm font-medium mb-1">
                            Código de barras:
                          </p>
                          <p className="text-xs bg-gray-50 p-2 rounded break-all">
                            {bill.details.barcode}
                          </p>
                        </div>}
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="flex-1" leftIcon={<FileText size={16} />}>
                          Boleto
                        </Button>
                        <Button variant="primary" size="sm" className="flex-1">
                          Pagar agora
                        </Button>
                      </div>
                    </div>}
                </div>}
            </div>
          </Card>)}
      </div>
    </div>;
};