import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dot from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  dot.config();

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Duff API')
    .setDescription('The duff API description')
    .setVersion('1.0')
    .addTag('duff')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3333);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
