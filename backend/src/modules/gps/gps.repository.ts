import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateGpsPointDto } from './dto/create-gps-point.dto';

@Injectable()
export class GpsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByTrip(tripId: string) {
    return this.prisma.gpsPoint.findMany({
      where: { tripId },
      orderBy: { timestamp: 'asc' },
      select: { latitude: true, longitude: true, timestamp: true, speed: true },
    });
  }

  create(tripId: string, dto: CreateGpsPointDto) {
    return this.prisma.gpsPoint.create({
      data: { tripId, ...dto, timestamp: new Date(dto.timestamp) },
    });
  }

  createBatch(points: (CreateGpsPointDto & { tripId: string })[]) {
    return this.prisma.gpsPoint.createMany({
      data: points.map(p => ({ ...p, timestamp: new Date(p.timestamp) })),
    });
  }
}
