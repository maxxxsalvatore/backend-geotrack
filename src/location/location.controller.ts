import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Location Tracking')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Kirim koordinat lokasi tim lapangan' })
  create(@Request() req, @Body() createLocationDto: CreateLocationDto) {
    const userId = req.user?.id || req.user?.userId || 'user-demo-123';
    return this.locationService.create(userId, createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua riwayat lokasi' })
  findAll() {
    return this.locationService.findAll();
  }
}