import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class TimelineService {
  async getTimeline(tripId: string) {
    const [events, markers, diary, gpsPoints] = await Promise.all([
      prisma.timelineEvent.findMany({
        where: { tripId },
        orderBy: { timestamp: 'asc' },
        include: {
          user: { select: { id: true, name: true, avatarUrl: true } },
        },
      }),
      prisma.marker.findMany({
        where: { tripId },
        orderBy: { createdAt: 'asc' },
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      }),
      prisma.diaryEntry.findMany({
        where: { tripId },
        orderBy: { date: 'asc' },
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      }),
      prisma.gpsPoint.findMany({
        where: { tripId },
        orderBy: { timestamp: 'asc' },
        take: 1,
      }),
    ]);

    const timeline: Array<{
      type: string;
      timestamp: Date;
      data: Record<string, unknown>;
      user: { id: string; name: string; avatarUrl: string | null };
    }> = [];

    for (const e of events) {
      timeline.push({
        type: e.type,
        timestamp: e.timestamp,
        data: { id: e.id, title: e.title, content: e.content, latitude: e.latitude, longitude: e.longitude, metadata: e.metadata },
        user: e.user,
      });
    }
    for (const m of markers) {
      timeline.push({
        type: 'marker',
        timestamp: m.createdAt,
        data: { id: m.id, type: m.type, category: m.category, content: m.content, latitude: m.latitude, longitude: m.longitude },
        user: m.user,
      });
    }
    for (const d of diary) {
      timeline.push({
        type: 'diary',
        timestamp: d.date,
        data: { id: d.id, title: d.title, content: d.content, mood: d.mood, isAuto: d.isAuto },
        user: d.user,
      });
    }

    timeline.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

    return {
      events: timeline,
      startPoint: gpsPoints[0] || null,
    };
  }

  async createEvent(
    tripId: string,
    userId: string,
    data: {
      type: string;
      title: string;
      content?: string;
      latitude?: number;
      longitude?: number;
      timestamp: string;
      metadata?: Record<string, unknown>;
    }
  ) {
    return prisma.timelineEvent.create({
      data: {
        tripId,
        userId,
        type: data.type,
        title: data.title,
        content: data.content,
        latitude: data.latitude,
        longitude: data.longitude,
        timestamp: new Date(data.timestamp),
        metadata: data.metadata ?? {},
      },
    });
  }

  async updateEvent(id: string, data: { title?: string; content?: string; metadata?: Record<string, unknown> }) {
    const event = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!event) {
      throw new AppError(404, 'Evento non trovato');
    }
    return prisma.timelineEvent.update({ where: { id }, data });
  }

  async removeEvent(id: string) {
    const event = await prisma.timelineEvent.findUnique({ where: { id } });
    if (!event) {
      throw new AppError(404, 'Evento non trovato');
    }
    return prisma.timelineEvent.delete({ where: { id } });
  }
}

export const timelineService = new TimelineService();
