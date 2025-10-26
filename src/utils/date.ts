import { format, parseISO, isValid, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * Format date to Brazilian format
 */
export const formatDate = (date: string | Date, formatStr: string = 'dd/MM/yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return format(dateObj, formatStr, { locale: ptBR });
  } catch {
    return '';
  }
};

/**
 * Format date with time
 */
export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, 'dd/MM/yyyy HH:mm');
};

/**
 * Format time only
 */
export const formatTime = (date: string | Date): string => {
  return formatDate(date, 'HH:mm');
};

/**
 * Format relative time (e.g., "2 hours ago")
 */
export const formatRelativeTime = (date: string | Date): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return '';
    return formatDistanceToNow(dateObj, { 
      addSuffix: true,
      locale: ptBR 
    });
  } catch {
    return '';
  }
};

/**
 * Check if date is today
 */
export const isToday = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    const today = new Date();
    return (
      dateObj.getDate() === today.getDate() &&
      dateObj.getMonth() === today.getMonth() &&
      dateObj.getFullYear() === today.getFullYear()
    );
  } catch {
    return false;
  }
};

/**
 * Check if date is in the past
 */
export const isPast = (date: string | Date): boolean => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    return dateObj < new Date();
  } catch {
    return false;
  }
};
