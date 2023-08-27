import { Test, TestingModule } from '@nestjs/testing';
import { TripService } from './trip.service';
import { TripRepository } from './trip.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../db/entities/User.entity';
import { Bookmark } from '../../db/entities/trip/bookmark.entity';
import { Place } from '../../db/entities/trip/Place.entity';
import { TripController } from './trip.controller';
import { Entity, Repository } from 'typeorm';
import { UserRepository } from '../user/user.repository';
import { TypeOrmConfigService } from '../../config/db/typeorm.config';
import { ConfigService } from '@nestjs/config';

describe('TripService', () => {
  let service: TripService;
  let repository: TripRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TripService,
        {
          provide: TripRepository,
          useClass: Repository<Bookmark>,
        },
      ],
    }).compile();

    service = await module.get<TripService>(TripService);
    repository = await module.get<TripRepository>(TripRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('test repository', async () => {
    const userId = 1;
    const placeId = 'ChIJ_WV5BnSofDURDb6CgHbe7HE';

    await repository.getBookMarkByPlaceId(userId, placeId);
  });
});
