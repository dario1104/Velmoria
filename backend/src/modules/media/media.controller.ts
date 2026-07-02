import { Controller, Get, Post, Delete, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MediaService } from './media.service';

@Controller()
@UseGuards(JwtAuthGuard)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get('markers/:markerId/media')
  findByMarker(@Param('markerId') markerId: string) {
    return this.mediaService.findByMarker(markerId);
  }

  @Post('media/upload')
  upload() {
    return { message: 'Upload endpoint - implement with multer/S3' };
  }

  @Delete('media/:id')
  remove(@Param('id') id: string) {
    return this.mediaService.remove(id);
  }
}
