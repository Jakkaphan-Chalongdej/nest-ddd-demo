import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('bookings')
export class BookingOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  user_id: string;

  @Column()
  room_id: string;

  @Column()
  check_in: Date;

  @Column()
  check_out: Date;

  @Column()
  status: string;
}
