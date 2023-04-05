import { IsNotEmpty } from 'class-validator';

export class FindPlaylistByNameDto {
  /**
   * Nome que contenha na playlist
   * @example "IPA"
   */
  @IsNotEmpty()
  name: string;
}
