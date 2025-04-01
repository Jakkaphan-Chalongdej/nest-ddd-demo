import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('bookings')
export class BookingOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  roomId: string;

  @Column()
  checkIn: Date;

  @Column()
  checkOut: Date;

  @Column()
  status: string;
}
