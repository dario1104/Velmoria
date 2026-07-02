import { Injectable, NotFoundException } from '@nestjs/common';
import { MarkersRepository } from './markers.repository';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';

@Injectable()
export class MarkersService {
  constructor(private readonly markersRepository: MarkersRepository) {}

  findByTrip(tripId: string) {
    return this.markersRepository.findByTrip(tripId);
  }

  create(tripId: string, dto: CreateMarkerDto) {
    return this.markersRepository.create(tripId, dto);
  }

  async findOne(id: string) {
    const marker = await this.markersRepository.findById(id);
    if (!marker) throw new NotFoundException('Marker not found');
    return marker;
  }

  async update(id: string, dto: UpdateMarkerDto) {
    await this.findOne(id);
    return this.markersRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.markersRepository.remove(id);
  }
}
