import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class PoiService {
  async findAll(filters?: { category?: string; tags?: string[] }) {
    return prisma.pointOfInterest.findMany({
      where: {
        ...(filters?.category ? { category: filters.category } : {}),
        ...(filters?.tags && filters.tags.length > 0
          ? { tags: { hasSome: filters.tags } }
          : {}),
      },
      orderBy: { name: 'asc' },
    });
  }

  async findOne(id: string) {
    const poi = await prisma.pointOfInterest.findUnique({ where: { id } });
    if (!poi) {
      throw new AppError(404, 'POI non trovato');
    }
    return poi;
  }

  async create(data: {
    name: string;
    description?: string;
    latitude: number;
    longitude: number;
    category: string;
    subcategory?: string;
    address?: string;
    imageUrl?: string;
    website?: string;
    phone?: string;
    rating?: number;
    priceLevel?: number;
    openingHours?: Record<string, unknown>;
    tags?: string[];
    source?: string;
    placeId?: string;
  }) {
    return prisma.pointOfInterest.create({ data });
  }

  async update(id: string, data: {
    name?: string;
    description?: string;
    latitude?: number;
    longitude?: number;
    category?: string;
    subcategory?: string;
    address?: string;
    imageUrl?: string;
    website?: string;
    phone?: string;
    rating?: number;
    priceLevel?: number;
    openingHours?: Record<string, unknown>;
    tags?: string[];
    placeId?: string;
  }) {
    await this.findOne(id);
    return prisma.pointOfInterest.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.pointOfInterest.delete({ where: { id } });
  }

  async getNearby(latitude: number, longitude: number, radiusKm = 10) {
    const latDelta = radiusKm / 111.32;
    const lonDelta = radiusKm / (111.32 * Math.cos((latitude * Math.PI) / 180));
    return prisma.pointOfInterest.findMany({
      where: {
        latitude: { gte: latitude - latDelta, lte: latitude + latDelta },
        longitude: { gte: longitude - lonDelta, lte: longitude + lonDelta },
      },
      orderBy: { rating: 'desc' },
    });
  }

  async search(query: string, category?: string) {
    return prisma.pointOfInterest.findMany({
      where: {
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { address: { contains: query, mode: 'insensitive' } },
          { tags: { has: query } },
        ],
        ...(category ? { category } : {}),
      },
      orderBy: { rating: 'desc' },
      take: 50,
    });
  }
}

export const poiService = new PoiService();
