import { Test, TestingModule } from '@nestjs/testing';
import { TripController } from './trip.controller';
import { TripService } from './trip.service';
import * as request from 'supertest';

describe('TripController', () => {
  let controller: TripController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripController, TripService],
    }).compile();

    controller = module.get<TripController>(TripController);
  });

  it('Trip Controller should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('/ (GET)', () => {
  //   return request(app.getHttpServer());
  //   expect();
  // });
});
