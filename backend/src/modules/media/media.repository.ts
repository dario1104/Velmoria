import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class MediaRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByMarker(markerId: string) {
    return this.prisma.media.findMany({ where: { markerId } });
  }

  findById(id: string) {
    return this.prisma.media.findUnique({ where: { id } });
  }

  remove(id: string) {
    return this.prisma.media.delete({ where: { id } });
  }
}
