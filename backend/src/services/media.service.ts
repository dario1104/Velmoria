import prisma from '../prisma/client';

export class MediaService {
  async findByMarker(markerId: string) {
    return prisma.media.findMany({ where: { markerId } });
  }

  async findOne(id: string) {
    const media = await prisma.media.findUnique({ where: { id } });
    if (!media) {
      throw { statusCode: 404, message: 'Media non trovato' };
    }
    return media;
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.media.delete({ where: { id } });
  }
}

export const mediaService = new MediaService();
