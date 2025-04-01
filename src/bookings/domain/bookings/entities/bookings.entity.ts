export class Booking {
  constructor(
    public id: string,
    public user_id: string,
    public room_id: string,
    public check_in: Date,
    public check_out: Date,
    public status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' = 'PENDING',
  ) {}
}
