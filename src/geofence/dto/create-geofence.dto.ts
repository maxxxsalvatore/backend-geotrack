import { ApiProperty } from '@nestjs/swagger';

export class CreateGeofenceDto {
  @ApiProperty({ example: 'Area Proyek Beach Club', description: 'Nama area geofence' })
  name: string;

  @ApiProperty({ example: -6.200000, description: 'Latitude titik pusat area' })
  latitude: number;

  @ApiProperty({ example: 106.816666, description: 'Longitude titik pusat area' })
  longitude: number;

  @ApiProperty({ example: 500, description: 'Radius batas area dalam meter' })
  radiusInMeters: number;
}