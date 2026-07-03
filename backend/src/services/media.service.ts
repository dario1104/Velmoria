import prisma from '../prisma/client';
import { AppError } from '../middleware/errorHandler';

export class MediaService {
  async findByMarker(markerId: string) {
    return prisma.media.findMany({ where: { markerId } });
  }

  async findOne(id: string) {
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      throw new AppError(404, 'Media non trovato');
    }
    return media;
  }

  async create(
    markerId: string,
    userId: string,
    data: {
      fileUrl: string;
      fileType: string;
      fileSize?: number;
      thumbnail?: string;
      width?: number;
      height?: number;
      duration?: number;
      metadata?: Record<string, unknown>;
    }
  ) {
    return prisma.media.create({
      data: {
        markerId,
        userId,
        fileUrl: data.fileUrl,
        fileType: data.fileType,
        fileSize: data.fileSize,
        thumbnail: data.thumbnail,
        width: data.width,
        height: data.height,
        duration: data.duration,
        metadata: data.metadata ?? {},
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.media.delete({ where: { id } });
  }
}

export const mediaService = new MediaService();
