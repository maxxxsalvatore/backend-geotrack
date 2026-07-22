import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Attendance Management')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  @ApiOperation({ summary: 'Lakukan Presensi Check-In (Wajib di dalam Geofence)' })
  checkIn(@Body() dto: CheckInDto) {
    return this.attendanceService.checkIn(dto.userId, dto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ambil riwayat seluruh presensi' })
  findAll() {
    return this.attendanceService.findAll();
  }
}