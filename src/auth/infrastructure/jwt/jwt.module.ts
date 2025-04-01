import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthUseCase } from 'src/auth/application/use-cases/auth.usecase';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret:
        process.env.JWT_SECRET ||
        'd33b934d315c21022274712b1d26ff96126b8ef67953745a770fd4c9f3ecf17e',
      signOptions: { expiresIn: '15m' },
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
