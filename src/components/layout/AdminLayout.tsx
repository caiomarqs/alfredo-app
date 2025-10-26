import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminTopBar } from './AdminTopBar';
import { AdminMobileNav } from './AdminMobileNav';
export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return <div className="flex flex-col h-screen bg-gray-50">
      <AdminTopBar toggleSidebar={toggleSidebar} />
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop sidebar - hidden on mobile */}
        <div className="hidden md:block">
          <AdminSidebar />
        </div>
        {/* Mobile sidebar - overlay when open */}
        {sidebarOpen && <div className="fixed inset-0 z-40 md:hidden">
            {/* Backdrop */}
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50" onClick={toggleSidebar} aria-hidden="true"></div>
            {/* Sidebar */}
            <div className="relative flex flex-col w-72 max-w-xs h-full bg-white">
              <AdminSidebar onClose={toggleSidebar} />
            </div>
          </div>}
        {/* Main content area */}
        <main className="flex-1 overflow-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
      {/* Mobile bottom navigation - visible only on mobile */}
      <div className="md:hidden">
        <AdminMobileNav />
      </div>
    </div>;
};