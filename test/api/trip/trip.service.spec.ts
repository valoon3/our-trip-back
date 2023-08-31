import { TripService } from '../../../src/api/trip/trip.service';
import { Test, TestingModule } from '@nestjs/testing';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { expect, jest, test } from '@jest/globals';
import { Repository } from 'typeorm';
import { TripRepository } from '../../../src/api/trip/trip.repository';

const mockTripRepository = () => ({
  getBookMarks: jest.fn(),
  getBookMarkByPlaceId: jest.fn(),
});

describe('TripService', () => {
  let tripService: TripService;
  let tripRepository: TripRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: TripRepository,
          useValue: mockTripRepository(),
        },
      ],
    }).compile();

    tripService = module.get<TripService>(TripService);
  });

  test('TripService 객체 생성', () => {
    expect(tripService).toBeDefined();
  });

  // test('test', async () => {
  //   jest.spyOn(tripRepository, 'getBookMarks').mockResolvedValue('asdf');
  //
  //   const result = await tripService.getBookMarks(1);
  //   expect(result).toBe({ name: 'asdf' });
  // });

  describe('getBookMarks', () => {
    test('해당 유저의 모든 북마크를 가져온 결과값이 있다.', async () => {
      const userLoginId = 1;

      const result = await tripService.getBookMarks(userLoginId);

      expect(result).not.toBeNull();
    });

    test('repository getBookMarks 가 사용되었다.', async () => {
      // const expectResult: Array<Bookmark> = [];
      // const getBookMarks = jest.spyOn(tripRepository, 'getBookMarks');
      // const result = await tripService.getBookMarks(1);
      //
      // expect(result).toHaveBeenCalledTimes(1);
    });
  });
});
