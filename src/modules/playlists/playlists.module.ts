import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PlaylistService } from './playlist.service';
import { SpotifyApiService } from './provider/spotify/implementation/SpotifyApi';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [
    PlaylistService,
    {
      provide: 'SpotifyApiService',
      useClass: SpotifyApiService,
    },
  ],
  exports: [PlaylistService, 'SpotifyApiService'],
})
export class PlaylistModule {}
