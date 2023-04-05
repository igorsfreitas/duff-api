import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { typeOrmConfig } from './config/database/sqlite.config';
import { configValidationSchema } from './config/config.schema';
import { BeerTypeModule } from '@modules/beer-types/beer-types.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: configValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    BeerTypeModule,
  ],
})
export class AppModule {}
