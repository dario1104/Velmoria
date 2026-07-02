import { Module } from '@nestjs/common';
import { GpsController } from './gps.controller';
import { GpsService } from './gps.service';
import { GpsRepository } from './gps.repository';

@Module({
  controllers: [GpsController],
  providers: [GpsService, GpsRepository],
})
export class GpsModule {}
