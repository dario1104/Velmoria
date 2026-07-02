import { Module } from '@nestjs/common';
import { MarkersController } from './markers.controller';
import { MarkersService } from './markers.service';
import { MarkersRepository } from './markers.repository';

@Module({
  controllers: [MarkersController],
  providers: [MarkersService, MarkersRepository],
})
export class MarkersModule {}
