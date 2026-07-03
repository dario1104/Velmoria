import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class SearchService {
  async search(
    query: { q: string; type?: string; category?: string; latitude?: number; longitude?: number; radius?: number; page?: number; limit?: number },
    _userId: string
  ) {
    const q = query.q;
    const type = query.type || 'all';
    const page = query.page || 1;
    const limit = Math.min(query.limit || 20, 100);
    const skip = (page - 1) * limit;

    const results: Record<string, unknown> = {};
    const searches: Promise<unknown>[] = [];

    if (type === 'poi' || type === 'all') {
      const poiWhere: Record<string, unknown> = {
        OR: [
          { name: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { address: { contains: q, mode: 'insensitive' } },
          { tags: { has: q } },
        ],
      };
      if (query.category) poiWhere.category = query.category;

      searches.push(
        prisma.pointOfInterest.findMany({ where: poiWhere, skip, take: limit } as any).then((data) => { results.poi = data; })
      );
    }

    if (type === 'trips' || type === 'all') {
      const tripWhere: Record<string, unknown> = {
        visibility: 'public',
        OR: [
          { title: { contains: q, mode: 'insensitive' } },
          { description: { contains: q, mode: 'insensitive' } },
          { cities: { has: q } },
          { countries: { has: q } },
        ],
      };

      searches.push(
        prisma.trip.findMany({
          where: tripWhere as any,
          skip,
          take: limit,
          include: { user: { select: { id: true, name: true, avatarUrl: true } } },
        }).then((data) => { results.trips = data; })
      );
    }

    if (type === 'users' || type === 'all') {
      searches.push(
        prisma.user.findMany({
          where: {
            OR: [
              { name: { contains: q, mode: 'insensitive' } },
              { email: { contains: q, mode: 'insensitive' } },
            ],
          },
          select: { id: true, name: true, email: true, avatarUrl: true },
          skip,
          take: limit,
        }).then((data) => { results.users = data; })
      );
    }

    await Promise.all(searches);
    return results;
  }
}

export const searchService = new SearchService();
