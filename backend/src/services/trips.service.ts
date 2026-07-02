import prisma from '../prisma/client';
import { calculateDistance } from '../utils/helpers';

export class TripsService {
  async findAll(userId: string) {
    return prisma.trip.findMany({
      where: { userId },
      orderBy: { startDate: 'desc' },
      include: {
        _count: { select: { points: true, markers: true } },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const trip = await prisma.trip.findUnique({ where: { id } });
    if (!trip || trip.userId !== userId) {
      throw { statusCode: 404, message: 'Trip non trovato' };
    }
    return trip;
  }

  async create(userId: string, title: string, description?: string) {
    return prisma.trip.create({
      data: { userId, title, description, startDate: new Date() },
    });
  }

  async update(userId: string, id: string, data: { title?: string; description?: string }) {
    await this.findOne(userId, id);
    return prisma.trip.update({ where: { id }, data });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return prisma.trip.delete({ where: { id } });
  }

  async finish(userId: string, id: string) {
    await this.findOne(userId, id);
    return prisma.trip.update({
      where: { id },
      data: { endDate: new Date(), isActive: false },
    });
  }

  async getStats(userId: string, id: string) {
    await this.findOne(userId, id);

    const [points, markers] = await Promise.all([
      prisma.gpsPoint.findMany({
        where: { tripId: id },
        orderBy: { timestamp: 'asc' },
      }),
      prisma.marker.findMany({ where: { tripId: id } }),
    ]);

    const totalDistance = calculateDistance(points);
    const totalTime =
      points.length > 0
        ? (points[points.length - 1].timestamp.getTime() -
            points[0].timestamp.getTime()) / 1000
        : 0;

    const markersByType = markers.reduce(
      (acc, m) => {
        acc[m.type] = (acc[m.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return { totalDistance, totalTime, markersCount: markers.length, markersByType };
  }
}

export const tripsService = new TripsService();
