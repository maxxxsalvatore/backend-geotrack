import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';
import { GeofenceModule } from './geofence/geofence.module';
import { PrismaModule } from './prisma/prisma.module';
import { AttendanceModule } from './attendance/attendance.module'; // 1. Import modul attendance

@Module({
  imports: [
    AuthModule,
    LocationModule,
    GeofenceModule,
    PrismaModule,
    AttendanceModule, // 2. Tambahkan di sini
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}