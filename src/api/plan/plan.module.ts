import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { Plan } from '../../db/entities/trip/plan.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { User } from '../../db/entities/User.entity';
import { PlaceRepository } from '../trip/place.repository';
import { Place } from '../../db/entities/trip/Place.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, User, Place])],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository, UserRepository, PlaceRepository],
})
export class PlanModule {}
