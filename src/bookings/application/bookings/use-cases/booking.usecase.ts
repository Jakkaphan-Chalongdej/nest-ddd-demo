import { Booking, BookingRepository } from 'src/bookings/domain';
import { v4 as uuidv4 } from 'uuid';

export class BookingUseCase {
  constructor(private readonly bookingRepo: BookingRepository) {}

  async create(input: {
    user_id: string;
    room_id: string;
    check_in: Date;
    check_out: Date;
  }): Promise<void> {
    const booking = new Booking(
      uuidv4(),
      input.user_id,
      input.room_id,
      input.check_in,
      input.check_out,
      'PENDING',
    );
    await this.bookingRepo.create(booking);
  }

  async get(input: { id: string }): Promise<Booking | null> {
    return this.bookingRepo.findById(input.id);
  }

  async findById(input: { id: string }): Promise<Booking | null> {
    return this.bookingRepo.findById(input.id);
  }

  async listByUser(input: { user_id: string }): Promise<Booking[]> {
    return this.bookingRepo.listByUser(input.user_id);
  }

  async update(
    id: string,
    input: {
      user_id: string;
      room_id: string;
      check_in: Date;
      check_out: Date;
    },
  ): Promise<void> {
    const booking = await this.bookingRepo.findById(id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    if (input.check_in) {
      booking.check_in = input.check_in;
    }
    if (input.check_out) {
      booking.check_out = input.check_out;
    }
    await this.bookingRepo.update(booking);
  }

  async cancel(input: { id: string }): Promise<void> {
    const booking = await this.bookingRepo.findById(input.id);
    if (!booking) {
      throw new Error('Booking not found');
    }
    await this.bookingRepo.cancel(input.id);
  }
}
