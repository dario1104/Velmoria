import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { TripsService } from './trips.service';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';

@Controller('trips')
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  findAll(@Req() req: any) {
    return this.tripsService.findAll(req.user.id);
  }

  @Post()
  create(@Req() req: any, @Body() dto: CreateTripDto) {
    return this.tripsService.create(req.user.id, dto);
  }

  @Get(':id')
  findOne(@Req() req: any, @Param('id') id: string) {
    return this.tripsService.findOne(req.user.id, id);
  }

  @Patch(':id')
  update(@Req() req: any, @Param('id') id: string, @Body() dto: UpdateTripDto) {
    return this.tripsService.update(req.user.id, id, dto);
  }

  @Delete(':id')
  remove(@Req() req: any, @Param('id') id: string) {
    return this.tripsService.remove(req.user.id, id);
  }

  @Post(':id/finish')
  finish(@Req() req: any, @Param('id') id: string) {
    return this.tripsService.finish(req.user.id, id);
  }

  @Get(':id/stats')
  stats(@Req() req: any, @Param('id') id: string) {
    return this.tripsService.getStats(req.user.id, id);
  }
}
