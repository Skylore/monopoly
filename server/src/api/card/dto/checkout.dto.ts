import { IsNumber } from 'class-validator';
import { Player } from '../../player/player.entity';

export class CheckoutDto {
  @IsNumber()
  position: number;

  player: Player;
}
