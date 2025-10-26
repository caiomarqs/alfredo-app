import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Announcement, PaginationParams } from '../@types';
import { announcementsService } from '../api';

interface AnnouncementsContextValue {
  announcements: Announcement[];
  isLoading: boolean;
  error: Error | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  fetchAnnouncements: (params?: PaginationParams) => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

const AnnouncementsContext = createContext<AnnouncementsContextValue | undefined>(undefined);

export const useAnnouncements = (): AnnouncementsContextValue => {
  const context = useContext(AnnouncementsContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within an AnnouncementsProvider');
  }
  return context;
};

interface AnnouncementsProviderProps {
  children: React.ReactNode;
}

export const AnnouncementsProvider: React.FC<AnnouncementsProviderProps> = ({ children }) => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchAnnouncements = useCallback(async (params?: PaginationParams) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await announcementsService.getAll(params);
      setAnnouncements(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err as Error);
      console.error('Failed to fetch announcements:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const markAsRead = useCallback(async (id: string) => {
    try {
      await announcementsService.markAsRead(id);
      setAnnouncements(prev =>
        prev.map(announcement =>
          announcement.id === id
            ? { ...announcement, isNew: false }
            : announcement
        )
      );
    } catch (err) {
      console.error('Failed to mark announcement as read:', err);
    }
  }, []);

  const refresh = useCallback(async () => {
    await fetchAnnouncements({ page: pagination.page, limit: pagination.limit });
  }, [fetchAnnouncements, pagination.page, pagination.limit]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const value: AnnouncementsContextValue = {
    announcements,
    isLoading,
    error,
    pagination,
    fetchAnnouncements,
    markAsRead,
    refresh,
  };

  return (
    <AnnouncementsContext.Provider value={value}>
      {children}
    </AnnouncementsContext.Provider>
  );
};
