import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class ChatService {
  async sendMessage(senderId: string, receiverId: string, content: string, tripId?: string) {
    const receiver = await prisma.user.findUnique({ where: { id: receiverId } });
    if (!receiver) {
      throw new AppError(404, 'Destinatario non trovato');
    }
    const notification = await prisma.notification.create({
      data: {
        userId: receiverId,
        type: 'chat_message',
        title: 'Nuovo messaggio',
        body: content,
        data: { senderId, tripId, content },
      },
    });
    return {
      id: notification.id,
      senderId,
      receiverId,
      content,
      tripId,
      createdAt: notification.createdAt,
    };
  }

  async getMessages(userId: string, otherUserId: string, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    const notifications = await prisma.notification.findMany({
      where: {
        type: 'chat_message',
        OR: [
          { userId, data: { path: ['senderId'], equals: otherUserId } },
          { userId: otherUserId, data: { path: ['senderId'], equals: userId } },
        ],
      },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    });
    const messages = notifications.map((n) => ({
      id: n.id,
      senderId: (n.data as Record<string, unknown>).senderId as string,
      receiverId: n.userId,
      content: (n.data as Record<string, unknown>).content as string,
      tripId: (n.data as Record<string, unknown>).tripId as string | undefined,
      createdAt: n.createdAt,
      isRead: n.isRead,
    }));
    return { messages, page, totalPages: Math.ceil(messages.length / limit) };
  }

  async editMessage(messageId: string, content: string) {
    const notification = await prisma.notification.findUnique({ where: { id: messageId } });
    if (!notification || notification.type !== 'chat_message') {
      throw new AppError(404, 'Messaggio non trovato');
    }
    const data = notification.data as Record<string, unknown>;
    data.content = content;
    data.edited = true;
    await prisma.notification.update({
      where: { id: messageId },
      data: { data: data as Record<string, unknown> },
    });
    return { id: messageId, content, edited: true };
  }

  async deleteMessage(messageId: string) {
    const notification = await prisma.notification.findUnique({ where: { id: messageId } });
    if (!notification || notification.type !== 'chat_message') {
      throw new AppError(404, 'Messaggio non trovato');
    }
    return prisma.notification.delete({ where: { id: messageId } });
  }

  async createGroupChat(name: string, memberIds: string[], tripId?: string) {
    const creatorId = memberIds[0];
    const messages: Array<{ userId: string; type: string; title: string; body: string; data: Record<string, unknown> }> = [];
    for (const userId of memberIds) {
      messages.push({
        userId,
        type: 'group_chat',
        title: `Chat: ${name}`,
        body: `Sei stato aggiunto alla chat ${name}`,
        data: { groupName: name, memberIds, tripId, createdBy: creatorId },
      });
    }
    await prisma.notification.createMany({ data: messages });
    return { name, memberIds, tripId, createdAt: new Date() };
  }
}

export const chatService = new ChatService();
