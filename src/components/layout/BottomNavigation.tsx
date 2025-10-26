import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Calendar, DollarSign, User, FileText, BarChart } from 'lucide-react';
const navItems = [{
  to: '/resident',
  icon: Home,
  label: 'Home'
}, {
  to: '/resident/announcements',
  icon: MessageSquare,
  label: 'Comunicação',
  subItems: [{
    to: '/resident/announcements',
    label: 'Avisos'
  }, {
    to: '/resident/chat',
    label: 'Chat'
  }, {
    to: '/resident/reports',
    label: 'Ocorrências'
  }, {
    to: '/resident/polls',
    label: 'Enquetes'
  }]
}, {
  to: '/resident/area-booking',
  icon: Calendar,
  label: 'Serviços'
}, {
  to: '/resident/bills',
  icon: DollarSign,
  label: 'Financeiro'
}, {
  to: '/resident/profile',
  icon: User,
  label: 'Perfil'
}];
export const BottomNavigation = () => {
  const location = useLocation();
  return <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-100">
      <div className="flex justify-around items-center h-20 max-w-2xl mx-auto">
        {navItems.map(item => {
        const isActive = item.to === '/resident' && location.pathname === '/resident' || item.to !== '/resident' && location.pathname.startsWith(item.to);
        // Check if any subitem is active
        const hasActiveSubItem = item.subItems?.some(subItem => location.pathname === subItem.to);
        return <NavLink key={item.to} to={item.to} className="flex flex-col items-center justify-center w-full h-full">
              {({
            isActive
          }) => <>
                  <item.icon size={22} className={`${isActive || hasActiveSubItem ? 'text-[#4A90E2]' : 'text-gray-500'}`} />
                  <span className={`text-xs mt-1.5 ${isActive || hasActiveSubItem ? 'text-[#4A90E2] font-medium' : 'text-gray-500'}`}>
                    {item.label}
                  </span>
                </>}
            </NavLink>;
      })}
      </div>
    </nav>;
};