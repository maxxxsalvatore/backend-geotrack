import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { CheckGeofenceDto } from './dto/check-geofence.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class GeofenceService {
  constructor(private prisma: PrismaService) {}

  async create(createGeofenceDto: CreateGeofenceDto) {
    const newGeofence = await this.prisma.geofence.create({
      data: createGeofenceDto,
    });

    return {
      message: 'Area Geofence berhasil dibuat dan disimpan ke database!',
      data: newGeofence,
    };
  }

  async findAll() {
    const geofences = await this.prisma.geofence.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return {
      total: geofences.length,
      data: geofences,
    };
  }

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

  async checkInside(dto: CheckGeofenceDto) {
    const geofence = await this.prisma.geofence.findUnique({
      where: { id: dto.geofenceId },
    });

    if (!geofence) {
      throw new NotFoundException('Geofence ID tidak ditemukan di database!');
    }

    const distanceInMeters = this.calculateDistance(
      dto.userLatitude,
      dto.userLongitude,
      geofence.latitude,
      geofence.longitude,
    );

    const isInside = distanceInMeters <= geofence.radiusInMeters;

    return {
      geofenceName: geofence.name,
      distanceInMeters: Math.round(distanceInMeters),
      allowedRadius: geofence.radiusInMeters,
      isInside,
      status: isInside ? 'INSIDE_GEOFENCE' : 'OUTSIDE_GEOFENCE',
      message: isInside
        ? 'User berada di dalam area geofence!'
        : `User di luar area! Jarak user ke pusat area: ${Math.round(distanceInMeters)}m (Maksimal: ${geofence.radiusInMeters}m)`,
    };
  }
}