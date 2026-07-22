import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Attendance Management')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // PUBLIC: Portal staff bisa check-in langsung
  @Post('check-in')
  @ApiOperation({ summary: 'Lakukan Presensi Check-In (Wajib di dalam Geofence)' })
  checkIn(@Body() dto: CheckInDto) {
    // Ambil userId langsung dari objek DTO, lalu kirim 2 argumen ke Service
    return this.attendanceService.checkIn(dto.userId, dto);
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