import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty({ example: -6.200000, description: 'Latitude koordinat GPS' })
  latitude: number;

  @ApiProperty({ example: 106.816666, description: 'Longitude koordinat GPS' })
  longitude: number;

  @ApiProperty({ example: 'Pos Checkpoint Utama', description: 'Catatan lokasi', required: false })
  note?: string;
}