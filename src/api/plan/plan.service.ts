import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanRepository } from './plan.repository';
import { UserRepository } from '../user/user.repository';
import { PlaceRepository } from '../trip/place.repository';
import { Plan } from '../../db/entities/trip/plan.entity';
import { PlanDetailRepository } from './planDetail.repository';
import { PlanDto } from './dto/plan.dto';
import { User } from '../../db/entities/User.entity';

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
    delete result.user;

    return result;
  }

  // 해당 사용자의 모든 계획을 가져온다.
  async findAllPlan(user) {
    try {
      const planList = await this.planRepository.find({
        relations: {
          user: true,
          planDetail: true,
        },
      });

      return planList
        .filter((plan) => plan.user.id === user.id)
        .map((plan) => {
          const { id, user, ...result } = plan;
          return result;
        });
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
