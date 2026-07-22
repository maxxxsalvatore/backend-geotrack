import { Injectable, NotFoundException } from '@nestjs/common';
import { CheckInDto } from './dto/check-in.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private prisma: PrismaService) {}

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  async checkIn(userId: string, dto: CheckInDto) {
    // 1. Cari data Geofence di database
    const geofence = await this.prisma.geofence.findUnique({
      where: { id: dto.geofenceId },
    });

    if (!geofence) {
      throw new NotFoundException('Area Geofence tidak ditemukan!');
    }

    // 2. Hitung jarak koordinat (hanya untuk log / catatan info)
    const distance = this.calculateDistance(
      dto.latitude,
      dto.longitude,
      geofence.latitude,
      geofence.longitude,
    );

    // 3. Simpan presensi - BISA CHECK-IN DARI MANA SAJA TANPA SYARAT
    const attendance = await this.prisma.attendance.create({
      data: {
        userId,
        geofenceId: dto.geofenceId,
        latitude: dto.latitude,
        longitude: dto.longitude,
        status: 'SUCCESS',
      },
    });

    return {
      message: `Presensi Check-In Berhasil di ${geofence.name}! (Jarak terdeteksi: ${Math.round(distance)}m)`,
      data: attendance,
    };
  }

  async findAll() {
    const data = await this.prisma.attendance.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      total: data.length,
      data,
    };
  }
}