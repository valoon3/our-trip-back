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

  async createPlan(user, createPlanDto: CreatePlanDto) {
    let lastPlanPriority = 1;
    try {
      // 전체 계획을 가져온다.
      const plans = await this.planRepository.findAllPlan(user.id);

      if (plans.length > 0) lastPlanPriority = plans.length;

      // 장소관련 정보 업데이트
      const updatedPlace = await this.placeRepository.createAndUpdate(
        createPlanDto,
      );

      // 요청 장소가 이미 계획에 있다면 추가하지 않는다.
      if (!this.placeCheck(plans, createPlanDto.place_id)) {
        return await this.planRepository.insert({
          user: user.id,
          place: updatedPlace.identifiers[0].id,
          priority: lastPlanPriority,
        });
      }
    } catch (err) {
      if (err) console.error(err);
    }

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

  private placeCheck(plans: Plan[], targetPlaceId: string) {
    const existed = plans.find((plan) => {
      if (plan.place === targetPlaceId) return true;
    });
    return existed !== undefined;
  }
}
