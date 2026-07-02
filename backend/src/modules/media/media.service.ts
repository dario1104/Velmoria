import { Injectable, NotFoundException } from '@nestjs/common';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaRepository: MediaRepository) {}

  findByMarker(markerId: string) {
    return this.mediaRepository.findByMarker(markerId);
  }

  async remove(id: string) {
    const media = await this.mediaRepository.findById(id);
    if (!media) throw new NotFoundException('Media not found');
    return this.mediaRepository.remove(id);
  }
}
