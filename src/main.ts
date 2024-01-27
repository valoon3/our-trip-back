import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());

  // swagger setting
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Our-trip-back API')
    .setDescription('Our-trip-back API')
    .setVersion('1.0')
    // .addTag('tag')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/swagger', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // cors
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  let port = 8080;

  if (process.env.NODE_ENV === 'production') {
    port = Number(process.env.PORT);
  }

  await app.listen(port).then(() => {
    console.log(`waiting in ${port}!!!`);
  });
}

bootstrap();
