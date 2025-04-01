import { User } from '../entities/users.entity';

export interface UserRepository {
  create(booking: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  list(): Promise<User[]>;
  findByEmail(email: string): Promise<User | null>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
