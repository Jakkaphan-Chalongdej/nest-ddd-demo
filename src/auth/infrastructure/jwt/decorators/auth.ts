import { UseGuards, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../jwt.guard';
import { JwtRefreshGuard } from '../jwt.refresh-token.guard';

export type Guard = 'JWT_ACCESS_TOKEN' | 'JWT_REFRESH_TOKEN';

export function Auth(guard: Guard = 'JWT_ACCESS_TOKEN') {
  return applyDecorators(
    UseGuards(guard === 'JWT_ACCESS_TOKEN' ? JwtAuthGuard : JwtRefreshGuard),
    ApiBearerAuth(
      guard === 'JWT_ACCESS_TOKEN' ? 'JWT_ACCESS_TOKEN' : 'JWT_REFRESH_TOKEN',
    ),
  );
}
