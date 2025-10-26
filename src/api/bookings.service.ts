import { httpClient } from './http-client';
import {
  Booking,
  Area,
  CreateBookingDTO,
  UpdateBookingDTO,
  PaginatedResponse,
  PaginationParams,
} from '../@types';
import { delay } from '../utils';

class BookingsService {
  /**
   * Get all bookings with pagination
   */
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Booking>> {
    // Mock implementation
    await delay(800);
    
    const mockBookings: Booking[] = [
      {
        id: '1',
        areaId: '1',
        area: {
          id: '1',
          name: 'Salão de Festas',
          type: 'party_hall',
          price: 200,
          availability: {
            daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
            startTime: '08:00',
            endTime: '23:00',
          },
          isActive: true,
        },
        residentId: '1',
        resident: {
          id: '1',
          name: 'João Silva',
          apartment: '302A',
        },
        date: '2024-06-25',
        startTime: '19:00',
        endTime: '23:00',
        status: 'confirmed',
        numberOfGuests: 50,
        createdAt: new Date().toISOString(),
      },
    ];

    return {
      data: mockBookings,
      pagination: {
        page: params?.page || 1,
        limit: params?.limit || 10,
        total: mockBookings.length,
        totalPages: 1,
      },
    };
    
    // Real implementation:
    // return httpClient.get<PaginatedResponse<Booking>>('/bookings', params);
  }

  /**
   * Get booking by ID
   */
  async getById(id: string): Promise<Booking> {
    return httpClient.get<Booking>(`/bookings/${id}`);
  }

  /**
   * Get bookings by resident
   */
  async getByResident(residentId: string, params?: PaginationParams): Promise<PaginatedResponse<Booking>> {
    return httpClient.get<PaginatedResponse<Booking>>(`/bookings/resident/${residentId}`, params);
  }

  /**
   * Get all areas
   */
  async getAreas(): Promise<Area[]> {
    // Mock implementation
    await delay(800);
    
    const mockAreas: Area[] = [
      {
        id: '1',
        name: 'Salão de Festas',
        type: 'party_hall',
        description: 'Amplo salão para eventos e festas',
        capacity: 100,
        price: 200,
        availability: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          startTime: '08:00',
          endTime: '23:00',
        },
        isActive: true,
      },
      {
        id: '2',
        name: 'Churrasqueira',
        type: 'barbecue',
        description: 'Área de churrasqueira com mesas',
        capacity: 30,
        price: 50,
        availability: {
          daysOfWeek: [0, 1, 2, 3, 4, 5, 6],
          startTime: '10:00',
          endTime: '22:00',
        },
        isActive: true,
      },
    ];

    return mockAreas;
    
    // Real implementation:
    // return httpClient.get<Area[]>('/areas');
  }

  /**
   * Create new booking
   */
  async create(data: CreateBookingDTO): Promise<Booking> {
    return httpClient.post<Booking>('/bookings', data);
  }

  /**
   * Update booking
   */
  async update(data: UpdateBookingDTO): Promise<Booking> {
    const { id, ...updateData } = data;
    return httpClient.put<Booking>(`/bookings/${id}`, updateData);
  }

  /**
   * Cancel booking
   */
  async cancel(id: string): Promise<void> {
    return httpClient.patch<void>(`/bookings/${id}/cancel`);
  }

  /**
   * Check availability
   */
  async checkAvailability(areaId: string, date: string, startTime: string, endTime: string): Promise<boolean> {
    return httpClient.get<boolean>('/bookings/check-availability', {
      areaId,
      date,
      startTime,
      endTime,
    });
  }
}

export const bookingsService = new BookingsService();
