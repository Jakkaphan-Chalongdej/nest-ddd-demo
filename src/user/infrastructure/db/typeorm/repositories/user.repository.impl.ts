import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/domain/entities/users.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { Repository } from 'typeorm';
import { UserOrmEntity } from '../entities/users.orm-entity';

@Injectable()
export class UserRepositoryTypeOrm implements UserRepository {
  constructor(
    @InjectRepository(UserOrmEntity)
    private readonly repo: Repository<UserOrmEntity>,
  ) {}

  async create(user: User): Promise<void> {
    await this.repo.save(user);
  }

  async findById(id: string): Promise<User | null> {
    const entity = await this.repo.findOneBy({ id });
    if (!entity) return null;
    return new User(entity.id, entity.email, entity.name);
  }

  async list(): Promise<User[]> {
    const entities = await this.repo.find();
    return entities.map((e) => new User(e.id, e.email, e.name));
  }

  async findByEmail(email: string): Promise<User | null> {
    const entity = await this.repo.findOne({ where: { email } });
    if (!entity) return null;
    return new User(entity.id, entity.email, entity.password, entity.name);
  }

  async update(user: User): Promise<void> {
    await this.repo.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
