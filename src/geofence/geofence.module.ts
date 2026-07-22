import { Module } from '@nestjs/common';
import { GeofenceService } from './geofence.service';
import { GeofenceController } from './geofence.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [GeofenceController],
  providers: [GeofenceService],
})
export class GeofenceModule {}