import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/bookings/domain/bookings/entities/bookings.entity';
import { BookingRepository } from 'src/bookings/domain/bookings/repositories/bookings.repository';
import { Repository } from 'typeorm';
import { BookingOrmEntity } from '../entities/booking.orm-entity';

@Injectable()
export class BookingRepositoryTypeOrm implements BookingRepository {
  constructor(
    @InjectRepository(BookingOrmEntity)
    private readonly repo: Repository<BookingOrmEntity>,
  ) {}
  async update(booking: Booking): Promise<void> {
    await this.repo.update(booking.id, { ...booking });
  }

  async create(booking: Booking): Promise<void> {
    const entity = this.repo.create({ ...booking });
    await this.repo.save(entity);
  }

  async findById(id: string): Promise<Booking | null> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) return null;
    return new Booking(
      entity.id,
      entity.userId,
      entity.roomId,
      entity.checkIn,
      entity.checkOut,
      entity.status as any,
    );
  }

  async cancel(id: string): Promise<void> {
    await this.repo.update(id, { status: 'CANCELLED' });
  }

  async listByUser(userId: string): Promise<Booking[]> {
    const entities = await this.repo.findBy({ userId });
    return entities.map(
      (e) =>
        new Booking(
          e.id,
          e.userId,
          e.roomId,
          e.checkIn,
          e.checkOut,
          e.status as any,
        ),
    );
  }
}
