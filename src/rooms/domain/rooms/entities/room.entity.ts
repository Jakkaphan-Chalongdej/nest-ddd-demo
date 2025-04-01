export class Room {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public price: number,
    public capacity: number,
    public amenities: string[],
    public location: string,
  ) {}
}
