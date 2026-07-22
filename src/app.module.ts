import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LocationModule } from './location/location.module';

@Module({
  imports: [AuthModule, LocationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}