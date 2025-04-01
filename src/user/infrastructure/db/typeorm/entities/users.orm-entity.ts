import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('users')
export class UserOrmEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
