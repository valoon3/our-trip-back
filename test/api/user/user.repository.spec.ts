import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../src/api/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../src/db/entities/User.entity';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { Place } from '../../../src/db/entities/trip/place.entity';

describe('userRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [globalConfig],
        }),
        TypeOrmModule.forRoot(TypeOrmConfigService),
        TypeOrmModule.forFeature([User, Bookmark, Place]),
      ],
      providers: [ConfigService, UserRepository],
    }).compile();

    userRepository = module.get(UserRepository);
  });

  test('userRepository 객체 생성', () => {
    expect(userRepository).toBeDefined();
  });
});
