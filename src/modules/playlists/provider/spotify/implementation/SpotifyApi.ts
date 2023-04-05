import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import {
  ISpotify,
  FindPlaylistByNameProps,
  GetSpotifyTokenResponse,
} from '../ISpotify.interface';

@Injectable()
export class SpotifyApiService implements ISpotify {
  private SPOTIFY_CLIENT_ID: string;
  private SPOTIFY_CLIENT_SECRET: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.SPOTIFY_CLIENT_ID = this.configService.get('SPOTIFY_CLIENT_ID');
    this.SPOTIFY_CLIENT_SECRET = this.configService.get(
      'SPOTIFY_CLIENT_SECRET',
    );
  }

  async getSpotifyToken(): Promise<GetSpotifyTokenResponse> {
    const body = {
      grant_type: 'client_credentials',
      client_id: this.SPOTIFY_CLIENT_ID,
      client_secret: this.SPOTIFY_CLIENT_SECRET,
    };
    const { data } = await lastValueFrom(
      this.http.post(`https://accounts.spotify.com/api/token`, body, {
        headers: {
          'Content-Type': `application/x-www-form-urlencoded`,
        },
      }),
    );

    return data;
  }

  async findPlaylistByUrl(url: string): Promise<any> {
    const { access_token } = await this.getSpotifyToken();
    const { data } = await lastValueFrom(
      this.http.get(url, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }),
    );

    return data;
  }

  async findPlaylistsByName({ name }: FindPlaylistByNameProps): Promise<any> {
    const { access_token } = await this.getSpotifyToken();
    const { data } = await lastValueFrom(
      this.http.get(
        `https://api.spotify.com/v1/search?query=name%3A${name}&type=playlist&locale=pt-BR%2Cpt%3Bq%3D0.9%2Cen-US%3Bq%3D0.8%2Cen%3Bq%3D0.7&offset=0&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),
    );

    const { items } = await this.findPlaylistByUrl(
      data.playlists.items[0].tracks.href,
    );

    const tracks = items.map((item) => ({
      name: item.track.name,
      artist: item.track.artists[0].name,
      url: item.track.external_urls.spotify,
    }));

    const playlist = {
      name: data.playlists.items[0].name,
      tracks,
    };

    return playlist;
  }
}
