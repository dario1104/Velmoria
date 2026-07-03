import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';
import { calculateDistance } from '../utils/helpers';

export class TripsService {
  async findAll(userId: string) {
    return prisma.trip.findMany({
      where: {
        OR: [
          { userId },
          { members: { some: { userId } } },
        ],
      },
      orderBy: { startDate: 'desc' },
      include: {
        _count: { select: { points: true, markers: true } },
      },
    });
  }

  async findOne(userId: string, id: string) {
    const trip = await prisma.trip.findUnique({
      where: { id },
      include: { members: true },
    });
    if (!trip) {
      throw new AppError(404, 'Trip non trovato');
    }
    const isOwner = trip.userId === userId;
    const isMember = trip.members.some((m) => m.userId === userId);
    if (!isOwner && !isMember) {
      throw new AppError(403, 'Accesso negato');
    }
    return trip;
  }

  async create(userId: string, title: string, description?: string) {
    const trip = await prisma.trip.create({
      data: { userId, title, description, startDate: new Date() },
    });
    await prisma.tripMember.create({
      data: { tripId: trip.id, userId, role: 'owner', color: '#7c4dff' },
    });
    return trip;
  }

  async update(userId: string, id: string, data: { title?: string; description?: string }) {
    await this.findOne(userId, id);
    return prisma.trip.update({ where: { id }, data });
  }

  async remove(userId: string, id: string) {
    const trip = await this.findOne(userId, id);
    if (trip.userId !== userId) {
      throw new AppError(403, 'Solo il proprietario può eliminare il trip');
    }
    return prisma.trip.delete({ where: { id } });
  }

  async finish(userId: string, id: string) {
    await this.findOne(userId, id);
    return prisma.trip.update({
      where: { id },
      data: { endDate: new Date(), isActive: false },
    });
  }

  async getStats(userId: string, id: string) {
    await this.findOne(userId, id);

    const [points, markers] = await Promise.all([
      prisma.gpsPoint.findMany({
        where: { tripId: id },
        orderBy: { timestamp: 'asc' },
      }),
      prisma.marker.findMany({ where: { tripId: id } }),
    ]);

    const totalDistance = calculateDistance(points);
    const totalTime =
      points.length > 0
        ? (points[points.length - 1].timestamp.getTime() -
            points[0].timestamp.getTime()) / 1000
        : 0;

    const markersByType = markers.reduce(
      (acc, m) => {
        acc[m.type] = (acc[m.type] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return { totalDistance, totalTime, markersCount: markers.length, markersByType };
  }

  async getMembers(tripId: string) {
    return prisma.tripMember.findMany({
      where: { tripId },
      include: { user: { select: { id: true, name: true, email: true, avatarUrl: true } } },
    });
  }

  async duplicate(userId: string, tripId: string) {
    const original = await this.findOne(userId, tripId);
    const trip = await prisma.trip.create({
      data: {
        userId,
        title: `${original.title} (Copia)`,
        description: original.description,
        coverPhoto: original.coverPhoto,
        startDate: new Date(),
      },
    });
    await prisma.tripMember.create({
      data: { tripId: trip.id, userId, role: 'owner', color: '#7c4dff' },
    });
    return trip;
  }

  async updateCover(userId: string, id: string, coverPhoto: string) {
    await this.findOne(userId, id);
    return prisma.trip.update({ where: { id }, data: { coverPhoto } });
  }

  async setVisibility(userId: string, id: string, visibility: string) {
    await this.findOne(userId, id);
    return prisma.trip.update({ where: { id }, data: { visibility } });
  }

  async addMember(userId: string, tripId: string, memberUserId: string, role: string = 'member') {
    const trip = await this.findOne(userId, tripId);
    if (trip.userId !== userId && !trip.members.some(m => m.role === 'admin' || m.role === 'owner')) {
      throw new AppError(403, 'Non hai i permessi per aggiungere membri');
    }
    return prisma.tripMember.create({
      data: { tripId, userId: memberUserId, role, color: this.randomColor() },
    });
  }

  async removeMember(userId: string, tripId: string, memberId: string) {
    const trip = await this.findOne(userId, tripId);
    if (trip.userId !== userId) {
      throw new AppError(403, 'Solo il proprietario può rimuovere membri');
    }
    return prisma.tripMember.delete({ where: { id: memberId } });
  }

  async updateMemberRole(userId: string, tripId: string, memberId: string, role: string) {
    const trip = await this.findOne(userId, tripId);
    if (trip.userId !== userId) {
      throw new AppError(403, 'Solo il proprietario può modificare i ruoli');
    }
    return prisma.tripMember.update({ where: { id: memberId }, data: { role } });
  }

  async inviteCollaborator(userId: string, tripId: string, receiverId: string, message?: string) {
    await this.findOne(userId, tripId);
    const existing = await prisma.tripInvite.findUnique({
      where: { tripId_receiverId: { tripId, receiverId } },
    });
    if (existing) {
      throw new AppError(409, 'Invito già inviato');
    }
    const member = await prisma.tripMember.findUnique({
      where: { tripId_userId: { tripId, userId: receiverId } },
    });
    if (member) {
      throw new AppError(409, 'Utente già membro del trip');
    }
    return prisma.tripInvite.create({
      data: { tripId, senderId: userId, receiverId, message },
    });
  }

  async getMyInvites(userId: string) {
    return prisma.tripInvite.findMany({
      where: { receiverId: userId, status: 'pending' },
      include: {
        trip: { select: { id: true, title: true, startDate: true } },
        sender: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getInvites(userId: string, tripId: string) {
    await this.findOne(userId, tripId);
    return prisma.tripInvite.findMany({
      where: { tripId },
      include: {
        sender: { select: { id: true, name: true, email: true, avatarUrl: true } },
        receiver: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
    });
  }

  async respondToInvite(userId: string, inviteId: string, accept: boolean) {
    const invite = await prisma.tripInvite.findUnique({ where: { id: inviteId } });
    if (!invite || invite.receiverId !== userId) {
      throw new AppError(404, 'Invito non trovato');
    }
    if (invite.status !== 'pending') {
      throw new AppError(400, 'Invito già processato');
    }
    if (accept) {
      await prisma.tripMember.create({
        data: { tripId: invite.tripId, userId, role: 'member', color: this.randomColor() },
      });
      await prisma.tripInvite.update({
        where: { id: inviteId },
        data: { status: 'accepted' },
      });
    } else {
      await prisma.tripInvite.update({
        where: { id: inviteId },
        data: { status: 'rejected' },
      });
    }
    return { accepted: accept };
  }

  async getPublicTrips(filters: Record<string, any> = {}) {
    const where: any = { visibility: 'public' };
    if (filters.country) where.countries = { has: filters.country };
    if (filters.city) where.cities = { has: filters.city };
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
      ];
    }
    return prisma.trip.findMany({
      where,
      orderBy: { startDate: 'desc' },
      take: 50,
      include: {
        user: { select: { id: true, name: true, avatarUrl: true } },
        _count: { select: { markers: true, points: true } },
      },
    });
  }

  async getTripsByUser(userId: string) {
    return prisma.trip.findMany({
      where: { userId, visibility: 'public' },
      orderBy: { startDate: 'desc' },
      include: { _count: { select: { markers: true, points: true } } },
    });
  }

  private randomColor(): string {
    const colors = ['#7c4dff', '#fc0b7b', '#ff6d00', '#00c853', '#00bcd4', '#ffd600', '#aa00ff', '#ff3d00'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
}

export const tripsService = new TripsService();
