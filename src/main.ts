import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import * as path from 'path';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  app.enableCors({
    origin: true,
    credentials: true,
  });
  const port = 8080;

  await app.listen(port).then(() => {
    console.log(`waiting in ${port}!!!`);
  });
}

bootstrap();
