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
      user_id: body.user_id,
      room_id: body.room_id,
      check_in: new Date(body.check_in),
      check_out: new Date(body.check_out),
    });
    return { message: 'Booking created successfully' };
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.bookingUseCase.cancel({
      id,
    });
    return { message: 'Booking cancelled successfully' };
  }

  @Get(':id')
  async get(@Param('id') id: string) {
    const booking = await this.bookingUseCase.get({
      id: id,
    });
    return { booking };
  }

  @Get('user/:user_id')
  async listByUser(@Param('user_id') user_id: string) {
    const bookings = await this.bookingUseCase.listByUser({
      user_id: user_id,
    });
    return { bookings };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateBookingDto) {
    await this.bookingUseCase.update(id, {
      ...body,
      check_in: new Date(body.check_in),
      check_out: new Date(body.check_out),
    });
    return { message: 'Booking updated successfully' };
  }
}
