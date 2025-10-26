import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Users, Calendar, DollarSign } from 'lucide-react';
export const AdminMobileNav: React.FC = () => {
  const navItems = [{
    to: '/admin',
    icon: Home,
    label: 'Início'
  }, {
    to: '/admin/residents',
    icon: Users,
    label: 'Moradores'
  }, {
    to: '/admin/areas',
    icon: Calendar,
    label: 'Áreas'
  }, {
    to: '/admin/bills',
    icon: DollarSign,
    label: 'Financeiro'
  }];
  return <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100 z-20">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => <NavLink key={item.to} to={item.to} className={({
        isActive
      }) => `flex flex-col items-center justify-center w-full h-full ${isActive ? 'text-[#4A90E2]' : 'text-gray-500'}`}>
            <item.icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </NavLink>)}
      </div>
    </nav>;
};