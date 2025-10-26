export type BookingStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed';
export type AreaType = 'party_hall' | 'pool' | 'gym' | 'playground' | 'barbecue' | 'sports_court';

export interface Area {
  id: string;
  name: string;
  type: AreaType;
  description?: string;
  capacity?: number;
  price?: number;
  images?: string[];
  amenities?: string[];
  rules?: string[];
  availability: {
    daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
    startTime: string; // "HH:mm"
    endTime: string; // "HH:mm"
  };
  isActive: boolean;
}

export interface Booking {
  id: string;
  areaId: string;
  area: Area;
  residentId: string;
  resident: {
    id: string;
    name: string;
    apartment: string;
  };
  date: string;
  startTime: string;
  endTime: string;
  status: BookingStatus;
  numberOfGuests?: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateBookingDTO {
  areaId: string;
  date: string;
  startTime: string;
  endTime: string;
  numberOfGuests?: number;
  notes?: string;
}

export interface UpdateBookingDTO extends Partial<CreateBookingDTO> {
  id: string;
  status?: BookingStatus;
}
