import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserUseCase } from './application/use-cases/user.usecase';
import { UserOrmEntity } from './infrastructure/db/typeorm/entities/users.orm-entity';
import { UserRepositoryTypeOrm } from './infrastructure/db/typeorm/repositories/user.repository.impl';
import { UserController } from './infrastructure/http/controllers/user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  controllers: [UserController],
  providers: [
    UserRepositoryTypeOrm,
    {
      provide: 'UserRepository',
      useExisting: UserRepositoryTypeOrm,
    },
    {
      provide: UserUseCase,
      useFactory: (repo: UserRepositoryTypeOrm) => new UserUseCase(repo),
      inject: [UserRepositoryTypeOrm],
    },
  ],
  exports: ['UserRepository', UserUseCase],
})
export class UserModule {}
