import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeerTypeDto } from '../dto/create-beer-type.dto';
import { BeerType } from '../entities/beer-type.entity';
import { IFindPayload } from '@commons/types/find.type';
import { errorMessages } from '@commons/constants/errors';
import { UpdateBeerTypeDto } from '../dto/update-beer-type.dto';
import { DeletedResponse } from '@commons/types/delete.type';

@Injectable()
export class BeerTypeRepository {
  constructor(
    @InjectRepository(BeerType)
    private beerTypeRepository: Repository<BeerType>,
  ) {}

  async create(payload: CreateBeerTypeDto): Promise<BeerType> {
    const createBeerType = this.beerTypeRepository.create(payload);

    return await this.beerTypeRepository.save(createBeerType);
  }

  async update({ id, ...payload }: UpdateBeerTypeDto): Promise<BeerType> {
    const beerType = await this.findById(id);
    Object.assign(beerType, payload);

    return await this.beerTypeRepository.save(beerType);
  }

  async findAll(): Promise<IFindPayload<BeerType>> {
    const [beerTypes, count] = await this.beerTypeRepository.findAndCount();

    return { data: beerTypes, count };
  }

  async findById(id: string): Promise<BeerType> {
    const beerType = await this.beerTypeRepository.findOne({
      where: { id },
    });

    if (!beerType) throw new NotFoundException(errorMessages.beerType.notFound);
    return beerType;
  }

  async delete(id: string): Promise<DeletedResponse> {
    const beerType = await this.findById(id);
    const result = await this.beerTypeRepository.softDelete({
      id: beerType.id,
    });
    return { deleted: !!result.affected };
  }

  async findBestByTemperature(temperature: number): Promise<BeerType> {
    const beerType = await this.beerTypeRepository
      .createQueryBuilder('bt')
      .select('bt.type as type')
      .addSelect(
        `
        (
          CASE 
            WHEN ((bt.max_temperature + bt.min_temperature)/2) = 0 THEN (${temperature}*-1)
            WHEN ((bt.max_temperature + bt.min_temperature)/2) != 0 THEN (${temperature} + ((bt.max_temperature + bt.min_temperature)/2))
          END
        ) as diferenca
      `,
      )
      .where(`${temperature} BETWEEN bt.min_temperature and bt.max_temperature`)
      .orderBy('2 ASC, type')
      .getRawOne();

    if (!beerType) throw new NotFoundException(errorMessages.beerType.notFound);

    return beerType;
  }
}
