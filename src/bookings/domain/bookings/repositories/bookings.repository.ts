import { Booking } from '../entities/bookings.entity';

export interface BookingRepository {
  create(booking: Booking): Promise<void>;
  findById(id: string): Promise<Booking | null>;
  cancel(id: string): Promise<void>;
  listByUser(userId: string): Promise<Booking[]>;
  update(booking: Booking): Promise<void>;
}
