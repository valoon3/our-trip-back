import { UserService } from '../../../src/api/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('userService', () => {
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
  });

  test('userService should be defined', () => {
    expect(userService).toBeDefined();
  });
});
