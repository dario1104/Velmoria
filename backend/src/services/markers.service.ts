import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class MarkersService {
  async findByTrip(tripId: string) {
    return prisma.marker.findMany({
      where: { tripId },
      orderBy: { createdAt: 'asc' },
      include: { media: true },
    });
  }

  async findOne(id: string) {
    const marker = await prisma.marker.findUnique({
      where: { id },
      include: { media: true },
    });
    if (!marker) {
      throw new AppError(404, 'Marker non trovato');
    }
    return marker;
  }

  async create(
    tripId: string,
    userId: string,
    data: {
      latitude: number;
      longitude: number;
      type: string;
      category?: string;
      content?: string;
      mood?: string;
      rating?: number;
      address?: string;
      placeName?: string;
      placeId?: string;
    }
  ) {
    return prisma.marker.create({
      data: { tripId, userId, ...data },
    });
  }

  async update(
    id: string,
    data: {
      latitude?: number;
      longitude?: number;
      type?: string;
      category?: string;
      content?: string;
      mood?: string;
      rating?: number;
      address?: string;
      placeName?: string;
      placeId?: string;
    }
  ) {
    await this.findOne(id);
    return prisma.marker.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.marker.delete({ where: { id } });
  }
}

export const markersService = new MarkersService();
