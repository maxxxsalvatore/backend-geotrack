import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'supersecretkey', // Sesuaikan dengan secret di auth kamu
    });
  }

  async validate(payload: any) {
    // Payload ini adalah isi decoded token JWT kamu
    return { userId: payload.sub, email: payload.email };
  }
}