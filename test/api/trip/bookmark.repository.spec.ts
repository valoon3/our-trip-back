import { BookmarkRepository } from '../../../src/api/trip/bookmark.repository';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { User } from '../../../src/db/entities/User.entity';
import { Place } from '../../../src/db/entities/trip/place.entity';

describe('BookmarkRepository', () => {
  let tripRepository: BookmarkRepository;

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
      providers: [BookmarkRepository],
    }).compile();

    tripRepository = module.get(BookmarkRepository);
  });

  test('tripRepository 객체 생성', () => {
    expect(tripRepository).toBeDefined();
  });

  describe('getBookMarks', () => {
    const partOfResult = {
      id: 6,
      place: {
        id: 'ChIJb3SX4XSofDURkMRiEPLn1ac',
        name: '야탑역',
        address: '대한민국 경기도 성남시 분당구 성남대로 903',
        geometry_lat: 37.41132,
        geometry_lng: 127.128674,
        rating: 4,
        business_status: 'OPERATIONAL',
        formatted_address: '대한민국 경기도 성남시 분당구 성남대로 903',
        icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/generic_business-71.png',
        icon_background_color: '#7B9EB0',
        icon_mask_base_uri:
          'https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet',
        types: [
          'subway_station',
          'transit_station',
          'point_of_interest',
          'establishment',
        ],
        user_ratings_total: 129,
      },
    };

    test('사용자 아이디의 전체 북마크 가져오기', async () => {
      const userLoginId = 1;
      const result = await tripRepository.getBookMarks(userLoginId);

      console.log(result);

      expect(result).toContainEqual(partOfResult);
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
