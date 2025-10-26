import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Booking, Area, CreateBookingDTO, PaginationParams } from '../@types';
import { bookingsService } from '../api';
import { useAuth } from './AuthContext';

interface BookingsContextValue {
  bookings: Booking[];
  areas: Area[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchBookings: (params?: PaginationParams) => Promise<void>;
  fetchAreas: () => Promise<void>;
  createBooking: (data: CreateBookingDTO) => Promise<void>;
  cancelBooking: (id: string) => Promise<void>;
  checkAvailability: (areaId: string, date: string, startTime: string, endTime: string) => Promise<boolean>;
  refresh: () => Promise<void>;
}

const BookingsContext = createContext<BookingsContextValue | undefined>(undefined);

export const useBookings = (): BookingsContextValue => {
  const context = useContext(BookingsContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};

interface BookingsProviderProps {
  children: React.ReactNode;
}

export const BookingsProvider: React.FC<BookingsProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchBookings = useCallback(async (params?: PaginationParams) => {
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = user.role === 'admin'
        ? await bookingsService.getAll(params)
        : await bookingsService.getByResident(user.id, params);
        
      setBookings(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch bookings:', err);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const fetchAreas = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const areasData = await bookingsService.getAreas();
      setAreas(areasData);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch areas:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createBooking = useCallback(async (data: CreateBookingDTO) => {
    try {
      await bookingsService.create(data);
      await fetchBookings();
    } catch (err) {
      console.error('Failed to create booking:', err);
      throw err;
    }
  }, [fetchBookings]);

  const cancelBooking = useCallback(async (id: string) => {
    try {
      await bookingsService.cancel(id);
      setBookings(prev =>
        prev.map(booking =>
          booking.id === id
            ? { ...booking, status: 'cancelled' }
            : booking
        )
      );
    } catch (err) {
      console.error('Failed to cancel booking:', err);
      throw err;
    }
  }, []);

  const checkAvailability = useCallback(async (
    areaId: string,
    date: string,
    startTime: string,
    endTime: string
  ) => {
    try {
      return await bookingsService.checkAvailability(areaId, date, startTime, endTime);
    } catch (err) {
      console.error('Failed to check availability:', err);
      return false;
    }
  }, []);

  const refresh = useCallback(async () => {
    await Promise.all([
      fetchBookings({ page: pagination.page, limit: pagination.limit }),
      fetchAreas(),
    ]);
  }, [fetchBookings, fetchAreas, pagination.page, pagination.limit]);

  // Auto-fetch on mount or when user changes
  useEffect(() => {
    if (user) {
      fetchBookings();
      fetchAreas();
    }
  }, [user, fetchBookings, fetchAreas]);

  const value: BookingsContextValue = {
    bookings,
    areas,
    isLoading,
    error,
    pagination,
    fetchBookings,
    fetchAreas,
    createBooking,
    cancelBooking,
    checkAvailability,
    refresh,
  };

  return (
    <BookingsContext.Provider value={value}>
      {children}
    </BookingsContext.Provider>
  );
};
