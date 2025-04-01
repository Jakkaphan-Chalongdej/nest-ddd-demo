import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/infrastructure/jwt/decorators/auth';
import { CreateUserDto } from 'src/user/application/dto/create-user.dto';
import { UpdateUserDto } from 'src/user/application/dto/update-user.dto';
import { UserUseCase } from 'src/user/application/use-cases/user.usecase';

@ApiTags('users')
@Controller('users')
@Auth()
export class UserController {
  constructor(private readonly userUseCase: UserUseCase) {}

  @Post()
  async create(@Body() body: CreateUserDto) {
    await this.userUseCase.create(body);
    return { message: 'User created successfully' };
  }

  @Get()
  async list() {
    const users = await this.userUseCase.list();
    return { users };
  }

  @Get(':userId')
  async get(@Param('userId') userId: string) {
    const user = await this.userUseCase.get({
      userId: userId,
    });
    return { user };
  }

  @Patch(':userId')
  async update(@Param('userId') userId: string, @Body() body: UpdateUserDto) {
    await this.userUseCase.update(userId, body);
    return { message: 'Room updated successfully' };
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string) {
    await this.userUseCase.delete({ userId });
    return { message: 'User deleted successfully' };
  }
}
