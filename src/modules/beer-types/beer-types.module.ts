import { Module } from '@nestjs/common';
import { BeerTypesService } from './beer-types.service';
import { BeerTypesController } from './beer-types.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BeerType } from './entities/beer-type.entity';
import { BeerTypeRepository } from './repositories/beer-type.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BeerType])],
  controllers: [BeerTypesController],
  providers: [BeerTypesService, BeerTypeRepository],
  exports: [BeerTypesService, BeerTypeRepository],
})
export class BeerTypeModule {}
