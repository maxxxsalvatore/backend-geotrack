import { Controller, Get, Post, Body } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CheckInDto } from './dto/check-in.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Attendance Management')
@Controller('attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  // PUBLIC: Portal staff bisa check-in langsung
  @Post('check-in')
  @ApiOperation({ summary: 'Lakukan Presensi Check-In (Wajib di dalam Geofence)' })
  checkIn(@Body() dto: CheckInDto) {
    return this.attendanceService.checkIn(dto.userId, dto);
  }

  // PUBLIC: Dashboard Admin bisa ambil riwayat presensi tanpa token
  @Get()
  @ApiOperation({ summary: 'Ambil riwayat seluruh presensi' })
  findAll() {
    return this.attendanceService.findAll();
  }
}