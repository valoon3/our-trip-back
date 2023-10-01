import { Injectable } from '@nestjs/common';
import { PlanDetail } from '../../db/entities/trip/planDetail';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PlanDetailRepository extends Repository<PlanDetail> {
  constructor(private dataSource: DataSource) {
    super(PlanDetail, dataSource.createEntityManager());
  }
}
