import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { BeerTypesService } from './beer-types.service';
import { CreateBeerTypeDto } from './dto/create-beer-type.dto';
import { UpdateBeerTypeDto } from './dto/update-beer-type.dto';

@Controller('beer-types')
export class BeerTypesController {
  constructor(private readonly beerTypesService: BeerTypesService) {}

  @Post()
  create(@Body() createBeerTypeDto: CreateBeerTypeDto) {
    return this.beerTypesService.create(createBeerTypeDto);
  }

  @Get('best-by-temperature')
  getBestBeerTypeByTemperature(@Query('temperature') temperature: number) {
    return this.beerTypesService.findBestByTemperature(temperature);
  }

  @Get()
  findAll() {
    return this.beerTypesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.beerTypesService.findOne(id);
  }

  @Patch()
  update(@Body() updateBeerTypeDto: UpdateBeerTypeDto) {
    return this.beerTypesService.update(updateBeerTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.beerTypesService.remove(id);
  }
}
