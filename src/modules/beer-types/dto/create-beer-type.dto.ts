import { IsBiggerThan } from '@commons/validators/is-bigger-than.validator';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateBeerTypeDto {
  /**
   * Descrição do tipo de cerveja
   * @example "Weissbier"
   */
  @IsNotEmpty()
  type: string;

  /**
   * Temperatura mínima de armazenamento deste tipo de cerveja
   * @example "4"
   */
  @IsNotEmpty()
  @IsNumber()
  min_temperature: number;

  /**
   * Temperatura máxima de armazenamento deste tipo de cerveja
   * @example "4"
   */
  @IsNotEmpty()
  @IsNumber()
  @IsBiggerThan('min_temperature', {
    message: 'A temperatura máxima deve ser maior que a mínima',
  })
  max_temperature: number;
}
