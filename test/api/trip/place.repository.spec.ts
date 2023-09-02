import { PlaceRepository } from '../../../src/api/trip/place.repository';
import { Test } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { User } from '../../../src/db/entities/User.entity';
import { Place } from '../../../src/db/entities/trip/Place.entity';
import { GoogleMapPlaceResult } from '../../../src/common/types/googleMap.type';

const createSample: GoogleMapPlaceResult = {
  name: '테스트 장소',
  place_id: 'testId',
  formatted_address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
  lat: 37.41354949999999,
  lng: 127.1313097,
};

const samplePlaceDB = [
  {
    id: 'testId',
    name: '테스트 장소',
    address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
    geometry_lat: 37.41354949999999,
    geometry_lng: 127.1313097,
    rating: 4.2,
    business_status: 'OPERATIONAL',
    formatted_address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 317,
  },
  {
    id: 'ChIJ_WV5BnSofDURDb6CgHbe7HE',
    name: '춘향골남원추어탕 야탑점',
    address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
    geometry_lat: 37.41354949999999,
    geometry_lng: 127.1313097,
    rating: 4.2,
    business_status: 'OPERATIONAL',
    formatted_address: '대한민국 경기도 성남시 분당구 야탑동 377-1',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 317,
  },
  {
    id: 'ChIJS2yhFXSofDURMXchPAKXyEg',
    name: '삼육가 야탑직영점',
    address: '대한민국 경기도 성남시 분당구 야탑1동 361-2',
    geometry_lat: 37.4130776,
    geometry_lng: 127.1299774,
    rating: 4.2,
    business_status: 'OPERATIONAL',
    formatted_address: '대한민국 경기도 성남시 분당구 야탑1동 361-2',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 510,
  },
  {
    id: 'ChIJf1c-n3SofDURdCVlOQ_G2sI',
    name: '만강',
    address: '대한민국 경기도 성남시 분당구 장미로92번길 7-5',
    geometry_lat: 37.4131016,
    geometry_lng: 127.1316413,
    rating: 4.1,
    business_status: 'OPERATIONAL',
    formatted_address: '대한민국 경기도 성남시 분당구 장미로92번길 7-5',
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 688,
  },
  {
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
];

describe('PlaceRepository', () => {
  let placeRepository: PlaceRepository;

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
      providers: [PlaceRepository],
    }).compile();

    placeRepository = module.get<PlaceRepository>(PlaceRepository);
  });

  afterAll(async () => {
    if (await placeRepository.selectOne(createSample.place_id))
      await placeRepository.delete(createSample.place_id);
  });

  test('placeRepository 객체 생성', () => {
    expect(placeRepository).toBeDefined();
  });

  describe('select', () => {
    test('전체를 조회한 결과가 있다.', async () => {
      const result = await placeRepository.selectAll();
      expect(result).not.toBeNull();
    });
    test('하나의 placeId 를 조회한 결과가 있다.', async () => {
      await placeRepository.create(createSample);
      const result = await placeRepository.selectOne(createSample.place_id);
      console.log(result);
    });
    test('하나의 placeId 를 조회한 결과가 없다.', async () => {
      const result = await placeRepository.selectOne('notExistPlaceId');
      expect(result).toBeNull();
    });
  });

  describe('create and delete', () => {
    test('row 생성', async () => {
      const result = await placeRepository.create(createSample);
      console.log(result);
    });

    test('update', async () => {
      createSample.name = 'updatePlace';
      await placeRepository.create(createSample);
      const result = await placeRepository.selectOne(createSample.place_id);
      expect(result.address).toBe(createSample.formatted_address);
      expect(result.geometry_lng).toBe(createSample.lng);
      expect(result.geometry_lat).toBe(createSample.lat);
      expect(result.name).toBe('updatePlace');
    });

    test('생성된 row 삭제', async () => {
      await placeRepository.delete(createSample.place_id);
      const result = await placeRepository.selectOne(createSample.place_id);
      expect(result).toBeNull();
    });
  });
});
