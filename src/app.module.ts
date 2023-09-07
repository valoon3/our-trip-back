import { Module, NestModule } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/db/typeorm.config';
import { AuthModule } from './api/auth/auth.module';
import { TripModule } from './api/trip/trip.module';
import globalConfig from './globalConfiguration';
import { LoggerMiddleware } from './common/middlewares/Logger.middleware';
import { TestController } from './api/test/test/test.controller';
// import { TestServiceService } from './api/test-service/test-service.service';
import { PlanModule } from './api/plan/plan.module';
import { User } from './db/entities/User.entity';
import { Bookmark } from './db/entities/trip/bookmark.entity';
import { Place } from './db/entities/trip/Place.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
      load: [globalConfig],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    UserModule,
    AuthModule,
    TripModule,
    PlanModule,
  ],
  // providers: [TestServiceService],
  controllers: [TestController],
})
// todo : DB query 디버깅 방법 추가하자
export class AppModule implements NestModule {
  configure(consumer): any {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
