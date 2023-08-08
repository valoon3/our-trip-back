import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { TripRepository } from './trip.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/user.entity';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark])],
  controllers: [TripController],
  providers: [TripService, TripRepository],
})
export class TripModule {}
