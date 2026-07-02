import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { GpsService } from './gps.service';
import { CreateGpsPointDto } from './dto/create-gps-point.dto';
import { BatchGpsPointsDto } from './dto/batch-gps-points.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class GpsController {
  constructor(private readonly gpsService: GpsService) {}

  @Get('trips/:tripId/gps')
  getPoints(@Param('tripId') tripId: string) {
    return this.gpsService.getPoints(tripId);
  }

  @Post('trips/:tripId/gps')
  createPoint(@Param('tripId') tripId: string, @Body() dto: CreateGpsPointDto) {
    return this.gpsService.createPoint(tripId, dto);
  }

  @Post('gps/batch')
  createBatch(@Body() dto: BatchGpsPointsDto) {
    return this.gpsService.createBatch(dto);
  }
}
