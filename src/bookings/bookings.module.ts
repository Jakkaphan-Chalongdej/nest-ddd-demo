import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BookingUseCase } from './application/bookings/use-cases/booking.usecase';
import { BookingOrmEntity } from './infrastructure/db/typeorm/entities/booking.orm-entity';
import { BookingRepositoryTypeOrm } from './infrastructure/db/typeorm/repositories/booking.repository.impl';
import { BookingController } from './infrastructure/http/controllers/booking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BookingOrmEntity])],
  controllers: [BookingController],
  providers: [
    BookingRepositoryTypeOrm,
    {
      provide: 'BookingRepository',
      useExisting: BookingRepositoryTypeOrm,
    },
    {
      provide: BookingUseCase,
      useFactory: (repo: BookingRepositoryTypeOrm) => new BookingUseCase(repo),
      inject: [BookingRepositoryTypeOrm],
    },
  ],
})
export class BookingModule {}
