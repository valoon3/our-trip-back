import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from '../../db/entities/trip/plan.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlanRepository {
  constructor(
    @InjectRepository(Plan)
    private planEntity: Repository<Plan>,
  ) {}
}
