import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBeerTypeDto } from './dto/create-beer-type.dto';
import { UpdateBeerTypeDto } from './dto/update-beer-type.dto';
import { BeerTypeRepository } from './repositories/beer-type.repository';
import { PlaylistService } from '@modules/playlists/playlist.service';
import { errorMessages } from '@commons/constants/errors';

@Injectable()
export class BeerTypesService {
  constructor(
    private readonly beerTypeRepository: BeerTypeRepository,
    private readonly playlistService: PlaylistService,
  ) {}

  async create(createBeerTypeDto: CreateBeerTypeDto) {
    return await this.beerTypeRepository.create(createBeerTypeDto);
  }

  findAll() {
    return this.beerTypeRepository.findAll();
  }

  findOne(id: string) {
    return this.beerTypeRepository.findById(id);
  }

  async findBestByTemperature(temperature: number) {
    const bestByTemperature =
      await this.beerTypeRepository.findBestByTemperature(temperature);

    const playlist = await this.playlistService.findPlaylistByName({
      name: bestByTemperature.type,
    });

    if (!playlist) throw new NotFoundException(errorMessages.beerType.notFound);

    return {
      beerStyle: bestByTemperature.type,
      playlist,
    };
  }

  update(updateBeerTypeDto: UpdateBeerTypeDto) {
    return this.beerTypeRepository.update(updateBeerTypeDto);
  }

  remove(id: string) {
    return this.beerTypeRepository.delete(id);
  }
}
