// Re-export all types for easier imports
export * from './user.types';
export * from './announcement.types';
export * from './bill.types';
export * from './booking.types';
export * from './report.types';
export * from './poll.types';

// Common types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
