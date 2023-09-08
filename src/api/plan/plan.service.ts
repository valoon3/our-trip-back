import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { PlanRepository } from './plan.repository';
import { UserRepository } from '../user/user.repository';
import { PlaceRepository } from '../trip/place.repository';

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
      const plans = await this.planRepository.find({
        where: { user: user.id },
      });

      if (plans.length > 0) lastPlanPriority = plans.length;

      const updatePlace = await this.placeRepository.createAndUpdate(
        createPlanDto,
      );

      // plans.find(plan => {
      //   if(plan.place === )
      // })
    } catch (err) {
      if (err) console.error(err);
    }

    return 'This action adds a new plan';
  }

  // 해당 사용자의 모든 계획을 가져온다.
  async findAllPlan(user) {
    // return await this.planRepository.createQueryBuilder('plan');
  }

  findOne(id: number) {
    return `This action returns a #${id} plan`;
  }

  update(id: number, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: number) {
    return `This action removes a #${id} plan`;
  }

  private async placeCheck(createPlanDto: CreatePlanDto) {
    const place = await this.placeRepository.createAndUpdate(createPlanDto);
    console.log(place);
  }
}
