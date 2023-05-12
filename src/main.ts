import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = 8080;

  await app.listen(port).then(() => {
    console.log(`waiting in ${port}!!!`);
  });
}
bootstrap();
