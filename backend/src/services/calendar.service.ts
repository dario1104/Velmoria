import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class CalendarService {
  async findAll(userId: string) {
    return prisma.calendarEvent.findMany({
      where: { userId },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(userId: string, id: string) {
    const event = await prisma.calendarEvent.findUnique({ where: { id } });
    if (!event || event.userId !== userId) {
      throw new AppError(404, 'Evento non trovato');
    }
    return event;
  }

  async create(
    userId: string,
    data: {
      title: string;
      description?: string;
      location?: string;
      latitude?: number;
      longitude?: number;
      startTime: string;
      endTime?: string;
      isAllDay?: boolean;
      category?: string;
      color?: string;
      tripId?: string;
    }
  ) {
    return prisma.calendarEvent.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        startTime: new Date(data.startTime),
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        isAllDay: data.isAllDay ?? false,
        category: data.category,
        color: data.color ?? '#7c4dff',
        tripId: data.tripId,
      },
    });
  }

  async update(
    userId: string,
    id: string,
    data: {
      title?: string;
      description?: string;
      location?: string;
      latitude?: number;
      longitude?: number;
      startTime?: string;
      endTime?: string;
      isAllDay?: boolean;
      category?: string;
      color?: string;
      isDone?: boolean;
    }
  ) {
    await this.findOne(userId, id);
    return prisma.calendarEvent.update({
      where: { id },
      data: {
        ...data,
        ...(data.startTime ? { startTime: new Date(data.startTime) } : {}),
        ...(data.endTime ? { endTime: new Date(data.endTime) } : {}),
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return prisma.calendarEvent.delete({ where: { id } });
  }

  async getByDate(userId: string, date: string) {
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    return prisma.calendarEvent.findMany({
      where: {
        userId,
        startTime: { gte: start, lte: end },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async getByRange(userId: string, from: string, to: string) {
    return prisma.calendarEvent.findMany({
      where: {
        userId,
        startTime: { gte: new Date(from) },
        endTime: { lte: new Date(to) },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async getByTrip(tripId: string) {
    return prisma.calendarEvent.findMany({
      where: { tripId },
      orderBy: { startTime: 'asc' },
    });
  }
}

export const calendarService = new CalendarService();
