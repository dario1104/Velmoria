import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class PackingService {
  async findByTrip(tripId: string) {
    const markers = await prisma.marker.findMany({
      where: { tripId, type: 'packing' },
      orderBy: { createdAt: 'asc' },
      include: { user: { select: { id: true, name: true, avatarUrl: true } } },
    });
    const categories = new Map<string, Array<{
      id: string;
      name: string;
      packed: boolean;
      assignedTo?: string;
      quantity?: number;
    }>>();
    for (const m of markers) {
      const cat = m.category || 'general';
      if (!categories.has(cat)) categories.set(cat, []);
      categories.get(cat)!.push({
        id: m.id,
        name: m.content || m.placeName || 'Oggetto',
        packed: (m.rating ?? 0) === 1,
        assignedTo: m.mood || undefined,
        quantity: m.rating && m.rating > 1 ? m.rating : undefined,
      });
    }
    return Object.fromEntries(categories);
  }

  async create(
    userId: string,
    data: {
      tripId: string;
      name: string;
      category?: string;
      quantity?: number;
      assignedTo?: string;
    }
  ) {
    return prisma.marker.create({
      data: {
        tripId,
        userId,
        type: 'packing',
        category: data.category ?? 'general',
        content: data.name,
        rating: data.quantity ?? 1,
        mood: data.assignedTo,
        latitude: 0,
        longitude: 0,
      },
    });
  }

  async update(id: string, data: { name?: string; category?: string; quantity?: number; assignedTo?: string; packed?: boolean }) {
    const marker = await prisma.marker.findUnique({ where: { id } });
    if (!marker || marker.type !== 'packing') {
      throw new AppError(404, 'Elemento packing non trovato');
    }
    return prisma.marker.update({
      where: { id },
      data: {
        ...(data.name ? { content: data.name } : {}),
        ...(data.category ? { category: data.category } : {}),
        ...(data.quantity !== undefined ? { rating: data.quantity } : {}),
        ...(data.assignedTo ? { mood: data.assignedTo } : {}),
        ...(data.packed !== undefined ? { rating: data.packed ? 1 : 0 } : {}),
      },
    });
  }

  async remove(id: string) {
    const marker = await prisma.marker.findUnique({ where: { id } });
    if (!marker || marker.type !== 'packing') {
      throw new AppError(404, 'Elemento packing non trovato');
    }
    return prisma.marker.delete({ where: { id } });
  }

  async getCategories(tripId: string) {
    const markers = await prisma.marker.findMany({
      where: { tripId, type: 'packing' },
      select: { category: true },
      distinct: ['category'],
    });
    return markers.map((m) => m.category).filter(Boolean);
  }

  async shareList(tripId: string, userId: string) {
    const member = await prisma.tripMember.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });
    if (!member) {
      throw new AppError(404, 'Utente non membro del trip');
    }
    return { shared: true, tripId, userId };
  }
}

export const packingService = new PackingService();
