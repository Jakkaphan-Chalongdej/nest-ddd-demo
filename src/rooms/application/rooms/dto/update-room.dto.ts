import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateRoomDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  capacity: number;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  location: string;
}
