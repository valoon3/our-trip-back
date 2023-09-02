import { TripService } from '../../../src/api/trip/trip.service';
import { Test, TestingModule } from '@nestjs/testing';
import { expect, jest, test } from '@jest/globals';
import { BookmarkRepository } from '../../../src/api/trip/bookmark.repository';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';

const jestMock = jest.mock('../../../src/api/trip/trip.repository');

const sampleBookMarkDB = [
  {
    id: 1,
    user: 1,
    place: 'place sample1',
  },
  {
    id: 2,
    user: 1,
    place: 'place sample2',
  },
];

const mockTripRepository = () => ({
  getBookMarks: jest
    .fn<() => Promise<Bookmark[]>>()
    .mockResolvedValue(sampleBookMarkDB),
  getBookMarkByPlaceId: jest.fn(),
});

describe('TripService', () => {
  let tripService: TripService;
  let bookmarkRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: BookmarkRepository,
          useValue: mockTripRepository(),
        },
      ],
    }).compile();

    tripService = module.get<TripService>(TripService);
    bookmarkRepository = module.get<BookmarkRepository>(BookmarkRepository);
  });

  test('TripService 객체 생성', () => {
    expect(tripService).toBeDefined();
  });

  describe('getBookMarks', () => {
    test('해당 유저의 모든 북마크를 가져온 결과값이 있다.', async () => {
      const userLoginId = 1;

      const result = await tripService.getBookMarks(userLoginId);
      const spyTest = jest.spyOn(bookmarkRepository, 'getBookMarks');

      expect(spyTest).toHaveBeenCalledTimes(1);
      expect(result).not.toBeNull();
      expect(result).toStrictEqual(['place sample1', 'place sample2']);
    });

    test('repository getBookMarks 가 사용되었다.', async () => {
      // const expectResult: Array<Bookmark> = [];
      // const getBookMarks = jest.spyOn(tripRepository, 'getBookMarks');
      // const result = await tripService.getBookMarks(1);
      //
      // expect(result).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBookMarkByOne', () => {
    test('getBookMarksByOne 이 사용되었다.', async () => {});
  });
});
