import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { CheckGeofenceDto } from './dto/check-geofence.dto'; // Import DTO baru
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Geofence Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('geofence')
export class GeofenceController {
  constructor(private readonly geofenceService: GeofenceService) {}

  @Post()
  @ApiOperation({ summary: 'Buat area geofence operasional baru' })
  create(@Body() createGeofenceDto: CreateGeofenceDto) {
    return this.geofenceService.create(createGeofenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil daftar seluruh area geofence' })
  findAll() {
    return this.geofenceService.findAll();
  }

  @Post('check')
  @ApiOperation({ summary: 'Cek apakah posisi koordinat user berada di dalam area geofence' })
  check(@Body() checkGeofenceDto: CheckGeofenceDto) {
    return this.geofenceService.checkInside(checkGeofenceDto);
  }
}