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

describe('PlanController', () => {
  let planController: PlanController;
  let planService: PlanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true, // 전체적으로 사용하기 위해
          load: [globalConfig],
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        // TypeOrmModule.forFeature([User, Bookmark, Place, PlanEntity]),
        TypeOrmModule.forFeature([Plan, User, Bookmark, Place]),
      ],
      controllers: [PlanController],
      providers: [PlanService, PlanRepository],
    }).compile();

    planService = module.get<PlanService>(PlanService);
    planController = module.get<PlanController>(PlanController);
  });

  it('planController / planService 객체 생성', () => {
    expect(planController).toBeDefined();
    expect(planService).toBeDefined();
  });
});
