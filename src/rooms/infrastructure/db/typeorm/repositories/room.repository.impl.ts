import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Room, RoomRepository } from 'src/rooms/domain';
import { Repository } from 'typeorm';
import { RoomOrmEntity } from '../entities/room.orm-entity';

@Injectable()
export class RoomRepositoryTypeOrm implements RoomRepository {
  constructor(
    @InjectRepository(RoomOrmEntity)
    private readonly repo: Repository<RoomOrmEntity>,
  ) {}

  async create(room: RoomOrmEntity): Promise<void> {
    await this.repo.save(room);
  }

  async findById(id: string): Promise<RoomOrmEntity | null> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) return null;
    return new Room(
      entity.id,
      entity.name,
      entity.description,
      entity.price,
      entity.capacity,
      entity.amenities,
      entity.location,
    );
  }

  async list(): Promise<RoomOrmEntity[]> {
    const entities = await this.repo.find();
    return entities.map(
      (e) =>
        new Room(
          e.id,
          e.name,
          e.description,
          e.price,
          e.capacity,
          e.amenities,
          e.location,
        ),
    );
  }

  async update(room: RoomOrmEntity): Promise<void> {
    await this.repo.save(room);
  }
}
