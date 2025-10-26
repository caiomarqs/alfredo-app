export type ReportStatus = 'open' | 'in_progress' | 'resolved' | 'closed';
export type ReportCategory = 'maintenance' | 'security' | 'noise' | 'cleaning' | 'common_area' | 'other';
export type ReportPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Report {
  id: string;
  residentId: string;
  resident: {
    id: string;
    name: string;
    apartment: string;
  };
  title: string;
  description: string;
  category: ReportCategory;
  priority: ReportPriority;
  status: ReportStatus;
  location?: string;
  images?: string[];
  createdAt: string;
  updatedAt?: string;
  resolvedAt?: string;
  adminNotes?: string;
}

export interface CreateReportDTO {
  title: string;
  description: string;
  category: ReportCategory;
  priority: ReportPriority;
  location?: string;
  images?: string[];
}

export interface UpdateReportDTO extends Partial<CreateReportDTO> {
  id: string;
  status?: ReportStatus;
  adminNotes?: string;
}
