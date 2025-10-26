import React from 'react';
import { Outlet } from 'react-router-dom';
import { BottomNavigation } from './BottomNavigation';
export const AppLayout: React.FC = () => {
  return <div className="flex flex-col h-screen bg-gray-50">
      <main className="flex-1 overflow-auto pb-20 max-w-2xl mx-auto w-full">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>;
};