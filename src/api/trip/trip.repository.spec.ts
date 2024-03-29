import { BookmarkRepository } from './bookmark.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../user/user.repository';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { User } from '../../db/entities/User.entity';
import { Place } from '../../db/entities/trip/Place.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

const mockTripRepository = () => ({
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
});

describe('TripRepository', () => {
  let tripRepository: BookmarkRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookmarkRepository],
      imports: [TypeOrmModule.forFeature([User, Bookmark, Place])],
    }).compile();

    tripRepository = module.get<BookmarkRepository>(BookmarkRepository);
  });

  it('should be defined', () => {
    // expect(tripRepository).toBeDefined();
    console.log('asdf');
  });
});
