import { Injectable } from '@nestjs/common';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  private locationLogs = [];

  create(userId: string, createLocationDto: CreateLocationDto) {
    const newLog = {
      id: `loc-${Date.now()}`,
      userId,
      ...createLocationDto,
      createdAt: new Date().toISOString(),
    };
    this.locationLogs.push(newLog);
    return {
      message: 'Koordinat lokasi berhasil dicatat!',
      data: newLog,
    };
  }

  findAll() {
    return {
      total: this.locationLogs.length,
      data: this.locationLogs,
    };
  }
}