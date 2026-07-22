import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckInDto {
  @ApiProperty({ description: 'ID User / Staff yang melakukan presensi', example: 'staff-001' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID Geofence tujuan presensi' })
  @IsString()
  @IsNotEmpty()
  geofenceId: string;

  @ApiProperty({ description: 'Koordinat Latitude', example: -6.174444 })
  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @ApiProperty({ description: 'Koordinat Longitude', example: 106.829444 })
  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}