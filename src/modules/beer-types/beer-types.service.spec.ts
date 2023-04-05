import {
  MockRepository,
  repositoryMockFactory,
} from '@tests/mocks/repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BeerTypesService } from './beer-types.service';
import { BeerTypeRepository } from './repositories/beer-type.repository';
import { BeerType } from './entities/beer-type.entity';
import { CreateBeerTypeDto } from './dto/create-beer-type.dto';
import { UpdateBeerTypeDto } from './dto/update-beer-type.dto';
import { PlaylistService } from '../playlists/playlist.service';
import { NotFoundException } from '@nestjs/common';
import { errorMessages } from '@commons/constants/errors';

jest.mock('../playlists/playlist.service');
describe('BeerTypesService', () => {
  let service: BeerTypesService;
  let playlistService: PlaylistService;
  let repository: BeerTypeRepository;
  let entityRepository: MockRepository<BeerType>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BeerTypesService,
        BeerTypeRepository,
        PlaylistService,
        {
          provide: getRepositoryToken(BeerType),
          useValue: repositoryMockFactory(),
        },
      ],
    }).compile();

    service = module.get<BeerTypesService>(BeerTypesService);
    playlistService = module.get<PlaylistService>(PlaylistService);
    repository = module.get<BeerTypeRepository>(BeerTypeRepository);
    entityRepository = module.get<MockRepository<BeerType>>(
      getRepositoryToken(BeerType),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(entityRepository).toBeDefined();
  });

  it('should save a new beer type', async () => {
    //Arrange
    const beerTypeDto: CreateBeerTypeDto = {
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    jest.spyOn(repository, 'create');
    jest.spyOn(service, 'create');

    // act
    await service.create(beerTypeDto);

    // assert
    expect(repository.create).toBeCalledTimes(1);
    expect(service.create).toBeCalledTimes(1);
    expect(service.create).toBeCalledWith(beerTypeDto);
  });

  it('should find all beer types', async () => {
    //Arrange
    jest.spyOn(repository, 'findAll').mockResolvedValue({
      data: [new BeerType()],
      count: 1,
    });
    jest.spyOn(service, 'findAll');

    // act
    await service.findAll();

    // assert
    expect(repository.findAll).toBeCalledTimes(1);
    expect(repository.findAll).toBeCalledWith();
    expect(service.findAll).toBeCalledWith();
  });

  it('should find beer type by id', async () => {
    //Arrange
    const id = '1';
    jest.spyOn(repository, 'findById').mockResolvedValue(new BeerType());
    jest.spyOn(service, 'findOne');

    // act
    await service.findOne(id);

    // assert
    expect(repository.findById).toBeCalledTimes(1);
    expect(repository.findById).toBeCalledWith(id);
    expect(service.findOne).toBeCalledWith(id);
  });

  it('should throw error if not playlist found find best beer type by temperature', async () => {
    //Arrange
    const temperature = 2;
    jest
      .spyOn(repository, 'findBestByTemperature')
      .mockResolvedValue(new BeerType());
    jest.spyOn(service, 'findBestByTemperature');

    // act
    await expect(service.findBestByTemperature(temperature)).rejects.toThrow(
      new NotFoundException(errorMessages.beerType.notFound),
    );

    // assert
    expect(repository.findBestByTemperature).toBeCalledTimes(1);
    expect(repository.findBestByTemperature).toBeCalledWith(temperature);
  });
  it('should find best beer type by temperature', async () => {
    //Arrange
    const temperature = 2;
    jest
      .spyOn(repository, 'findBestByTemperature')
      .mockResolvedValue(new BeerType());
    jest.spyOn(service, 'findBestByTemperature');
    jest.spyOn(playlistService, 'findPlaylistByName').mockResolvedValue({
      name: 'This Is [dunkelbunt]',
      tracks: [
        {
          name: 'Cinnamon Girl - Radio Edit',
          artist: '[dunkelbunt]',
          url: 'https://open.spotify.com/track/53GzKd394URyonJR4CPzyC',
        },
      ],
    });

    // act
    await service.findBestByTemperature(temperature);

    // assert
    expect(repository.findBestByTemperature).toBeCalledTimes(1);
    expect(repository.findBestByTemperature).toBeCalledWith(temperature);
    expect(service.findBestByTemperature).toBeCalledWith(temperature);
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
    jest.spyOn(repository, 'update');
    jest.spyOn(service, 'update');
    jest
      .spyOn(entityRepository, 'save')
      .mockResolvedValue({ ...beerType, ...beerTypePayload });

    // act
    const updated = await service.update(beerTypePayload);

    // assert
    expect(service.update).toBeCalledTimes(1);
    expect(repository.update).toBeCalledTimes(1);
    expect(entityRepository.save).toBeCalledTimes(1);
    expect(updated).toMatchObject({ ...beerType, ...beerTypePayload });
  });

  it('should delete a beer type', async () => {
    //Arrange
    const beerType: Partial<BeerType> = {
      id: '1',
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    jest.spyOn(entityRepository, 'findOne').mockResolvedValue(beerType);
    jest.spyOn(repository, 'delete');
    jest.spyOn(service, 'remove');

    // act
    const { deleted } = await service.remove(beerType.id);

    // assert
    expect(repository.delete).toBeCalledTimes(1);
    expect(service.remove).toBeCalledTimes(1);
    expect(deleted).toBe(true);
  });
});
