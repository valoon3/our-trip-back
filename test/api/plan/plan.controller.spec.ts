import { PlanController } from '../../../src/api/plan/plan.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { PlanService } from '../../../src/api/plan/plan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from '../../../src/db/entities/trip/plan.entity';
import { ConfigModule } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { PlanRepository } from '../../../src/api/plan/plan.repository';
import { Place } from '../../../src/db/entities/trip/Place.entity';
import { User } from '../../../src/db/entities/User.entity';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { createPlaceSample } from '../../sampleData/place.sample';
import { UserRepository } from '../../../src/api/user/user.repository';
import { PlaceRepository } from '../../../src/api/trip/place.repository';

describe('PlanController', () => {
  let planController: PlanController;
  let planService: PlanService;
  let planRepository: PlanRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true, // 전체적으로 사용하기 위해
          load: [globalConfig],
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        TypeOrmModule.forFeature([Plan, User, Bookmark, Place]),
      ],
      controllers: [PlanController],
      providers: [PlanService, PlanRepository, UserRepository, PlaceRepository],
    }).compile();

    planRepository = module.get<PlanRepository>(PlanRepository);
    planService = module.get<PlanService>(PlanService);
    planController = module.get<PlanController>(PlanController);
  });

  it('planController / planService 객체 생성', () => {
    expect(planController).toBeDefined();
    expect(planService).toBeDefined();
  });

  describe('planRepository', () => {
    test('join 결과', async () => {
      const result = await planRepository.findAllPlan(1);
      console.log(result);
    });

    test('사용자의 계획이 없는 경우', async () => {
      const userId = {
        id: 0,
      };

      const plan = await planRepository.find({
        where: { id: userId.id },
      });

      expect(plan.length).toBe(0);
    });
  });

  describe('planService', () => {
    describe('createPlan', () => {
      test('해당 사람의 계획이 없는 경우', async () => {
        const spyfn = jest.spyOn(planRepository, 'findOne');
        const userId = {
          id: 1,
        };
        const result = await planService.createPlan(userId, createPlaceSample);
        // expect(spyfn).toBeCalledTimes(1);
        console.log('test', result);
      });
    });

    describe('select', () => {
      test('findAllPlan', async () => {
        const result = await planService.findAllPlan({ id: 1 });
        console.log(result);
      });
    });

    describe('delete', () => {
      test('removePlan', async () => {
        const sampleUser = { id: 1 };
        const selectAll = await planService.findAllPlan({ id: 1 });
        const result = await planService.removePlan(sampleUser, selectAll[0]);
        console.log(result);
      });
    });
  });
});
