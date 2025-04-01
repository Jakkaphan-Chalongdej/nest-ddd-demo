export class Booking {
  constructor(
    public id: string,
    public userId: string,
    public roomId: string,
    public checkIn: Date,
    public checkOut: Date,
    public status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' = 'PENDING',
  ) {}
}
