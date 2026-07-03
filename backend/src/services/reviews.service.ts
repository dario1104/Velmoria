import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class ReviewsService {
  async create(userId: string, body: { poiId: string; rating: number; comment?: string }) {
    const existing = await prisma.notification.findFirst({
      where: { userId, type: 'review', title: body.poiId },
    });
    if (existing) throw new AppError(409, 'Hai già recensito questo POI');

    const poi = await prisma.pointOfInterest.findUnique({ where: { id: body.poiId } });
    if (!poi) throw new AppError(404, 'POI non trovato');

    return prisma.notification.create({
      data: {
        userId,
        type: 'review',
        title: body.poiId,
        body: body.comment || '',
        data: { rating: body.rating },
      },
    });
  }

  async findAll(userId: string) {
    return prisma.notification.findMany({
      where: { userId, type: 'review' },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const review = await prisma.notification.findUnique({ where: { id } });
    if (!review || review.type !== 'review') throw new AppError(404, 'Recensione non trovata');
    return review;
  }

  async update(id: string, userId: string, body: { rating?: number; comment?: string }) {
    const review = await this.findOne(id);
    if (review.userId !== userId) throw new AppError(403, 'Non autorizzato');

    const data: Record<string, unknown> = {};
    if (body.comment !== undefined) data.body = body.comment;
    if (body.rating !== undefined) data.data = { ...(review.data as Record<string, unknown> || {}), rating: body.rating };

    return prisma.notification.update({ where: { id }, data });
  }

  async remove(id: string, userId: string) {
    const review = await this.findOne(id);
    if (review.userId !== userId) throw new AppError(403, 'Non autorizzato');
    return prisma.notification.delete({ where: { id } });
  }

  async getByPlace(poiId: string) {
    return prisma.notification.findMany({
      where: { type: 'review', title: poiId },
      orderBy: { createdAt: 'desc' },
    });
  }
}

export const reviewsService = new ReviewsService();
