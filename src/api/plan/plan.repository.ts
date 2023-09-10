import { Injectable } from '@nestjs/common';
import { Plan } from '../../db/entities/trip/plan.entity';
import { DataSource, Repository } from 'typeorm';
import { Place } from '../../db/entities/trip/Place.entity';

@Injectable()
export class PlanRepository extends Repository<Plan> {
  constructor(private dataSource: DataSource) {
    super(Plan, dataSource.createEntityManager());
  }

  async createPlan(user, place: Place) {
    await super.delete({ user: user.id, place: place });
  }

  async findAllPlan(userId: number) {
    const result = await super
      .createQueryBuilder('plan')
      .orderBy('plan.priority', 'ASC')
      .leftJoinAndSelect('plan.place', 'place')
      .where('plan.user = :id', { id: userId })
      .getMany();
    return result;
  }
}
