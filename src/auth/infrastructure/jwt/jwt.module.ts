import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUseCase } from 'src/auth/application/use-cases/auth.usecase';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '15m' },
        };
      },
    }),
  ],
  providers: [
    JwtStrategy,
    {
      provide: AuthUseCase,
      useFactory: (repo: any, jwt: JwtService) => new AuthUseCase(repo, jwt),
      inject: ['UserRepository', JwtService],
    },
  ],
  exports: [
    {
      provide: AuthUseCase,
      useFactory: (repo: any, jwt: JwtService) => new AuthUseCase(repo, jwt),
      inject: ['UserRepository', JwtService],
    },
    JwtStrategy,
  ],
})
export class CustomJwtModule {}
