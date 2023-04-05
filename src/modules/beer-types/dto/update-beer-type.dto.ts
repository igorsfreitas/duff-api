import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateBeerTypeDto } from './create-beer-type.dto';

export class UpdateBeerTypeDto extends PartialType(CreateBeerTypeDto) {
  /**
   * Identificação unica do Beer Type
   * @example "72ffb159-248e-4838-a07a-43a93634cd78"
   */
  @IsNotEmpty()
  @IsNumber()
  id: string;
}
