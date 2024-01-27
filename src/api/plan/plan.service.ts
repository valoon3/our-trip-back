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
import { GoogleMapPlaceResult } from '../../common/types/googleMap.type';

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

  async createDetailPlan(
    user: any,
    selectedPlan: CreatePlanDto,
    selectedDate: Date,
    placeResult: GoogleMapPlaceResult,
  ) {
    console.log(user);
    console.log(selectedPlan);
    console.log(placeResult);

    const planList = await this.planRepository.find({
      where: {
        user: {
          email: user.email,
        },
        title: selectedPlan.title,
        description: selectedPlan.description,
        startDate: selectedPlan.startDate,
        endDate: selectedPlan.endDate,
        createdAt: selectedPlan.createdAt,
      },
      relations: {
        user: true,
        planDetail: true,
      },
    });

    console.log(planList);

    return true;
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
          const result = {
            title: plan.title,
            description: plan.description,
            startDate: plan.startDate.toISOString(),
            endDate: plan.endDate.toISOString(),
            createdAt: plan.createdAt.toISOString(),
            updatedAt: plan.updatedAt.toISOString(),
            planDetail: plan.planDetail,
          };

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
