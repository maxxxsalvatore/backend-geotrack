import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { GeofenceModule } from './geofence/geofence.module';

@Module({
  imports: [AuthModule, LocationModule, GeofenceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}