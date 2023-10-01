import { Injectable } from '@nestjs/common';
import { Plan } from '../../db/entities/trip/plan.entity';
import { DataSource, Repository } from 'typeorm';
import { Place } from '../../db/entities/trip/Place.entity';

@Injectable()
export class PlanRepository extends Repository<Plan> {
  constructor(private dataSource: DataSource) {
    super(Plan, dataSource.createEntityManager());
  }
}
