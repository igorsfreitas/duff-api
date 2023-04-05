export interface ISpotify {
  findPlaylistsByName(
    findPlaylistByNameDto: FindPlaylistByNameProps,
  ): Promise<unknown>;
}

export type FindPlaylistByNameProps = {
  name: string;
};

export type GetSpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
