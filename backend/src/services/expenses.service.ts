import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class ExpensesService {
  async findByTrip(tripId: string) {
    const markers = await prisma.marker.findMany({
      where: { tripId, type: 'expense' },
      include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      orderBy: { createdAt: 'desc' },
    });
    return markers.map((m) => ({
      id: m.id,
      tripId: m.tripId,
      userId: m.userId,
      user: m.user,
      amount: m.rating,
      category: m.category,
      description: m.content,
      latitude: m.latitude,
      longitude: m.longitude,
      placeName: m.placeName,
      createdAt: m.createdAt,
    }));
  }

  async create(
    userId: string,
    data: {
      tripId: string;
      amount: number;
      category?: string;
      description?: string;
      latitude?: number;
      longitude?: number;
      placeName?: string;
    }
  ) {
    if (data.amount <= 0) {
      throw new AppError(400, 'Importo non valido');
    }
    return prisma.marker.create({
      data: {
        tripId: data.tripId,
        userId,
        type: 'expense',
        category: data.category ?? 'other',
        content: data.description,
        rating: data.amount,
        latitude: data.latitude ?? 0,
        longitude: data.longitude ?? 0,
        placeName: data.placeName,
      },
    });
  }

  async update(id: string, data: { amount?: number; category?: string; description?: string }) {
    const marker = await prisma.marker.findUnique({ where: { id } });
    if (!marker || marker.type !== 'expense') {
      throw new AppError(404, 'Spesa non trovata');
    }
    return prisma.marker.update({
      where: { id },
      data: {
        ...(data.amount !== undefined ? { rating: data.amount } : {}),
        ...(data.category ? { category: data.category } : {}),
        ...(data.description ? { content: data.description } : {}),
      },
    });
  }

  async remove(id: string) {
    const marker = await prisma.marker.findUnique({ where: { id } });
    if (!marker || marker.type !== 'expense') {
      throw new AppError(404, 'Spesa non trovata');
    }
    return prisma.marker.delete({ where: { id } });
  }

  async getBalance(tripId: string) {
    const expenses = await prisma.marker.findMany({
      where: { tripId, type: 'expense' },
    });
    const total = expenses.reduce((sum, e) => sum + (e.rating ?? 0), 0);
    const members = await prisma.tripMember.findMany({
      where: { tripId },
      include: { user: { select: { id: true, name: true, avatarUrl: true } } },
    });
    const perPerson = members.length > 0 ? total / members.length : 0;
    const byUser = expenses.reduce(
      (acc, e) => {
        acc[e.userId] = (acc[e.userId] || 0) + (e.rating ?? 0);
        return acc;
      },
      {} as Record<string, number>
    );
    const balances = members.map((m) => ({
      user: m.user,
      paid: byUser[m.userId] || 0,
      owed: perPerson,
      balance: (byUser[m.userId] || 0) - perPerson,
    }));
    return { total, perPerson, balances, expenseCount: expenses.length };
  }

  async getHistory(tripId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [expenses, total] = await Promise.all([
      prisma.marker.findMany({
        where: { tripId, type: 'expense' },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
        include: { user: { select: { id: true, name: true, avatarUrl: true } } },
      }),
      prisma.marker.count({ where: { tripId, type: 'expense' } }),
    ]);
    return {
      expenses: expenses.map((e) => ({
        id: e.id,
        amount: e.rating,
        category: e.category,
        description: e.content,
        user: e.user,
        createdAt: e.createdAt,
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async split(tripId: string, expenseId: string) {
    const expense = await prisma.marker.findUnique({ where: { id: expenseId } });
    if (!expense || expense.type !== 'expense') {
      throw new AppError(404, 'Spesa non trovata');
    }
    const members = await prisma.tripMember.findMany({ where: { tripId } });
    const amount = expense.rating ?? 0;
    const perPerson = members.length > 0 ? amount / members.length : 0;
    return {
      expenseId,
      total: amount,
      splitBetween: members.length,
      perPerson,
      members: members.map((m) => ({ userId: m.userId, owes: perPerson })),
    };
  }
}

export const expensesService = new ExpensesService();
