import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class WishlistService {
  async findAll(userId: string) {
    return prisma.wishlistTrip.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: string, id: string) {
    const item = await prisma.wishlistTrip.findUnique({ where: { id } });
    if (!item || item.userId !== userId) {
      throw new AppError(404, 'Elemento wishlist non trovato');
    }
    return item;
  }

  async create(
    userId: string,
    data: {
      title: string;
      description?: string;
      destination: string;
      latitude?: number;
      longitude?: number;
      startDate?: string;
      endDate?: string;
      budget?: number;
      priority?: number;
      notes?: string;
    }
  ) {
    return prisma.wishlistTrip.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        destination: data.destination,
        latitude: data.latitude,
        longitude: data.longitude,
        startDate: data.startDate ? new Date(data.startDate) : undefined,
        endDate: data.endDate ? new Date(data.endDate) : undefined,
        budget: data.budget,
        priority: data.priority ?? 0,
        notes: data.notes,
      },
    });
  }

  async update(
    userId: string,
    id: string,
    data: {
      title?: string;
      description?: string;
      destination?: string;
      latitude?: number;
      longitude?: number;
      startDate?: string;
      endDate?: string;
      budget?: number;
      priority?: number;
      isCompleted?: boolean;
      notes?: string;
    }
  ) {
    await this.findOne(userId, id);
    return prisma.wishlistTrip.update({
      where: { id },
      data: {
        ...data,
        ...(data.startDate ? { startDate: new Date(data.startDate) } : {}),
        ...(data.endDate ? { endDate: new Date(data.endDate) } : {}),
      },
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return prisma.wishlistTrip.delete({ where: { id } });
  }
}

export const wishlistService = new WishlistService();
