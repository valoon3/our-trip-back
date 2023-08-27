import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { LoginRequestDto } from '../src/api/auth/dto/login.request.dto';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/signin 로그인 (POST)', () => {
    console.log('test');

    const loginRequestDto: LoginRequestDto = {
      email: 'asdf@naver.com',
      password: '1234',
    };

    return request(app.getHttpServer())
      .post('/api/user/signin')
      .send(loginRequestDto)
      .expect(201)
      .expect(
        '{"loginError":false,"userInfo":{"name":"나병호","password":"$2b$10$eFJfLzICKXyuFdhsUs5arO2hM40fPKNaRpcq2Xm3aDcEkpVHXqFbe","email":"asdf@naver.com"}}',
      );
  });
});
