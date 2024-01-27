import { Injectable } from '@nestjs/common';
import { PlanDetailEntity } from '../../db/entities/trip/planDetail.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlanDetailRepository extends Repository<PlanDetailEntity> {
  constructor(private dataSource: DataSource) {
    super(PlanDetailEntity, dataSource.createEntityManager());
  }
}
