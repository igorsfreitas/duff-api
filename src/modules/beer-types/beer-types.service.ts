import { Injectable } from '@nestjs/common';
import { CreateBeerTypeDto } from './dto/create-beer-type.dto';
import { UpdateBeerTypeDto } from './dto/update-beer-type.dto';
import { BeerTypeRepository } from './repositories/beer-type.repository';

@Injectable()
export class BeerTypesService {
  constructor(private readonly beerTypeRepository: BeerTypeRepository) {}

  async create(createBeerTypeDto: CreateBeerTypeDto) {
    return await this.beerTypeRepository.create(createBeerTypeDto);
  }

  findAll() {
    return this.beerTypeRepository.findAll();
  }

  findOne(id: string) {
    return this.beerTypeRepository.findById(id);
  }

  update(updateBeerTypeDto: UpdateBeerTypeDto) {
    return this.beerTypeRepository.update(updateBeerTypeDto);
  }

  remove(id: string) {
    return this.beerTypeRepository.delete(id);
  }
}
