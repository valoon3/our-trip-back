import { TripService } from '../../../src/api/trip/trip.service';
import { Test } from '@nestjs/testing';
import { TripRepository } from '../../../src/api/trip/trip.repository';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { User } from '../../../src/db/entities/User.entity';
import { ConfigModule } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { Place } from '../../../src/db/entities/trip/Place.entity';
import { expect, jest, test } from '@jest/globals';

describe('TripService', () => {
  let tripService: TripService;
  let tripRepository: TripRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [globalConfig],
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        TypeOrmModule.forFeature([Bookmark, User, Place]),
      ],
      providers: [TripService, TripRepository],
    }).compile();

    tripService = module.get(TripService);
    tripRepository = module.get(TripRepository);
  });

  test('TripService 객체 생성', () => {
    expect(tripService).toBeDefined();
  });

  describe('getBookMarks', () => {
    test('해당 유저의 모든 북마크를 가져온 결과값이 있다.', async () => {
      const userLoginId = 1;
      const bookmark = mock();

      const result = await tripService.getBookMarks(userLoginId);

      expect(result).toHaveReturned();
    });

    test('', () => {
      const expectResult: Array<Bookmark> = [];
      const getBookMarks = jest
        .spyOn(tripRepository, 'getBookMarks')
        .mockResolvedValue(expectResult);

      expect(expectResult).toHaveBeenCalledTimes(1);
    });
  });
});
