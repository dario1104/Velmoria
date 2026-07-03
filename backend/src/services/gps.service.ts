import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class GpsService {
  async getPoints(tripId: string) {
    return prisma.gpsPoint.findMany({
      where: { tripId },
      orderBy: { timestamp: 'asc' },
    });
  }

  async getPointsByUser(userId: string, tripId?: string) {
    return prisma.gpsPoint.findMany({
      where: { userId, ...(tripId ? { tripId } : {}) },
      orderBy: { timestamp: 'asc' },
    });
  }

  async createPoint(
    tripId: string,
    userId: string,
    data: {
      latitude: number;
      longitude: number;
      timestamp: string;
      speed?: number;
      accuracy?: number;
      altitude?: number;
      bearing?: number;
      isMoving?: boolean;
    }
  ) {
    return prisma.gpsPoint.create({
      data: {
        tripId,
        userId,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date(data.timestamp),
        speed: data.speed,
        accuracy: data.accuracy,
        altitude: data.altitude,
        bearing: data.bearing,
        isMoving: data.isMoving ?? true,
      },
    });
  }

  async createBatch(
    userId: string,
    points: Array<{
      tripId: string;
      latitude: number;
      longitude: number;
      timestamp: string;
      speed?: number;
      accuracy?: number;
      altitude?: number;
      bearing?: number;
      isMoving?: boolean;
    }>
  ) {
    if (points.length === 0) {
      throw new AppError(400, 'Nessun punto da salvare');
    }
    return prisma.gpsPoint.createMany({
      data: points.map((p) => ({
        tripId: p.tripId,
        userId,
        latitude: p.latitude,
        longitude: p.longitude,
        timestamp: new Date(p.timestamp),
        speed: p.speed,
        accuracy: p.accuracy,
        altitude: p.altitude,
        bearing: p.bearing,
        isMoving: p.isMoving ?? true,
      })),
    });
  }

  async getTrackSummary(tripId: string) {
    const points = await prisma.gpsPoint.findMany({
      where: { tripId },
      orderBy: { timestamp: 'asc' },
    });
    if (points.length === 0) {
      return { totalDistance: 0, totalTime: 0, maxSpeed: 0, avgSpeed: 0, pointCount: 0 };
    }
    let totalDistance = 0;
    let maxSpeed = 0;
    for (let i = 1; i < points.length; i++) {
      const d = this.haversine(
        points[i - 1].latitude, points[i - 1].longitude,
        points[i].latitude, points[i].longitude
      );
      totalDistance += d;
      if (points[i].speed && points[i].speed! > maxSpeed) maxSpeed = points[i].speed!;
    }
    const totalTime = (points[points.length - 1].timestamp.getTime() - points[0].timestamp.getTime()) / 1000;
    const avgSpeed = totalTime > 0 ? totalDistance / totalTime * 3600 : 0;

    return { totalDistance, totalTime, maxSpeed, avgSpeed, pointCount: points.length };
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371e3;
    const toRad = (deg: number) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }
}

export const gpsService = new GpsService();
