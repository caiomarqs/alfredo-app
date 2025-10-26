export const APP_NAME = 'Alfredo';
export const APP_VERSION = '1.0.0';

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
export const API_TIMEOUT = 30000; // 30 seconds

export const LOCAL_STORAGE_KEYS = {
  AUTH_TOKEN: 'alfredo_token',
  USER: 'alfredo_user',
  THEME: 'alfredo_theme',
} as const;

export const ROUTES = {
  // Auth
  SPLASH: '/',
  LOGIN: '/login',
  ADMIN_LOGIN: '/admin/login',
  FIRST_ACCESS: '/first-access',
  
  // Resident
  RESIDENT: '/resident',
  RESIDENT_DASHBOARD: '/resident',
  RESIDENT_ANNOUNCEMENTS: '/resident/announcements',
  RESIDENT_CHAT: '/resident/chat',
  RESIDENT_REPORTS: '/resident/reports',
  RESIDENT_POLLS: '/resident/polls',
  RESIDENT_AREA_BOOKING: '/resident/area-booking',
  RESIDENT_BILLS: '/resident/bills',
  RESIDENT_PROFILE: '/resident/profile',
  
  // Admin
  ADMIN: '/admin',
  ADMIN_DASHBOARD: '/admin',
  ADMIN_RESIDENTS: '/admin/residents',
  ADMIN_ANNOUNCEMENTS: '/admin/announcements',
  ADMIN_REPORTS: '/admin/reports',
  ADMIN_POLLS: '/admin/polls',
  ADMIN_AREAS: '/admin/areas',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_BILLS: '/admin/bills',
  ADMIN_PAYMENTS: '/admin/payments',
  ADMIN_WORK_ORDERS: '/admin/work-orders',
  ADMIN_PROFILE: '/admin/profile',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export const DATE_FORMATS = {
  DISPLAY: 'dd/MM/yyyy',
  DISPLAY_WITH_TIME: 'dd/MM/yyyy HH:mm',
  API: 'yyyy-MM-dd',
  TIME: 'HH:mm',
} as const;

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;
