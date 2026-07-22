import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';
import { PrismaService } from '../prisma/prisma.service'; // Sesuaikan path PrismaService kamu

@Injectable()
export class LocationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, createLocationDto: CreateLocationDto) {
    const newLocation = await this.prisma.location.create({
      data: {
        userId,
        latitude: createLocationDto.latitude,
        longitude: createLocationDto.longitude,
        note: createLocationDto.note,
      },
    });

    return {
      message: 'Koordinat lokasi berhasil dicatat di database!',
      data: newLocation,
    };
  }

  async findAll() {
    const logs = await this.prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      total: logs.length,
      data: logs,
    };
  }
}