import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class ReplayService {
  async getReplayData(tripId: string) {
    const trip = await prisma.trip.findUnique({ where: { id: tripId } });
    if (!trip) throw new AppError(404, 'Trip non trovato');

    const [gpsPoints, markers, timelineEvents] = await Promise.all([
      prisma.gpsPoint.findMany({
        where: { tripId },
        orderBy: { timestamp: 'asc' },
      }),
      prisma.marker.findMany({
        where: { tripId },
        orderBy: { createdAt: 'asc' },
        include: { media: true },
      }),
      prisma.timelineEvent.findMany({
        where: { tripId },
        orderBy: { timestamp: 'asc' },
      }),
    ]);

    return {
      trip,
      gpsPoints,
      markers,
      timelineEvents,
    };
  }
}

export const replayService = new ReplayService();
