import { httpClient } from './http-client';
import {
  Bill,
  CreateBillDTO,
  UpdateBillDTO,
  BillPayment,
  PaginatedResponse,
  PaginationParams,
} from '../@types';
import { delay } from '../utils';

class BillsService {
  /**
   * Get all bills with pagination
   */
  async getAll(params?: PaginationParams & { status?: string }): Promise<PaginatedResponse<Bill>> {
    // Mock implementation
    await delay(800);
    
    const mockBills: Bill[] = [
      {
        id: '1',
        residentId: '1',
        apartment: '302A',
        title: 'Taxa de Condomínio',
        type: 'condominium',
        amount: 450.0,
        dueDate: '2024-06-15',
        status: 'pending',
        referenceMonth: '2024-06',
        createdAt: new Date().toISOString(),
      },
      {
        id: '2',
        residentId: '1',
        apartment: '302A',
        title: 'Taxa Extra - Reforma',
        type: 'extra',
        amount: 150.0,
        dueDate: '2024-06-20',
        status: 'pending',
        referenceMonth: '2024-06',
        createdAt: new Date().toISOString(),
      },
    ];

    return {
      data: mockBills,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockBills.length,
        totalPages: 1,
      },
    };
    
    // Real implementation:
    // return httpClient.get<PaginatedResponse<Bill>>('/bills', params);
  }

  /**
   * Get bill by ID
   */
  async getById(id: string): Promise<Bill> {
    return httpClient.get<Bill>(`/bills/${id}`);
  }

  /**
   * Get bills by resident
   */
  async getByResident(residentId: string, params?: PaginationParams): Promise<PaginatedResponse<Bill>> {
    return httpClient.get<PaginatedResponse<Bill>>(`/bills/resident/${residentId}`, params);
  }

  /**
   * Create new bill
   */
  async create(data: CreateBillDTO): Promise<Bill> {
    return httpClient.post<Bill>('/bills', data);
  }

  /**
   * Update bill
   */
  async update(data: UpdateBillDTO): Promise<Bill> {
    const { id, ...updateData } = data;
    return httpClient.put<Bill>(`/bills/${id}`, updateData);
  }

  /**
   * Delete bill
   */
  async delete(id: string): Promise<void> {
    return httpClient.delete<void>(`/bills/${id}`);
  }

  /**
   * Process payment
   */
  async processPayment(payment: BillPayment): Promise<void> {
    return httpClient.post<void>(`/bills/${payment.billId}/pay`, payment);
  }

  /**
   * Generate payment slip
   */
  async generatePaymentSlip(billId: string): Promise<{ barCode: string; pixCode: string }> {
    return httpClient.post<{ barCode: string; pixCode: string }>(`/bills/${billId}/payment-slip`);
  }
}

export const billsService = new BillsService();
