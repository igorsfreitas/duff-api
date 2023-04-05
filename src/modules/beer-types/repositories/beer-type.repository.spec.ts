import {
  repositoryMockFactory,
  MockRepository,
} from '@tests/mocks/repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { errorMessages } from '@commons/constants/errors';
import { NotFoundException } from '@nestjs/common';
import { BeerTypeRepository } from './beer-type.repository';
import { BeerType } from '../entities/beer-type.entity';
import { CreateBeerTypeDto } from '../dto/create-beer-type.dto';
import { UpdateBeerTypeDto } from '../dto/update-beer-type.dto';

describe('BeerTypeRepository', () => {
  let repository: BeerTypeRepository;
  let entityRepository: MockRepository<BeerType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeerTypeRepository,
        {
          provide: getRepositoryToken(BeerType),
          useValue: repositoryMockFactory(),
        },
      ],
    }).compile();

    repository = module.get<BeerTypeRepository>(BeerTypeRepository);
    entityRepository = module.get<MockRepository<BeerType>>(
      getRepositoryToken(BeerType),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(entityRepository).toBeDefined();
  });

  it('should create a beer type', async () => {
    //Arrange
    const dto: CreateBeerTypeDto = {
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };
    jest.spyOn(entityRepository, 'create').mockReturnValue(dto);
    jest.spyOn(entityRepository, 'save').mockResolvedValue(new BeerType());
    jest.spyOn(repository, 'create');

    // act
    const beerType = await repository.create(dto);

    // assert
    expect(repository.create).toBeCalledTimes(1);
    expect(entityRepository.create).toBeCalledWith(dto);
    expect(entityRepository.save).toBeCalledTimes(1);
    expect(beerType).not.toBeNull();
  });

  it('should update a beer type', async () => {
    //Arrange
    const beerType: Partial<BeerType> = {
      id: '1',
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    const beerTypePayload: UpdateBeerTypeDto = {
      id: '1',
      type: 'Weissbier edited',
    };

    jest.spyOn(entityRepository, 'findOne').mockResolvedValue(beerType);
    jest.spyOn(entityRepository, 'save');
    jest.spyOn(repository, 'update');

    // act
    await repository.update(beerTypePayload);

    // assert
    expect(repository.update).toBeCalledTimes(1);
    expect(entityRepository.findOne).toBeCalledTimes(1);
    expect(entityRepository.save).toBeCalledTimes(1);
  });

  it('should find all beer types', async () => {
    //Arrange
    jest.spyOn(entityRepository, 'findAndCount').mockReturnValue([[], 0]);
    jest.spyOn(repository, 'findAll');

    // act
    await repository.findAll();

    // assert
    expect(repository.findAll).toBeCalledTimes(1);
    expect(repository.findAll).toBeCalledWith();
    expect(entityRepository.findAndCount).toBeCalledWith();
  });

  it('should find beer type by id', async () => {
    //Arrange
    const id = '123';
    jest.spyOn(entityRepository, 'findOne').mockResolvedValue({});
    jest.spyOn(repository, 'findById');

    // act
    await repository.findById(id);

    // assert
    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(id);
    expect(entityRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('should throw error when does not find beer type by id', async () => {
    //Arrange
    const id = '123';
    jest.spyOn(entityRepository, 'findOne').mockResolvedValue(undefined);
    jest.spyOn(repository, 'findById');

    // act
    await expect(repository.findById(id)).rejects.toThrow(
      new NotFoundException(errorMessages.beerType.notFound),
    );

    // assert
    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(id);
    expect(entityRepository.findOne).toBeCalledWith({ where: { id } });
  });

  it('should delete a beer type', async () => {
    //Arrange
    const beerType: Partial<BeerType> = {
      id: '1',
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    jest.spyOn(entityRepository, 'softDelete');
    jest.spyOn(entityRepository, 'findOne').mockResolvedValue(beerType);
    jest.spyOn(repository, 'delete');

    // act
    const { deleted } = await repository.delete(beerType.id);

    // assert
    expect(repository.delete).toBeCalledTimes(1);
    expect(entityRepository.findOne).toBeCalledTimes(1);
    expect(deleted).toBe(true);
  });
});
