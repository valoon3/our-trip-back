import { Module } from '@nestjs/common';
import { PlanService } from './plan.service';
import { PlanController } from './plan.controller';
import { PlanRepository } from './plan.repository';
import { Plan } from '../../db/entities/trip/plan.entity';
import { Place } from '../../db/entities/trip/Place.entity';
import { User } from '../../db/entities/User.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plan])],
  controllers: [PlanController],
  providers: [PlanService, PlanRepository],
})
export class PlanModule {}
