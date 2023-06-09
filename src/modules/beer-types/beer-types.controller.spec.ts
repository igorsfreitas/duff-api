import { repositoryMockFactory } from '@tests/mocks/repository.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BeerTypesController } from './beer-types.controller';
import { BeerTypesService } from './beer-types.service';
import { BeerTypeRepository } from './repositories/beer-type.repository';
import { BeerType } from './entities/beer-type.entity';
import { CreateBeerTypeDto } from './dto/create-beer-type.dto';
import { UpdateBeerTypeDto } from './dto/update-beer-type.dto';
import { PlaylistService } from '../playlists/playlist.service';

jest.mock('../playlists/playlist.service');
describe('BeerTypesController', () => {
  let controller: BeerTypesController;
  let service: BeerTypesService;
  let playlistService: PlaylistService;
  let repository: BeerTypeRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeerTypesController],
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

    controller = module.get<BeerTypesController>(BeerTypesController);
    service = module.get<BeerTypesService>(BeerTypesService);
    playlistService = module.get<PlaylistService>(PlaylistService);
    repository = module.get<BeerTypeRepository>(BeerTypeRepository);
  });

  it('should save a new beer type', async () => {
    const beerTypeDto: CreateBeerTypeDto = {
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    jest.spyOn(service, 'create');
    jest.spyOn(controller, 'create');

    // act
    await controller.create(beerTypeDto);

    // assert
    expect(service.create).toBeCalledTimes(1);
    expect(controller.create).toBeCalledTimes(1);
    expect(controller.create).toBeCalledWith(beerTypeDto);
  });

  it('should find beer types', async () => {
    jest.spyOn(repository, 'findAll').mockResolvedValue({
      data: [new BeerType()],
      count: 1,
    });
    jest.spyOn(service, 'findAll');
    jest.spyOn(controller, 'findAll');

    // act
    await controller.findAll();

    // assert
    expect(service.findAll).toBeCalledTimes(1);
    expect(controller.findAll).toBeCalledTimes(1);
  });

  it('should find beer type by id', async () => {
    //Arrange
    const id = '1';
    jest.spyOn(repository, 'findById').mockResolvedValue(new BeerType());
    jest.spyOn(service, 'findOne');
    jest.spyOn(controller, 'findOne');

    // act
    await controller.findOne(id);

    // assert
    expect(service.findOne).toBeCalledWith(id);
    expect(controller.findOne).toBeCalledWith(id);
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
    await controller.getBestBeerTypeByTemperature(temperature);

    // assert
    expect(repository.findBestByTemperature).toBeCalledTimes(1);
    expect(repository.findBestByTemperature).toBeCalledWith(temperature);
    expect(service.findBestByTemperature).toBeCalledWith(temperature);
  });

  it('should update a beer type', async () => {
    //Arrange
    const beerTypePayload: UpdateBeerTypeDto = {
      id: '1',
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(new BeerType());
    jest.spyOn(service, 'update');
    jest.spyOn(controller, 'update');

    // act
    await controller.update(beerTypePayload);

    // assert
    expect(controller.update).toBeCalledTimes(1);
    expect(service.update).toBeCalledTimes(1);
  });

  it('should delete a beer type', async () => {
    //Arrange
    const beerType: Partial<BeerType> = {
      id: '1',
      type: 'Weissbier',
      min_temperature: -1,
      max_temperature: 3,
    };

    jest.spyOn(repository, 'findById').mockResolvedValue(new BeerType());
    jest.spyOn(service, 'remove');
    jest.spyOn(controller, 'remove');

    // act
    await controller.remove(beerType.id);

    // assert
    expect(service.remove).toBeCalledTimes(1);
    expect(controller.remove).toBeCalledTimes(1);
  });
});
