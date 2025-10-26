import { httpClient } from './http-client';
import {
  Report,
  CreateReportDTO,
  UpdateReportDTO,
  PaginatedResponse,
  PaginationParams,
} from '../@types';

class ReportsService {
  /**
   * Get all reports with pagination
   */
  async getAll(params?: PaginationParams & { status?: string }): Promise<PaginatedResponse<Report>> {
    return httpClient.get<PaginatedResponse<Report>>('/reports', params);
  }

  /**
   * Get report by ID
   */
  async getById(id: string): Promise<Report> {
    return httpClient.get<Report>(`/reports/${id}`);
  }

  /**
   * Get reports by resident
   */
  async getByResident(residentId: string, params?: PaginationParams): Promise<PaginatedResponse<Report>> {
    return httpClient.get<PaginatedResponse<Report>>(`/reports/resident/${residentId}`, params);
  }

  /**
   * Create new report
   */
  async create(data: CreateReportDTO): Promise<Report> {
    return httpClient.post<Report>('/reports', data);
  }

  /**
   * Update report
   */
  async update(data: UpdateReportDTO): Promise<Report> {
    const { id, ...updateData } = data;
    return httpClient.put<Report>(`/reports/${id}`, updateData);
  }

  /**
   * Delete report
   */
  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(`/reports/${id}`);
  }

  /**
   * Upload images for report
   */
  async uploadImages(reportId: string, images: File[]): Promise<string[]> {
    const formData = new FormData();
    images.forEach(image => formData.append('images', image));
    
    // Note: This requires a different content type, so we'll need a special method
    const response = await fetch(`/reports/${reportId}/images`, {
      method: 'POST',
      body: formData,
    });
    
    return response.json();
  }
}

export const reportsService = new ReportsService();
