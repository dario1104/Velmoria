import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class AchievementsService {
  async listUserAchievements(userId: string) {
    return prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: 'desc' },
    });
  }

  async getAllBadges() {
    return prisma.userAchievement.findMany({
      select: { badge: true, title: true, icon: true },
      distinct: ['badge'],
    });
  }
}

export const achievementsService = new AchievementsService();
