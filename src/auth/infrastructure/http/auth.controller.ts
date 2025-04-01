import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/application/dto/loging.dto';
import { RegisterDto } from 'src/auth/application/dto/register.dto';
import { AuthUseCase } from 'src/auth/application/use-cases/auth.usecase';
import { Auth } from '../jwt/decorators/auth';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.authUseCase.login({
      email: body.email,
      password: body.password,
    });
  }

  @Post('register')
  async register(@Body() body: RegisterDto) {
    await this.authUseCase.register({
      name: body.name,
      email: body.email,
      password: body.password,
    });
    return { message: 'Registered successfully' };
  }

  @Post('renew')
  @Auth('JWT_REFRESH_TOKEN')
  async refresh(@Body('refreshToken') token: string) {
    return this.authUseCase.renew(token);
  }
}
