import { Injectable } from '@nestjs/common';
import { GpsRepository } from './gps.repository';
import { CreateGpsPointDto } from './dto/create-gps-point.dto';
import { BatchGpsPointsDto } from './dto/batch-gps-points.dto';

@Injectable()
export class GpsService {
  constructor(private readonly gpsRepository: GpsRepository) {}

  getPoints(tripId: string) {
    return this.gpsRepository.findByTrip(tripId);
  }

  createPoint(tripId: string, dto: CreateGpsPointDto) {
    return this.gpsRepository.create(tripId, dto);
  }

  createBatch(dto: BatchGpsPointsDto) {
    return this.gpsRepository.createBatch(dto.points);
  }
}
