import { Booking, BookingRepository } from 'src/bookings/domain';
import { v4 as uuidv4 } from 'uuid';

export class BookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async create(input: {
    userId: string;
    roomId: string;
    checkIn: Date;
    checkOut: Date;
  }): Promise<void> {
    const booking = new Booking(
      uuidv4(),
      input.userId,
      input.roomId,
      input.checkIn,
      input.checkOut,
      'PENDING',
    );
    await this.bookingRepo.create(booking);
  }

  async get(input: { bookingId: string }): Promise<Booking | null> {
    return this.bookingRepo.findById(input.bookingId);
  }

  async findById(input: { bookingId: string }): Promise<Booking | null> {
    return this.bookingRepo.findById(input.bookingId);
  }

  async listByUser(input: { userId: string }): Promise<Booking[]> {
    return this.bookingRepo.listByUser(input.userId);
  }

  async update(
    bookingId: string,
    input: {
      userId: string;
      roomId: string;
      checkIn: Date;
      checkOut: Date;
    },
  ): Promise<void> {
    const booking = await this.bookingRepo.findById(bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    if (input.checkIn) {
      booking.checkIn = input.checkIn;
    }
    if (input.checkOut) {
      booking.checkOut = input.checkOut;
    }
    await this.bookingRepo.update(booking);
  }

  async cancel(input: { bookingId: string }): Promise<void> {
    const booking = await this.bookingRepo.findById(input.bookingId);
    if (!booking) {
      throw new Error('Booking not found');
    }
    await this.bookingRepo.cancel(input.bookingId);
  }
}
