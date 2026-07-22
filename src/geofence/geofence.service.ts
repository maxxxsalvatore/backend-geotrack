import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { CheckGeofenceDto } from './dto/check-geofence.dto';

@Injectable()
export class GeofenceService {
  private geofences = [];

  create(createGeofenceDto: CreateGeofenceDto) {
    const newGeofence = {
      id: `geo-${Date.now()}`,
      ...createGeofenceDto,
      createdAt: new Date().toISOString(),
    };
    this.geofences.push(newGeofence);
    return {
      message: 'Area Geofence berhasil dibuat!',
      data: newGeofence,
    };
  }

  findAll() {
    return {
      total: this.geofences.length,
      data: this.geofences,
    };
  }

  // Rumus Haversine untuk menghitung jarak antara dua koordinat (dalam meter)
  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3; // Radius bumi dalam meter
    const rad = Math.PI / 180;
    const dLat = (lat2 - lat1) * rad;
    const dLon = (lon2 - lon1) * rad;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Hasil dalam meter
  }

  checkInside(dto: CheckGeofenceDto) {
    const geofence = this.geofences.find((g) => g.id === dto.geofenceId);

    if (!geofence) {
      throw new NotFoundException('Geofence ID tidak ditemukan!');
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