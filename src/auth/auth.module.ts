import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/http/auth.controller';
import { CustomJwtModule } from './infrastructure/jwt/jwt.module';

@Module({
  imports: [CustomJwtModule],
  controllers: [AuthController],
})
export class AuthModule {}
