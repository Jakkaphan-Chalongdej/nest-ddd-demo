import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('rooms')
export class RoomOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  capacity: number;

  @Column('simple-array')
  amenities: string[];

  @Column()
  location: string;
}
