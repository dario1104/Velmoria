import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class TripMembersService {
  async getMembers(tripId: string) {
    return prisma.tripMember.findMany({
      where: { tripId },
      include: {
        user: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
      orderBy: { joinedAt: 'asc' },
    });
  }

  async addMember(tripId: string, userId: string, role = 'member', color = '#7c4dff') {
    const existing = await prisma.tripMember.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });
    if (existing) {
      throw new AppError(409, 'Utente già membro del trip');
    }
    return prisma.tripMember.create({
      data: { tripId, userId, role, color },
    });
  }

  async removeMember(tripId: string, userId: string) {
    const member = await prisma.tripMember.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });
    if (!member) {
      throw new AppError(404, 'Membro non trovato');
    }
    if (member.role === 'owner') {
      throw new AppError(400, 'Non puoi rimuovere il proprietario');
    }
    return prisma.tripMember.delete({
      where: { tripId_userId: { tripId, userId } },
    });
  }

  async updateRole(tripId: string, userId: string, role: string) {
    const member = await prisma.tripMember.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });
    if (!member) {
      throw new AppError(404, 'Membro non trovato');
    }
    return prisma.tripMember.update({
      where: { tripId_userId: { tripId, userId } },
      data: { role },
    });
  }

  async updateColor(tripId: string, userId: string, color: string) {
    const member = await prisma.tripMember.findUnique({
      where: { tripId_userId: { tripId, userId } },
    });
    if (!member) {
      throw new AppError(404, 'Membro non trovato');
    }
    return prisma.tripMember.update({
      where: { tripId_userId: { tripId, userId } },
      data: { color },
    });
  }

  async joinByInvite(userId: string, inviteId: string) {
    const invite = await prisma.tripInvite.findUnique({ where: { id: inviteId } });
    if (!invite || invite.receiverId !== userId) {
      throw new AppError(404, 'Invito non trovato');
    }
    if (invite.status !== 'pending') {
      throw new AppError(400, 'Invito già processato');
    }
    await prisma.$transaction([
      prisma.tripMember.create({
        data: { tripId: invite.tripId, userId, role: 'member' },
      }),
      prisma.tripInvite.update({
        where: { id: inviteId },
        data: { status: 'accepted' },
      }),
    ]);
    return { joined: true };
  }
}

export const tripMembersService = new TripMembersService();
