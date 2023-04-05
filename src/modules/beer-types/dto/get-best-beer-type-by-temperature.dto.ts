import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBeerTypeDto {
  /**
   * Temperatura média de armazenamento deste tipo de cerveja
   * @example "4"
   */
  @IsNotEmpty()
  @IsNumber()
  temperature: number;
}
