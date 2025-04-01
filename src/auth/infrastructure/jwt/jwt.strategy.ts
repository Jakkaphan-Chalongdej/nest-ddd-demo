import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey:
        process.env.JWT_SECRET ||
        'd33b934d315c21022274712b1d26ff96126b8ef67953745a770fd4c9f3ecf17e',
    });
  }

  async validate(payload): Promise<any> {
    return payload;
  }
}
