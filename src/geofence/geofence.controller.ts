import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { CreateGeofenceDto } from './dto/create-geofence.dto';
import { CheckGeofenceDto } from './dto/check-geofence.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Geofence Management')
@Controller('geofence')
export class GeofenceController {
  constructor(private readonly geofenceService: GeofenceService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Buat area geofence operasional baru' })
  create(@Body() createGeofenceDto: CreateGeofenceDto) {
    return this.geofenceService.create(createGeofenceDto);
  }

  // PUBLIC: Agar portal staff bisa ambil list geofence tanpa login JWT
  @Get()
  @ApiOperation({ summary: 'Ambil daftar seluruh area geofence' })
  findAll() {
    return this.geofenceService.findAll();
  }

  @Post('check')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Cek apakah posisi koordinat user berada di dalam area geofence' })
  check(@Body() checkGeofenceDto: CheckGeofenceDto) {
    return this.geofenceService.checkInside(checkGeofenceDto);
  }
}