import { IsNumber } from 'class-validator';

export class BuyDto {
  @IsNumber()
  cardId: number;
}
