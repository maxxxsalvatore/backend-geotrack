import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import * as argon2 from 'argon2';
import { LoginDto, AccessCodeLoginDto } from './dto/auth.dto';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // 1. Login Admin/Staff via Email & Password
  async loginUser(dto: LoginDto) {
    const user = await prisma.user.findUnique({
      where: { email: dto.email },
      include: { department: true },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Kredensial tidak valid atau akun nonaktif.');
    }

    const passwordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Email atau password salah.');
    }

    const payload = { sub: user.id, email: user.email, role: 'ADMIN', dept: user.department?.code };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        department: user.department?.name,
      },
    };
  }

  // 2. Login Tim Lapangan via Access Code
  async loginWithAccessCode(dto: AccessCodeLoginDto) {
    const codeData = await prisma.divisionAccessCode.findUnique({
      where: { code: dto.accessCode },
      include: { department: true },
    });

    if (!codeData || !codeData.isActive) {
      throw new UnauthorizedException('Kode Akses tidak valid atau sudah tidak aktif.');
    }

    const payload = { sub: codeData.id, role: 'FIELD_TEAM', roleName: codeData.roleName, dept: codeData.department?.code };
    return {
      access_token: await this.jwtService.signAsync(payload),
      fieldTeam: {
        id: codeData.id,
        code: codeData.code,
        roleName: codeData.roleName,
        department: codeData.department?.name,
      },
    };
  }
}