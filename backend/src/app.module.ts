import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { TripsModule } from './modules/trips/trips.module';
import { GpsModule } from './modules/gps/gps.module';
import { MarkersModule } from './modules/markers/markers.module';
import { MediaModule } from './modules/media/media.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    TripsModule,
    GpsModule,
    MarkersModule,
    MediaModule,
  ],
})
export class AppModule {}
