import { API_BASE_URL, API_TIMEOUT } from '../constants';

export const apiConfig = {
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAuthHeader = (): Record<string, string> => {
  const token = localStorage.getItem('alfredo_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};
