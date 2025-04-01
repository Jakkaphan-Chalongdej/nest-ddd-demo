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

  @Get(':id')
  async get(@Param('id') id: string) {
    const user = await this.userUseCase.get({
      id: id,
    });
    return { user };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    await this.userUseCase.update(id, body);
    return { message: 'Room updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    await this.userUseCase.delete({ id });
    return { message: 'User deleted successfully' };
  }
}
