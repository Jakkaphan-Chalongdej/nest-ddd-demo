import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  roomId: string;

  @ApiProperty()
  @IsNotEmpty()
  checkIn: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  checkOut: Date;
}
