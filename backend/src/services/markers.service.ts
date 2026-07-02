import prisma from '../prisma/client';

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
      throw { statusCode: 404, message: 'Marker non trovato' };
    }
    return marker;
  }

  async create(
    tripId: string,
    data: {
      latitude: number;
      longitude: number;
      type: string;
      content?: string;
      mood?: string;
    }
  ) {
    return prisma.marker.create({ data: { tripId, ...data } });
  }

  async update(
    id: string,
    data: {
      latitude?: number;
      longitude?: number;
      type?: string;
      content?: string;
      mood?: string;
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
