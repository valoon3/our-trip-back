import { Module } from '@nestjs/common';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import { BookmarkRepository } from './bookmark.repository';
import { PlaceRepository } from './place.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/User.entity';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { Place } from '../../db/entities/trip/Place.entity';
import { Plan } from '../../db/entities/trip/plan.entity';
import { UserRepository } from '../user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User, Bookmark, Place, Plan])],
  controllers: [TripController],
  providers: [TripService, BookmarkRepository, PlaceRepository, UserRepository],
})
export class TripModule {}
