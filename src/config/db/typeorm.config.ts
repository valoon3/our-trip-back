import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { LoggerOptions } from 'typeorm';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const isDev: LoggerOptions = true;

    // production
    if (process.env.NODE_ENV === 'production') {
      return {
        type: 'postgres',
        // host: process.env.PG_HOST,
        host: 'postgres',
        port: this.config.get<number>('DATABASE_PORT'),
        database: this.config.get<string>('DATABASE_NAME'),
        username: this.config.get<string>('DATABASE_USER'),
        schema: this.config.get<string>('PG_SCHEMA'),
        password: this.config.get<string>('DATABASE_PASSWORD'),
        entities: ['dist/**/*.entity.{ts,js}'],
        autoLoadEntities: true,
        // migrations: ['dist/migrations/*.{ts,js}'],
        // migrationsTableName: 'typeorm_migrations',
        // logger: 'file',
        logging: isDev,
        synchronize: true, // never use TRUE in production!
      };
    }

    // local
    return {
      type: 'postgres',
      host: '127.0.0.1',
      port: this.config.get<number>('DATABASE_PORT'),
      database: this.config.get<string>('DATABASE_NAME'),
      username: this.config.get<string>('DATABASE_USER'),
      schema: this.config.get<string>('PG_SCHEMA'),
      password: this.config.get<string>('DATABASE_PASSWORD'),
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

// export const TypeOrmConfigService: TypeOrmModuleOptions = {
//   type: 'postgres',
//   host: process.env.DATABASE_HOST,
//   port: Number(process.env.DATABASE_PORT),
//   // database: process.env.DATABASE_NAME,
//   username: process.env.DATABASE_USER,
//   // password: process.env.DATABASE_PASSWORD,
//   database: 'postgres',
//   entities: ['dist/**/*.entity.{js,ts}'],
//   schema: process.env.DATABASE_SCHEMA,
//   autoLoadEntities: true,
//   logging: true,
//   synchronize: true,
// };
