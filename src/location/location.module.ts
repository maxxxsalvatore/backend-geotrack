import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust path sesuai lokasi PrismaModule kamu

@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}