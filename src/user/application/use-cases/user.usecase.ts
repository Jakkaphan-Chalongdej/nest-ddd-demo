import * as bcrypt from 'bcrypt';
import { User } from 'src/user/domain/entities/users.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export class UserUseCase {
  constructor(private readonly userRepo: UserRepository) {}

  async create(input: Partial<User>): Promise<void> {
    const hashed = await bcrypt.hash(input.password, 10);
    const user = new User(uuidv4(), input.email, hashed);
    await this.userRepo.create(user);
  }

  async get(input: { id: string }): Promise<User | null> {
    return this.userRepo.findById(input.id);
  }

  async list(): Promise<User[]> {
    return this.userRepo.list();
  }

  async update(id: string, input: Partial<User>): Promise<void> {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new Error('User not found');
    }
    if (input.password) {
      user.password = await bcrypt.hash(input.password, 10);
    }
    const updatedUser = new User(
      id,
      input.email || user.email,
      input.password || user.password,
      input.name || user.name,
    );
    await this.userRepo.update(updatedUser);
  }

  async delete(input: { id: string }): Promise<void> {
    const user = await this.userRepo.findById(input.id);
    if (!user) {
      throw new Error('User not found');
    }
    await this.userRepo.delete(user.id);
  }
}
