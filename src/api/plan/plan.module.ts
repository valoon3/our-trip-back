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
import { PlanDetailEntity } from '../../db/entities/trip/planDetail.entity';
import { PlanDetailRepository } from './planDetail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, User, Place, PlanDetailEntity])],
  controllers: [PlanController],
  providers: [
    PlanService,
    PlanRepository,
    UserRepository,
    PlaceRepository,
    PlanDetailRepository,
  ],
})
export class PlanModule {}
