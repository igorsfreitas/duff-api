import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dot from 'dotenv';

async function bootstrap() {
  dot.config();

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3333);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
