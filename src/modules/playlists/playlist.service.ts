import { Inject, Injectable } from '@nestjs/common';
import { FindPlaylistByNameDto } from './dtos/find-playlist-by-name.dto';
import { ISpotify } from './provider/spotify/ISpotify.interface';

@Injectable()
export class PlaylistService {
  constructor(
    @Inject('SpotifyApiService') private readonly spotifyService: ISpotify,
  ) {}

  async findPlaylistByName({ name }: FindPlaylistByNameDto): Promise<any> {
    return this.spotifyService.findPlaylistsByName({ name });
  }
}
