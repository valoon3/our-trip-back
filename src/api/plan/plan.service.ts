import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanRepository } from './plan.repository';
import { UserRepository } from '../user/user.repository';
import { PlaceRepository } from '../trip/place.repository';
import { Plan } from '../../db/entities/trip/plan.entity';
import { PlanDetailRepository } from './planDetail.repository';
import { PlanDto } from './dto/plan.dto';

@Injectable()
export class PlanService {
  constructor(
    private readonly planRepository: PlanRepository,
    private readonly userRepository: UserRepository,
    private readonly placeRepository: PlaceRepository,
    private readonly planDetailRepository: PlanDetailRepository,
  ) {}

  // 계획 생성
  async createPlan(user: any, createPlanDto: CreatePlanDto) {
    const plan = this.planRepository.create({
      title: createPlanDto.title,
      description: createPlanDto.description,
      startDate: createPlanDto.startDate,
      endDate: createPlanDto.endDate,
      user: user,
    });

    const saveEntity = await this.planRepository.save(plan);

    const { id, ...result } = saveEntity;

    return result;
  }

  // 해당 사용자의 모든 계획을 가져온다.
  async findAllPlan(user) {
    try {
      const planList: Plan[] = await this.planRepository.find({
        // where: { user },
        relations: {
          user: true,
        },
      });

      const result = planList.map((plan) => ({
        title: plan.title,
        description: plan.description,
        startDate: plan.startDate,
        endDate: plan.endDate,
        createdAt: plan.createdAt,
        updatedAt: plan.updatedAt,
      }));

      return result;
    } catch (err) {
      console.error(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  removePlan(user, plan: Plan) {
    // return
  }

  // 사용자의 계획 유형 가져오기
}
