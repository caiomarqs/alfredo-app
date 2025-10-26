import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './pages/auth/SplashScreen';
import { LoginScreen } from './pages/auth/LoginScreen';
import { FirstAccessScreen } from './pages/auth/FirstAccessScreen';
import { ResidentDashboard } from './pages/resident/ResidentDashboard';
import { AnnouncementsScreen } from './pages/resident/communication/AnnouncementsScreen';
import { GeneralChatScreen } from './pages/resident/communication/GeneralChatScreen';
import { AreaBookingScreen } from './pages/resident/services/AreaBookingScreen';
import { BillsScreen } from './pages/resident/financial/BillsScreen';
import { ProfileScreen } from './pages/resident/profile/ProfileScreen';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppLayout } from './components/layout/AppLayout';
// Admin imports
import { AdminLoginScreen } from './pages/admin/AdminLoginScreen';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminResidentsScreen } from './pages/admin/residents/AdminResidentsScreen';
import { AddResidentScreen } from './pages/admin/residents/AddResidentScreen';
import { ResidentProfileScreen } from './pages/admin/residents/ResidentProfileScreen';
import { AdminAnnouncementsScreen } from './pages/admin/communication/AdminAnnouncementsScreen';
import { AdminAreasScreen } from './pages/admin/areas/AdminAreasScreen';
import { AdminBookingsScreen } from './pages/admin/areas/AdminBookingsScreen';
import { AdminReportsScreen } from './pages/admin/communication/AdminReportsScreen';
import { AdminPollsScreen } from './pages/admin/communication/AdminPollsScreen';
import { AdminBillsScreen } from './pages/admin/financial/AdminBillsScreen';
import { AdminSettingsScreen } from './pages/admin/AdminSettingsScreen';
// New resident screens
import { ReportsScreen } from './pages/resident/communication/ReportsScreen';
import { PollsScreen } from './pages/resident/communication/PollsScreen';
import { BookingFormScreen } from './pages/resident/services/BookingFormScreen';
// New admin screens
import { AdminProfileScreen } from './pages/admin/profile/AdminProfileScreen';
import { PaymentTrackingScreen } from './pages/admin/financial/PaymentTrackingScreen';
import { WorkOrdersScreen } from './pages/admin/operations/WorkOrdersScreen';
// Protected route component
const ProtectedRoute = ({
  children,
  requiredRole
}) => {
  const {
    isAuthenticated,
    user
  } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to={requiredRole === 'admin' ? '/admin/login' : '/login'} replace />;
  }
  if (requiredRole === 'admin' && user?.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  if (requiredRole === 'resident' && user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  return children;
};
export function AppRouter() {
  return <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Auth routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/first-access" element={<FirstAccessScreen />} />
          <Route path="/admin/login" element={<AdminLoginScreen />} />
          {/* Resident protected routes */}
          <Route path="/resident" element={<ProtectedRoute requiredRole="resident">
                <AppLayout />
              </ProtectedRoute>}>
            <Route index element={<ResidentDashboard />} />
            {/* Communication module */}
            <Route path="announcements" element={<AnnouncementsScreen />} />
            <Route path="chat" element={<GeneralChatScreen />} />
            <Route path="reports" element={<ReportsScreen />} />
            <Route path="polls" element={<PollsScreen />} />
            {/* Services module */}
            <Route path="area-booking" element={<AreaBookingScreen />} />
            <Route path="area-booking/:areaId" element={<BookingFormScreen />} />
            {/* Financial module */}
            <Route path="bills" element={<BillsScreen />} />
            {/* Profile */}
            <Route path="profile" element={<ProfileScreen />} />
          </Route>
          {/* Admin protected routes */}
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin">
                <AdminLayout />
              </ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            {/* Residents management */}
            <Route path="residents" element={<AdminResidentsScreen />} />
            <Route path="residents/add" element={<AddResidentScreen />} />
            <Route path="residents/:id" element={<ResidentProfileScreen />} />
            {/* Communication management */}
            <Route path="announcements" element={<AdminAnnouncementsScreen />} />
            <Route path="reports" element={<AdminReportsScreen />} />
            <Route path="polls" element={<AdminPollsScreen />} />
            {/* Areas management */}
            <Route path="areas" element={<AdminAreasScreen />} />
            <Route path="bookings" element={<AdminBookingsScreen />} />
            {/* Financial management */}
            <Route path="bills" element={<AdminBillsScreen />} />
            <Route path="payments" element={<PaymentTrackingScreen />} />
            {/* Building operations */}
            <Route path="work-orders" element={<WorkOrdersScreen />} />
            {/* Profile and settings */}
            <Route path="profile" element={<AdminProfileScreen />} />
            <Route path="settings" element={<AdminSettingsScreen />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>;
}