import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/jwt/decorators/auth';
import { RoomUseCase } from 'src/rooms/application';
import { CreateRoomDto } from 'src/rooms/application/rooms/dto/create-room.dto';
import { UpdateRoomDto } from 'src/rooms/application/rooms/dto/update-room.dto';

@ApiTags('rooms')
@Controller('rooms')
@Auth()
export class RoomController {
  constructor(private readonly roomUseCase: RoomUseCase) {}

  @Post()
  async create(@Body() body: CreateRoomDto) {
    await this.roomUseCase.create(body);
    return { message: 'Room created successfully' };
  }

  @Get()
  async list() {
    const rooms = await this.roomUseCase.list();
    return { rooms };
  }

  @Get(':roomId')
  async get(@Body() body: any) {
    const room = await this.roomUseCase.get({
      roomId: body.roomId,
    });
    return { room };
  }

  @Patch(':roomId')
  async update(@Param('roomId') roomId: string, @Body() body: UpdateRoomDto) {
    await this.roomUseCase.update(roomId, body);
    return { message: 'Room updated successfully' };
  }
}
