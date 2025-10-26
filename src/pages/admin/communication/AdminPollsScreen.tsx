import React from 'react';
import { Card } from '../../../components/ui/Card';
export const AdminPollsScreen: React.FC = () => {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Enquetes</h1>
      </div>
      <Card>
        <div className="p-6">
          <p className="text-gray-600">
            Gerenciamento de enquetes para votação dos moradores. Aqui você pode
            criar novas enquetes, visualizar resultados e encerrar votações.
          </p>
        </div>
      </Card>
    </div>;
};