import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanRepository } from './plan.repository';
import { UserRepository } from '../user/user.repository';
import { PlaceRepository } from '../trip/place.repository';
import { Plan } from '../../db/entities/trip/plan.entity';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly userRepository: UserRepository,
    private readonly placeRepository: PlaceRepository,
  ) {}

  async createPlan(user: any, createPlanDto: CreatePlanDto) {
    const lastPlanPriority = 1;

    return 'This action adds a new plan';
  }

  // 해당 사용자의 모든 계획을 가져온다.
  async findAllPlan(user) {
    return await this.planRepository.findAllPlan(user.id);
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  async updatePlanPriority(user, updatePlanDto: UpdatePlanDto[]) {
    await this.planRepository.delete({
      user: user.id,
    });
    const newPlanArray: Plan[] = updatePlanDto.map((plan) => ({
      user: user.id,
      place: plan.place_id,
      priority: plan.priority,
    }));

    return this.planRepository.create(newPlanArray);
  }

  removePlan(user, plan: Plan) {
    return this.planRepository.delete({
      user: user.id,
      priority: plan.priority,
    });
  }

  // 사용자의 계획 유형 가져오기
}
