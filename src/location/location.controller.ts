import { Controller, Get, Post, Body } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Location Tracking')
@ApiBearerAuth()
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Kirim koordinat lokasi tim lapangan' })
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create('user-demo-123', createLocationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil semua riwayat lokasi' })
  findAll() {
    return this.locationService.findAll();
  }
}