import { Injectable } from '@nestjs/common';
import { CreateGeofenceDto } from './dto/create-geofence.dto';

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
}