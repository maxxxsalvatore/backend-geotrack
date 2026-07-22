import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard'; // Sekarang file ini sudah ada!

@ApiTags('Location Tracking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Mengunci seluruh endpoint lokasi dengan JWT
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Kirim koordinat lokasi tim lapangan' })
  create(@Request() req, @Body() createLocationDto: CreateLocationDto) {
    // Ambil userId otomatis dari token JWT user yang sedang login
    const userId = req.user?.id || req.user?.userId || 'user-unknown';
    return this.locationService.create(userId, createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua riwayat lokasi' })
  findAll() {
    return this.locationService.findAll();
  }
}