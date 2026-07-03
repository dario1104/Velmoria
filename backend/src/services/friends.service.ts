import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class FriendsService {
  async sendRequest(senderId: string, receiverId: string, message?: string) {
    if (senderId === receiverId) {
      throw new AppError(400, 'Non puoi inviare una richiesta a te stesso');
    }
    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) {
      throw new AppError(404, 'Utente non trovato');
    }
    const existing = await prisma.friendRequest.findUnique({
      where: { senderId_receiverId: { senderId, receiverId } },
    });
    if (existing) {
      throw new AppError(409, 'Richiesta già inviata');
    }
    const reverse = await prisma.friendRequest.findUnique({
      where: { senderId_receiverId: { senderId: receiverId, receiverId: senderId } },
    });
    if (reverse) {
      if (reverse.status === 'pending') {
        await this.acceptRequest(receiverId, reverse.id);
        return { accepted: true };
      }
      throw new AppError(409, 'Richiesta già presente');
    }
    const friends = await prisma.friend.findUnique({
      where: { userId_friendId: { userId: senderId, friendId: receiverId } },
    });
    if (friends) {
      throw new AppError(409, 'Siete già amici');
    }
    return prisma.friendRequest.create({
      data: { senderId, receiverId, message },
    });
  }

  async acceptRequest(userId: string, requestId: string) {
    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request || request.receiverId !== userId) {
      throw new AppError(404, 'Richiesta non trovata');
    }
    if (request.status !== 'pending') {
      throw new AppError(400, 'Richiesta già processata');
    }
    await prisma.$transaction([
      prisma.friendRequest.update({
        where: { id: requestId },
        data: { status: 'accepted' },
      }),
      prisma.friend.create({
        data: { userId: request.senderId, friendId: request.receiverId },
      }),
      prisma.friend.create({
        data: { userId: request.receiverId, friendId: request.senderId },
      }),
    ]);
    return { accepted: true };
  }

  async rejectRequest(userId: string, requestId: string) {
    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request || request.receiverId !== userId) {
      throw new AppError(404, 'Richiesta non trovata');
    }
    return prisma.friendRequest.update({
      where: { id: requestId },
      data: { status: 'rejected' },
    });
  }

  async cancelRequest(userId: string, requestId: string) {
    const request = await prisma.friendRequest.findUnique({ where: { id: requestId } });
    if (!request || request.senderId !== userId) {
      throw new AppError(404, 'Richiesta non trovata');
    }
    return prisma.friendRequest.delete({ where: { id: requestId } });
  }

  async removeFriend(userId: string, friendId: string) {
    const [rel1, rel2] = await Promise.all([
      prisma.friend.findUnique({
        where: { userId_friendId: { userId, friendId } },
      }),
      prisma.friend.findUnique({
        where: { userId_friendId: { userId: friendId, friendId: userId } },
      }),
    ]);
    if (!rel1 || !rel2) {
      throw new AppError(404, 'Amicizia non trovata');
    }
    await prisma.$transaction([
      prisma.friend.delete({ where: { id: rel1.id } }),
      prisma.friend.delete({ where: { id: rel2.id } }),
    ]);
    return { removed: true };
  }

  async getFriends(userId: string) {
    const friends = await prisma.friend.findMany({
      where: { userId },
      include: {
        friend: { select: { id: true, name: true, email: true, avatarUrl: true, bio: true } },
      },
    });
    return friends.map((f) => f.friend);
  }

  async getFollowers(userId: string) {
    const requests = await prisma.friendRequest.findMany({
      where: { receiverId: userId, status: 'pending' },
      include: {
        sender: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
    });
    return requests.map((r) => ({ requestId: r.id, user: r.sender, createdAt: r.createdAt }));
  }

  async getFollowing(userId: string) {
    const requests = await prisma.friendRequest.findMany({
      where: { senderId: userId, status: 'pending' },
      include: {
        receiver: { select: { id: true, name: true, email: true, avatarUrl: true } },
      },
    });
    return requests.map((r) => ({ requestId: r.id, user: r.receiver, createdAt: r.createdAt }));
  }

  async searchUsers(query: string, currentUserId: string) {
    return prisma.user.findMany({
      where: {
        AND: [
          { id: { not: currentUserId } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { email: { contains: query, mode: 'insensitive' } },
            ],
          },
        ],
      },
      select: { id: true, name: true, email: true, avatarUrl: true, bio: true },
      take: 20,
    });
  }
}

export const friendsService = new FriendsService();
