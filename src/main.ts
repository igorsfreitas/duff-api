import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dot from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './commons/filters/http-exception.filter';
import { HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  dot.config();

  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Duff API')
    .setDescription('The duff API description')
    .setVersion('1.0')
    .addTag('duff')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3333);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
