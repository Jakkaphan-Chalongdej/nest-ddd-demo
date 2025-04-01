import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomUseCase } from './application';
import { RoomOrmEntity } from './infrastructure/db/typeorm/entities/room.orm-entity';
import { RoomRepositoryTypeOrm } from './infrastructure/db/typeorm/repositories/room.repository.impl';
import { RoomController } from './infrastructure/http/controllers/room.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RoomOrmEntity])],
  controllers: [RoomController],
  providers: [
    RoomRepositoryTypeOrm,
    {
      provide: 'RoomRepository',
      useExisting: RoomRepositoryTypeOrm,
    },
    {
      provide: RoomUseCase,
      useFactory: (repo: RoomRepositoryTypeOrm) => new RoomUseCase(repo),
      inject: [RoomRepositoryTypeOrm],
    },
  ],
})
export class RoomModule {}
