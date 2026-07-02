import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';

@Injectable()
export class MarkersRepository {
  constructor(private readonly prisma: PrismaService) {}

  findByTrip(tripId: string) {
    return this.prisma.marker.findMany({
      where: { tripId },
      orderBy: { createdAt: 'asc' },
      include: { media: true },
    });
  }

  findById(id: string) {
    return this.prisma.marker.findUnique({ where: { id }, include: { media: true } });
  }

  create(tripId: string, dto: CreateMarkerDto) {
    return this.prisma.marker.create({ data: { tripId, ...dto } });
  }

  update(id: string, dto: UpdateMarkerDto) {
    return this.prisma.marker.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.marker.delete({ where: { id } });
  }
}
