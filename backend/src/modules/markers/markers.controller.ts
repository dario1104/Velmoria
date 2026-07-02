import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { MarkersService } from './markers.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';

@Controller()
@UseGuards(JwtAuthGuard)
export class MarkersController {
  constructor(private readonly markersService: MarkersService) {}

  @Get('trips/:tripId/markers')
  findByTrip(@Param('tripId') tripId: string) {
    return this.markersService.findByTrip(tripId);
  }

  @Post('trips/:tripId/markers')
  create(@Param('tripId') tripId: string, @Body() dto: CreateMarkerDto) {
    return this.markersService.create(tripId, dto);
  }

  @Get('markers/:id')
  findOne(@Param('id') id: string) {
    return this.markersService.findOne(id);
  }

  @Patch('markers/:id')
  update(@Param('id') id: string, @Body() dto: UpdateMarkerDto) {
    return this.markersService.update(id, dto);
  }

  @Delete('markers/:id')
  remove(@Param('id') id: string) {
    return this.markersService.remove(id);
  }
}
