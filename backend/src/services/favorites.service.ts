import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class FavoritesService {
  async add(userId: string, poiId: string) {
    const poi = await prisma.pointOfInterest.findUnique({ where: { id: poiId } });
    if (!poi) throw new AppError(404, 'POI non trovato');

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'Utente non trovato');

    const prefs = (user.preferences as Record<string, unknown>) || {};
    const favorites: string[] = Array.isArray(prefs.favorites) ? (prefs.favorites as string[]) : [];

    if (favorites.includes(poiId)) throw new AppError(409, 'POI già nei preferiti');
    favorites.push(poiId);

    await prisma.user.update({
      where: { id: userId },
      data: { preferences: { ...prefs, favorites } },
    });

    return poi;
  }

  async remove(userId: string, poiId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'Utente non trovato');

    const prefs = (user.preferences as Record<string, unknown>) || {};
    const favorites: string[] = Array.isArray(prefs.favorites) ? (prefs.favorites as string[]) : [];
    const updated = favorites.filter((id: string) => id !== poiId);

    if (updated.length === favorites.length) throw new AppError(404, 'POI non presente nei preferiti');

    await prisma.user.update({
      where: { id: userId },
      data: { preferences: { ...prefs, favorites: updated } },
    });
  }

  async list(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'Utente non trovato');

    const prefs = (user.preferences as Record<string, unknown>) || {};
    const favorites: string[] = Array.isArray(prefs.favorites) ? (prefs.favorites as string[]) : [];

    if (favorites.length === 0) return [];

    return prisma.pointOfInterest.findMany({
      where: { id: { in: favorites } },
    });
  }
}

export const favoritesService = new FavoritesService();
