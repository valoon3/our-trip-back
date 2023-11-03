import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors({
    origin: true,
    credentials: true,
  });
  let port = 8080;

  if (process.env.NODE_ENV === 'production') {
    port = Number(process.env.PORT);
  }

  await app.listen(port).then(() => {
    console.log(`waiting in ${port}!!!`);
  });
}

bootstrap();
