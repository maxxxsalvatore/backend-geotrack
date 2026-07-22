import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  private locations = [];

  create(userId: string, createLocationDto: CreateLocationDto) {
    const newLocation = {
      id: `loc-${Date.now()}`,
      userId,
      ...createLocationDto,
      createdAt: new Date().toISOString(),
    };
    this.locations.push(newLocation);
    return {
      message: 'Koordinat lokasi berhasil dicatat!',
      data: newLocation,
    };
  }

  findAll() {
    return {
      total: this.locations.length,
      data: this.locations,
    };
  }
}