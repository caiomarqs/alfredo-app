export type AnnouncementPriority = 'low' | 'medium' | 'high' | 'urgent';
export type AnnouncementCategory = 'general' | 'maintenance' | 'event' | 'alert' | 'meeting';

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  author: {
    id: string;
    name: string;
    role: 'admin' | 'resident';
  };
  createdAt: string;
  updatedAt?: string;
  isNew?: boolean;
  attachments?: string[];
  expiresAt?: string;
}

export interface CreateAnnouncementDTO {
  title: string;
  content: string;
  category: AnnouncementCategory;
  priority: AnnouncementPriority;
  attachments?: string[];
  expiresAt?: string;
}

export interface UpdateAnnouncementDTO extends Partial<CreateAnnouncementDTO> {
  id: string;
}
