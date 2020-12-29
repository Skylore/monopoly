import { BadRequestException, Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';
import { CardService } from '../card/card.service';

@Injectable()
export class PlayerService extends TypeOrmCrudService<Player> {
  private static diceMin = 2;

  private static diceMax = 12;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(Player) private repository: Repository<Player>,
    private readonly cardService: CardService,
  ) {
    super(repository);
  }

  async save(player: Player): Promise<Player> {
    return this.repository.save(player);
  }

  async move(playerId: number): Promise<void> {
    const player = await this.findOne({ id: playerId });

    if (player.isParked) {
      throw new BadRequestException('Player is parked');
    }

    if (player.isPrisoned) {
      throw new BadRequestException('Player is prisoned');
    }

    const diceRoll = Math.random()
      * (PlayerService.diceMax - PlayerService.diceMin) + PlayerService.diceMin;

    const move = player.position + diceRoll >= 40
      ? player.position + diceRoll - 40
      : player.position + diceRoll;

    await this.cardService.checkout({
      position: move,
      player,
    });
  }

  async passMoney(ownerId: number, recipientId: number, sum: number): Promise<void> {
    const owner = await this.findOne({ id: ownerId });
    const recipient = await this.findOne({ id: recipientId });

    if (owner.cash < sum) {
      throw new BadRequestException('Not enough money');
    }

    await this.repository.save({ ...owner, cash: owner.cash - sum });
    await this.repository.save({ ...recipient, cash: recipient.cash + sum });
  }
}
