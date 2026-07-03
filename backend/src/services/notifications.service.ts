import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class NotificationsService {
  async create(
    userId: string,
    data: {
      type: string;
      title: string;
      body?: string;
      data?: Record<string, unknown>;
    }
  ) {
    return prisma.notification.create({
      data: {
        userId,
        type: data.type,
        title: data.title,
        body: data.body,
        data: data.data ?? {},
      },
    });
  }

  async getNotifications(userId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [notifications, total] = await Promise.all([
      prisma.notification.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.notification.count({ where: { userId } }),
    ]);
    return { notifications, total, page, totalPages: Math.ceil(total / limit) };
  }

  async markRead(userId: string, notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification || notification.userId !== userId) {
      throw new AppError(404, 'Notifica non trovata');
    }
    return prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllRead(userId: string) {
    await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
    return { success: true };
  }

  async getUnreadCount(userId: string) {
    return prisma.notification.count({
      where: { userId, isRead: false },
    });
  }

  async deleteNotification(userId: string, notificationId: string) {
    const notification = await prisma.notification.findUnique({
      where: { id: notificationId },
    });
    if (!notification || notification.userId !== userId) {
      throw new AppError(404, 'Notifica non trovata');
    }
    return prisma.notification.delete({ where: { id: notificationId } });
  }
}

export const notificationsService = new NotificationsService();
