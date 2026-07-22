import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Attendance Management')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // Bikin PUBLIC agar portal staff bisa check-in langsung!
  @Post('check-in')
  @ApiOperation({ summary: 'Lakukan Presensi Check-In (Wajib di dalam Geofence)' })
  checkIn(@Body() createAttendanceDto: CreateAttendanceDto) {
    return this.attendanceService.checkIn(createAttendanceDto);
  }

  // Khusus Rekap History Presensi (Tetap diproteksi Guard untuk Admin)
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Ambil riwayat seluruh presensi' })
  findAll() {
    return this.attendanceService.findAll();
  }
}