import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/domain/entities/users.entity';
import { UserRepository } from 'src/user/domain/repositories/user.repository';
import { v4 as uuidv4 } from 'uuid';

export class AuthUseCase {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async register(input: {
    email: string;
    password: string;
    name: string;
  }): Promise<void> {
    const hashed = await bcrypt.hash(input.password, 10);
    const user = new User(uuidv4(), input.email, hashed, input.name);
    await this.userRepo.create(user);
  }

  async login(input: { email: string; password: string }) {
    const user = await this.userRepo.findByEmail(input.email);
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(input.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const payload = { sub: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    return { access_token, refresh_token };
  }

  async renew(refreshToken: string) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);
      const new_access_token = await this.jwtService.signAsync(
        {
          sub: payload.sub,
          email: payload.email,
        },
        { expiresIn: '15m' },
      );

      return { access_token: new_access_token };
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
  }
}
