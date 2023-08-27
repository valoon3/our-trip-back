import { UserController } from '../../../src/api/user/user.controller';
import { UserModule } from '../../../src/api/user/user.module';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../../src/api/user/user.service';
import { AuthService } from '../../../src/api/auth/auth.service';

describe('UserController', () => {
  let userController: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, AuthService],
    }).compile();

    userController = module.get<UserController>(UserController);
  });

  it('UserController should be defined', () => {
    expect(userController).toBeDefined();
  });
});
