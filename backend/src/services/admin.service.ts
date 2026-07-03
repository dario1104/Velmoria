import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class AdminService {
  async getUsers(query: any) {
    const { search, role, page = 1, limit = 20 } = query;
    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count({ where: where as any }),
    ]);

    return { users, total, page, limit };
  }

  async getUser(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'Utente non trovato');
    return user;
  }

  async updateUserRole(userId: string, role: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'Utente non trovato');

    return prisma.user.update({
      where: { id: userId },
      data: { preferences: { ...((user.preferences as Record<string, unknown>) || {}), role } },
    });
  }

  async deleteUser(userId: string) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw new AppError(404, 'Utente non trovato');
    return prisma.user.delete({ where: { id: userId } });
  }

  async getReports(query: any) {
    const { status, page = 1, limit = 20 } = query;
    const where: Record<string, unknown> = { type: 'report' };

    if (status === 'resolved') where.isRead = true;
    else if (status === 'pending') where.isRead = false;

    const [reports, total] = await Promise.all([
      prisma.notification.findMany({
        where: where as any,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.notification.count({ where: where as any }),
    ]);

    return { reports, total, page, limit };
  }

  async resolveReport(id: string, action: string) {
    const report = await prisma.notification.findUnique({ where: { id } });
    if (!report || report.type !== 'report') throw new AppError(404, 'Segnalazione non trovata');

    return prisma.notification.update({
      where: { id },
      data: { isRead: true, data: { ...((report.data as Record<string, unknown>) || {}), resolvedAction: action } },
    });
  }

  async moderateContent(body: { contentId: string; contentType: string; action: string; reason?: string }) {
    const { contentId, contentType, action } = body;

    if (action === 'delete') {
      switch (contentType) {
        case 'marker':
          await prisma.marker.delete({ where: { id: contentId } }).catch(() => {});
          break;
        case 'diary_entry':
          await prisma.diaryEntry.delete({ where: { id: contentId } }).catch(() => {});
          break;
        case 'timeline_event':
          await prisma.timelineEvent.delete({ where: { id: contentId } }).catch(() => {});
          break;
      }
    }

    return { moderated: true, contentId, contentType, action };
  }

  async getStats() {
    const [totalUsers, totalTrips, totalMarkers, totalGpsPoints, totalPois] = await Promise.all([
      prisma.user.count(),
      prisma.trip.count(),
      prisma.marker.count(),
      prisma.gpsPoint.count(),
      prisma.pointOfInterest.count(),
    ]);

    const activeTrips = await prisma.trip.count({ where: { isActive: true } });
    const publicTrips = await prisma.trip.count({ where: { visibility: 'public' } });

    return {
      totalUsers,
      totalTrips,
      activeTrips,
      publicTrips,
      totalMarkers,
      totalGpsPoints,
      totalPois,
    };
  }

  async getCategories() {
    return prisma.$queryRawUnsafe(
      'SELECT id, name, icon, created_at, updated_at FROM categories ORDER BY name ASC'
    );
  }

  async createCategory(data: { name: string; icon?: string }) {
    const [category] = await prisma.$queryRawUnsafe(
      'INSERT INTO categories (name, icon) VALUES ($1, $2) RETURNING *',
      data.name,
      data.icon || null
    );
    return category;
  }

  async updateCategory(id: string, data: { name?: string; icon?: string }) {
    const sets: string[] = [];
    const values: unknown[] = [];
    let idx = 1;

    if (data.name !== undefined) {
      sets.push(`name = $${idx++}`);
      values.push(data.name);
    }
    if (data.icon !== undefined) {
      sets.push(`icon = $${idx++}`);
      values.push(data.icon);
    }

    if (sets.length === 0) throw new AppError(400, 'Nessun campo da aggiornare');

    values.push(id);
    const [category] = await prisma.$queryRawUnsafe(
      `UPDATE categories SET ${sets.join(', ')}, updated_at = NOW() WHERE id = $${idx} RETURNING *`,
      ...values
    );
    return category;
  }

  async deleteCategory(id: string) {
    await prisma.$executeRawUnsafe('DELETE FROM categories WHERE id = $1', id);
  }
}

export const adminService = new AdminService();
