// import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { TypeOrmConfigService } from './config/db/typeorm.config';
//
// describe('AppController', () => {
//   let appController: AppController;
//
//   beforeEach(async () => {
//     const app: TestingModule = await Test.createTestingModule({
//       controllers: [AppController],
//       providers: [AppService],
//       imports: [TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService })],
//     }).compile();
//
//     appController = app.get<AppController>(AppController);
//   });
//
//   describe('root', () => {
//     it('should return "Hello World!"', () => {
//       expect(appController.getHello()).toBe('Hello World!');
//     });
//   });
// });
