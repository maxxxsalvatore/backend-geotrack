import { ApiProperty } from '@nestjs/swagger';

export class CheckGeofenceDto {
  @ApiProperty({ example: 'geo-1784720516576', description: 'ID area geofence' })
  geofenceId: string;

  @ApiProperty({ example: -6.200000, description: 'Latitude posisi user saat ini' })
  userLatitude: number;

  @ApiProperty({ example: 106.816666, description: 'Longitude posisi user saat ini' })
  userLongitude: number;
}