import { Test } from '@nestjs/testing';
import { UserRepository } from '../../../src/api/user/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../../../src/db/entities/User.entity';
import { TypeOrmConfigService } from '../../../src/config/db/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import globalConfig from '../../../src/globalConfiguration';
import { Bookmark } from '../../../src/db/entities/trip/bookmark.entity';
import { Place } from '../../../src/db/entities/trip/place.entity';
import { NotFoundException } from '@nestjs/common';

describe('userRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [globalConfig],
        }),
        TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
        TypeOrmModule.forFeature([User, Bookmark, Place]),
      ],
      providers: [ConfigService, UserRepository],
    }).compile();

    userRepository = module.get(UserRepository);
  });

  test('userRepository 객체 생성', () => {
    expect(userRepository).toBeDefined();
  });

  describe('checkExistEmail method', () => {
    test('메서드가 존재함', () => {
      expect(typeof userRepository.checkExistEmail).toBe('function');
    });

    test('해당 이메일이 존재하지 않음', async () => {
      const email = 'asd@naver.com';
      const result = await userRepository.checkExistEmail(email);

      expect(result).toBe(false);
    });

    test('해당 이메일이 존재함', async () => {
      const email = 'asdf@naver.com';
      const result = await userRepository.checkExistEmail(email);

      expect(result).toBeTruthy();
    });
  });

  describe('findOneByUserEmail method', () => {
    test('메서드가 존재함', () => {
      expect(typeof userRepository.findOneByUserEmail).toBe('function');
    });

    test('이메일이 일치하지 않는 경우', async () => {
      const email = 'asd@naver.com';
      try {
        await userRepository.findOneByUserEmail(email);
      } catch (e) {
        expect(e).toStrictEqual(
          new NotFoundException(
            '해당 이메일이 존재하지 않습니다. 이메일을 확인해 주세요.',
            {
              cause: new Error(),
              description: '해당 이메일이 존재하지 않습니다.',
            },
          ),
        );
      }
    });

    test('findOneByUserEmail 이메일을 확인함', async () => {
      const email = 'asdf@naver.com';
      const userResult = await userRepository.findOneByUserEmail(email);

      expect(userResult).toEqual({
        createdAt: new Date('2023-08-15T07:37:57.053Z'),
        deletedAt: null,
        email: 'asdf@naver.com',
        id: 1,
        name: '나병호',
        password:
          '$2b$10$eFJfLzICKXyuFdhsUs5arO2hM40fPKNaRpcq2Xm3aDcEkpVHXqFbe',
        updatedAt: new Date('2023-08-15T07:37:57.053Z'),
      });
    });
  });
});
