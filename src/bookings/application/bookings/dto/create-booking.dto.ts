import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  room_id: string;

  @ApiProperty()
  @IsNotEmpty()
  check_in: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  check_out: string;
}
