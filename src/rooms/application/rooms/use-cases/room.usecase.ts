import { Room, RoomRepository } from 'src/rooms/domain';
import { v4 as uuidv4 } from 'uuid';
export class RoomUseCase {
  constructor(private readonly roomRepo: RoomRepository) {}

  async create(input: Partial<Room>): Promise<void> {
    const room = new Room(
      uuidv4(),
      input.name,
      input.description,
      input.price,
      input.capacity,
      input.amenities,
      input.location,
    );
    await this.roomRepo.create(room);
  }

  async get(input: { id: string }): Promise<any> {
    return this.roomRepo.findById(input.id);
  }

  async list(): Promise<any[]> {
    return this.roomRepo.list();
  }

  async update(id: string, input: Partial<Room>): Promise<void> {
    const room = await this.roomRepo.findById(id);
    if (!room) {
      throw new Error('Room not found');
    }
    const updatedRoom = new Room(
      room.id,
      input.name || room.name,
      input.description || room.description,
      input.price || room.price,
      input.capacity || room.capacity,
      input.amenities || room.amenities,
      input.location || room.location,
    );
    await this.roomRepo.update(updatedRoom);
  }
}
