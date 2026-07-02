import prisma from '../prisma/client';

export class GpsService {
  async getPoints(tripId: string) {
    return prisma.gpsPoint.findMany({
      where: { tripId },
      orderBy: { timestamp: 'asc' },
      select: {
        latitude: true,
        longitude: true,
        timestamp: true,
        speed: true,
        accuracy: true,
        altitude: true,
      },
    });
  }

  async createPoint(
    tripId: string,
    data: {
      latitude: number;
      longitude: number;
      timestamp: string;
      speed?: number;
      accuracy?: number;
      altitude?: number;
    }
  ) {
    return prisma.gpsPoint.create({
      data: {
        tripId,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date(data.timestamp),
        speed: data.speed,
        accuracy: data.accuracy,
        altitude: data.altitude,
      },
    });
  }

  async createBatch(
    points: Array<{
      tripId: string;
      latitude: number;
      longitude: number;
      timestamp: string;
      speed?: number;
      accuracy?: number;
      altitude?: number;
    }>
  ) {
    return prisma.gpsPoint.createMany({
      data: points.map((p) => ({
        ...p,
        timestamp: new Date(p.timestamp),
      })),
    });
  }
}

export const gpsService = new GpsService();
