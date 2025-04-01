import { Room } from '../entities/room.entity';

export interface RoomRepository {
  create(room: Room): Promise<void>;
  findById(id: string): Promise<Room | null>;
  list(): Promise<Room[]>;
  update(room: Room): Promise<void>;
}
