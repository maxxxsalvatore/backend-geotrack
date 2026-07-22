import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, AccessCodeLoginDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.loginUser(dto);
  }

  @Post('access-code')
  loginAccessCode(@Body() dto: AccessCodeLoginDto) {
    return this.authService.loginWithAccessCode(dto);
  }
}