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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
      load: [globalConfig],
    }),
    // TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    TypeOrmModule.forRoot(TypeOrmConfigService),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.DATABASE_HOST,
    //   port: Number(process.env.DATABASE_PORT),
    //   username: process.env.DATABASE_USER,
    //   database: process.env.DATABASE_NAME,
    //   entities: ['dist/**/*.entity.{js,ts}'],
    //   schema: process.env.DATABASE_SCHEMA,
    //   autoLoadEntities: true,
    //   logging: true,
    //   synchronize: true,
    // }),
    UserModule,
    AuthModule,
    TripModule,
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
