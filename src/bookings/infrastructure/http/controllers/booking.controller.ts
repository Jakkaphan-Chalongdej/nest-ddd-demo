import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/jwt/decorators/auth';
import { CreateBookingDto } from 'src/bookings/application/bookings/dto/create-booking.dto';
import { UpdateBookingDto } from 'src/bookings/application/bookings/dto/update-booking.dto';
import { BookingUseCase } from 'src/bookings/application/bookings/use-cases/booking.usecase';

@ApiTags('bookings')
@Controller('bookings')
@Auth()
export class BookingController {
  constructor(private readonly bookingUseCase: BookingUseCase) {}

  @Post()
  async create(@Body() body: CreateBookingDto) {
    await this.bookingUseCase.create({
      userId: body.userId,
      roomId: body.roomId,
      checkIn: new Date(body.checkIn),
      checkOut: new Date(body.checkOut),
    });
    return { message: 'Booking created successfully' };
  }

  @Post(':bookingId/cancel')
  async cancel(@Param('bookingId') bookingId: string) {
    await this.bookingUseCase.cancel({
      bookingId,
    });
    return { message: 'Booking cancelled successfully' };
  }

  @Get(':bookingId')
  async get(@Param('bookingId') bookingId: string) {
    const booking = await this.bookingUseCase.get({
      bookingId: bookingId,
    });
    return { booking };
  }

  @Get('user/:userId')
  async listByUser(@Param('userId') userId: string) {
    const bookings = await this.bookingUseCase.listByUser({
      userId: userId,
    });
    return { bookings };
  }

  @Patch(':bookingId')
  async update(
    @Param('bookingId') bookingId: string,
    @Body() body: UpdateBookingDto,
  ) {
    await this.bookingUseCase.update(bookingId, body);
    return { message: 'Booking updated successfully' };
  }
}
