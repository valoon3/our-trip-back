import { BookmarkRepository } from '../../../src/api/trip/bookmark.repository';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { User } from '../../../src/db/entities/User.entity';
import { Place } from '../../../src/db/entities/trip/place.entity';
import { GoogleMapPlaceResult } from '../../../src/common/types/googleMap.type';
import { QueryFailedError } from 'typeorm';

const createSample: GoogleMapPlaceResult[] = [
  {
    name: '테스트 장소',
    place_id: 'testPlaceId',
    formatted_address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
    lat: 37.41354949999999,
    lng: 127.1313097,
  },
  {
    name: '테스트 장소',
    place_id: 'testId',
    formatted_address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
    lat: 37.41354949999999,
    lng: 127.1313097,
  },
];

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

describe('BookmarkRepository', () => {
  let bookmarkRepository: BookmarkRepository;

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

    bookmarkRepository = module.get(BookmarkRepository);
  });

  test('tripRepository 객체 생성', () => {
    expect(bookmarkRepository).toBeDefined();
  });

  describe('select', () => {
    describe('getBookMarks method', () => {
      test('사용자의 전체 북마크 조회', async () => {
        const result = await bookmarkRepository.getBookMarks(1);
        expect(result).not.toBeNull();
      });
      test('해당 사용자가 존재하지 않거나 북마크가 없는 경우', async () => {
        const result = await bookmarkRepository.getBookMarks(0);
        expect(result).toStrictEqual([]);
      });
    });
    describe('getBookMarkByPlaceId method', () => {
      // test('', async () => {});
    });
  });

  describe('create', () => {
    describe('create method', () => {
      test('외래키 place table 을 정의해주어야한다.', async () => {
        try {
          await bookmarkRepository.createByGoogleMapPlaceResult(
            1,
            createSample[1],
          );
        } catch (err) {
          expect(err).toBeInstanceOf(QueryFailedError);
        }
      });

      test('외래키가 있는 테스트', async () => {
        await bookmarkRepository.createByGoogleMapPlaceResult(
          1,
          createSample[0],
        );
      });
    });
  });
});
