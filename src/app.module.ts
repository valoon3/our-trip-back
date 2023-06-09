import { Module, NestModule } from '@nestjs/common';
import { UserModule } from './api/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './config/db/typeorm.config';
import { AuthModule } from './api/auth/auth.module';
import { TripModule } from './api/trip/trip.module';
import globalConfig from './globalConfiguration';

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
  ],
  providers: [],
})
// todo : DB query 디버깅 방법 추가하자
export class AppModule {}
