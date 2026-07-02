import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class TripsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAllByUser(userId: string) {
    return this.prisma.trip.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
      include: { _count: { select: { points: true, markers: true } } },
    });
  }

  findById(id: string) {
    return this.prisma.trip.findUnique({ where: { id } });
  }

  create(userId: string, title: string, description?: string) {
    return this.prisma.trip.create({
      data: { userId, title, description, startDate: new Date() },
    });
  }

  update(id: string, data: { title?: string; description?: string }) {
    return this.prisma.trip.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.trip.delete({ where: { id } });
  }

  finish(id: string) {
    return this.prisma.trip.update({
      where: { id },
      data: { endDate: new Date(), isActive: false },
    });
  }

  async getStats(id: string) {
    const [points, markers] = await Promise.all([
      this.prisma.gpsPoint.findMany({ where: { tripId: id }, orderBy: { timestamp: 'asc' } }),
      this.prisma.marker.findMany({ where: { tripId: id } }),
    ]);

    const totalDistance = this.calculateDistance(points);
    const totalTime = points.length > 0
      ? (points[points.length - 1].timestamp.getTime() - points[0].timestamp.getTime()) / 1000
      : 0;

    const markersByType = markers.reduce((acc, m) => {
      acc[m.type] = (acc[m.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return { totalDistance, totalTime, markersCount: markers.length, markersByType };
  }

  private calculateDistance(points: { latitude: number; longitude: number }[]): number {
    let distance = 0;
    for (let i = 1; i < points.length; i++) {
      distance += this.haversine(
        points[i - 1].latitude, points[i - 1].longitude,
        points[i].latitude, points[i].longitude,
      );
    }
    return Math.round(distance * 100) / 100;
  }

  private haversine(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLon = this.toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 +
      Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  private toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
}
