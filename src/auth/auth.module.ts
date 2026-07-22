import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'rahasiasuperaman123',
      signOptions: { expiresIn: '7d' }, // Token berlaku 7 hari
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}