import { TripRepository } from '../../../src/api/trip/trip.repository';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { User } from '../../../src/db/entities/User.entity';
import { Place } from '../../../src/db/entities/trip/place.entity';

describe('tripRepository', () => {
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
      providers: [TripRepository],
    }).compile();

    tripRepository = module.get(TripRepository);
  });

  test('tripRepository 객체 생성', () => {
    expect(tripRepository).toBeDefined();
  });

  describe('getBookMarks', () => {
    test('사용자 아이디의 전체 북마크 가져오기', async () => {
      const userLoginId = 1;
      const result = await tripRepository.getBookMarks(userLoginId);

      expect(typeof result).toBe('object');
    });
  });

  describe('getBookMarkByPlaceId method', () => {
    const userLoginId = 1;
    const placeId = 'ChIJb3SX4XSofDURkMRiEPLn1ac';

    test('해당 유저의 북마크아이디가 존재함', async () => {
      const result = await tripRepository.getBookMarkByPlaceId(
        userLoginId,
        placeId,
      );

      expect(result).toBeTruthy();
    });

    test('해당 유저의 북마크아이디가 존재하지 않음', async () => {
      const result = await tripRepository.getBookMarkByPlaceId(
        userLoginId,
        'placeId',
      );

      expect(result).toBeFalsy();
    });
  });
});
