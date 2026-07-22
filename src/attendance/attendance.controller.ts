import { Controller, Get, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Attendance Management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  @ApiOperation({ summary: 'Lakukan Presensi Check-In (Wajib di dalam Geofence)' })
  checkIn(@Request() req, @Body() checkInDto: CheckInDto) {
    const userId = req.user?.id || req.user?.userId || 'user-demo-123';
    return this.attendanceService.checkIn(userId, checkInDto);
  }

  @Get()
  @ApiOperation({ summary: 'Ambil riwayat seluruh presensi' })
  findAll() {
    return this.attendanceService.findAll();
  }
}