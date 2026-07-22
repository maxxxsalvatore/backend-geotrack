import { ApiProperty } from '@nestjs/swagger';

export class CheckInDto {
  @ApiProperty({ example: 'ID_GEOFENCE_DARI_DB', description: 'ID Area Geofence lokasi presensi' })
  geofenceId: string;

  @ApiProperty({ example: -6.200000, description: 'Latitude posisi user saat check-in' })
  latitude: number;

  @ApiProperty({ example: 106.816666, description: 'Longitude posisi user saat check-in' })
  longitude: number;
}