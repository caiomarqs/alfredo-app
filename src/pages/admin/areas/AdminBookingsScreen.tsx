import React from 'react';
import { Card } from '../../../components/ui/Card';
export const AdminBookingsScreen: React.FC = () => {
  return <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reservas</h1>
      </div>
      <Card>
        <div className="p-6">
          <p className="text-gray-600">
            Gerenciamento de reservas das áreas comuns. Aqui você pode
            visualizar, aprovar ou recusar solicitações de reserva.
          </p>
        </div>
      </Card>
    </div>;
};