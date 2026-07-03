import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class DiaryService {
  async findByTrip(tripId: string) {
    return prisma.diaryEntry.findMany({
      where: { tripId },
      orderBy: { date: 'asc' },
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
      },
    });
  }

  async findOne(id: string) {
    const entry = await prisma.diaryEntry.findUnique({ where: { id } });
    if (!entry) {
      throw new AppError(404, 'Voce di diario non trovata');
    }
    return entry;
  }

  async create(
    data: {
      tripId: string;
      userId: string;
      date: string;
      title?: string;
      content?: string;
      mood?: string;
      weather?: string;
    }
  ) {
    return prisma.diaryEntry.create({
      data: {
        tripId: data.tripId,
        userId: data.userId,
        date: new Date(data.date),
        title: data.title,
        content: data.content,
        mood: data.mood,
        weather: data.weather,
      },
    });
  }

  async update(
    id: string,
    data: {
      title?: string;
      content?: string;
      mood?: string;
      weather?: string;
    }
  ) {
    await this.findOne(id);
    return prisma.diaryEntry.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.diaryEntry.delete({ where: { id } });
  }

  async getByTripAndDate(tripId: string, date: string) {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);
    return prisma.diaryEntry.findMany({
      where: {
        tripId,
        date: { gte: day, lt: next },
      },
    });
  }

  async generateAutoDiary(tripId: string, date: string, userId: string) {
    const day = new Date(date);
    day.setHours(0, 0, 0, 0);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);

    const [markers, points, media] = await Promise.all([
      prisma.marker.findMany({
        where: { tripId, createdAt: { gte: day, lt: next } },
      }),
      prisma.gpsPoint.findMany({
        where: { tripId, timestamp: { gte: day, lt: next } },
        orderBy: { timestamp: 'asc' },
      }),
      prisma.marker.findMany({
        where: { tripId, createdAt: { gte: day, lt: next } },
        include: { media: true },
      }),
    ]);

    const totalDistance = points.length > 1 ? this.calculateDistance(points) : 0;
    const markerTypes = markers.map((m) => m.type).join(', ');
    const content = [
      `Giornata del ${day.toLocaleDateString('it-IT')}.`,
      points.length > 0 ? `Percorsi ${totalDistance.toFixed(0)} metri.` : '',
      markers.length > 0 ? `Aggiunti ${markers.length} marker (${markerTypes}).` : '',
      `Foto: ${media.reduce((sum, m) => sum + m.media.length, 0)}.`,
    ]
      .filter(Boolean)
      .join(' ');

    const existing = await prisma.diaryEntry.findUnique({
      where: { tripId_userId_date: { tripId, userId, date: day } },
    });
    if (existing) {
      return existing;
    }

    return prisma.diaryEntry.create({
      data: {
        tripId,
        userId,
        date: day,
        title: `Riassunto ${day.toLocaleDateString('it-IT')}`,
        content,
        isAuto: true,
      },
    });
  }

  private calculateDistance(points: { latitude: number; longitude: number }[]) {
    let total = 0;
    const R = 6371e3;
    for (let i = 1; i < points.length; i++) {
      const dLat = ((points[i].latitude - points[i - 1].latitude) * Math.PI) / 180;
      const dLon = ((points[i].longitude - points[i - 1].longitude) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((points[i - 1].latitude * Math.PI) / 180) *
          Math.cos((points[i].latitude * Math.PI) / 180) *
          Math.sin(dLon / 2) ** 2;
      total += R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }
    return total;
  }
}

export const diaryService = new DiaryService();
