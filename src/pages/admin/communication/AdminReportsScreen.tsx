import React from 'react';
import { Card } from '../../../components/ui/Card';
export const AdminReportsScreen: React.FC = () => {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Ocorrências</h1>
      </div>
      <Card>
        <div className="p-6">
          <p className="text-gray-600">
            Gerenciamento de ocorrências reportadas pelos moradores. Aqui você
            pode visualizar, responder e gerenciar o status das ocorrências.
          </p>
        </div>
      </Card>
    </div>;
};