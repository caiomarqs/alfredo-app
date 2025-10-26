import { httpClient } from './http-client';
import {
  Announcement,
  CreateAnnouncementDTO,
  UpdateAnnouncementDTO,
  PaginatedResponse,
  PaginationParams,
} from '../@types';
import { delay } from '../utils';

class AnnouncementsService {
  /**
   * Get all announcements with pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Announcement>> {
    // Mock implementation
    await delay(800);
    
    const mockAnnouncements: Announcement[] = [
      {
        id: '1',
        title: 'Manutenção na piscina',
        content: 'A piscina estará fechada para manutenção nos dias 15 e 16 de junho.',
        category: 'maintenance',
        priority: 'high',
        author: {
          id: 'admin1',
          name: 'Admin Silva',
          role: 'admin',
        },
        createdAt: new Date().toISOString(),
        isNew: true,
      },
      {
        id: '2',
        title: 'Assembleia de condomínio',
        content: 'Convocamos todos os condôminos para a assembleia geral ordinária.',
        category: 'meeting',
        priority: 'urgent',
        author: {
          id: 'admin1',
          name: 'Admin Silva',
          role: 'admin',
        },
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isNew: false,
      },
    ];

    return {
      data: mockAnnouncements,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockAnnouncements.length,
        totalPages: 1,
      },
    };
    
    // Real implementation:
    // return httpClient.get<PaginatedResponse<Announcement>>('/announcements', params);
  }

  /**
   * Get announcement by ID
   */
  async getById(id: string): Promise<Announcement> {
    return httpClient.get<Announcement>(`/announcements/${id}`);
  }

  /**
   * Create new announcement
   */
  async create(data: CreateAnnouncementDTO): Promise<Announcement> {
    return httpClient.post<Announcement>('/announcements', data);
  }

  /**
   * Update announcement
   */
  async update(data: UpdateAnnouncementDTO): Promise<Announcement> {
    const { id, ...updateData } = data;
    return httpClient.put<Announcement>(`/announcements/${id}`, updateData);
  }

  /**
   * Delete announcement
   */
  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(`/announcements/${id}`);
  }

  /**
   * Mark announcement as read
   */
  async markAsRead(id: string): Promise<void> {
    return httpClient.post<void>(`/announcements/${id}/read`);
  }
}

export const announcementsService = new AnnouncementsService();
