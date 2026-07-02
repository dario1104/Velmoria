import { Injectable, NotFoundException } from '@nestjs/common';
import { TripsRepository } from './trips.repository';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Injectable()
export class TripsService {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async findAll(userId: string) {
    return this.tripsRepository.findAllByUser(userId);
  }

  async create(userId: string, dto: CreateTripDto) {
    return this.tripsRepository.create(userId, dto.title, dto.description);
  }

  async findOne(userId: string, id: string) {
    const trip = await this.tripsRepository.findById(id);
    if (!trip || trip.userId !== userId) throw new NotFoundException('Trip not found');
    return trip;
  }

  async update(userId: string, id: string, dto: UpdateTripDto) {
    await this.findOne(userId, id);
    return this.tripsRepository.update(id, dto);
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.tripsRepository.remove(id);
  }

  async finish(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.tripsRepository.finish(id);
  }

  async getStats(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.tripsRepository.getStats(id);
  }
}
