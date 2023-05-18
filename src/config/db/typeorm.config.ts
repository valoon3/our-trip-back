import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDev: boolean = this.config.get('MODE') === 'dev' ? true : false;

    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST'),
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      schema: this.config.get<string>('DATABASE_SCHEMA'),
      // password: this.config.get<string>('DATABASE_PASSWORD'),
      entities: ['dist/**/*.entity.{ts,js}'],
      autoLoadEntities: true,
      // migrations: ['dist/migrations/*.{ts,js}'],
      // migrationsTableName: 'typeorm_migrations',
      // logger: 'file',
      logging: isDev,
      synchronize: true, // never use TRUE in production!
    };
  }
}
