import {
  BadRequestException, forwardRef, Inject, Injectable,
} from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';
import { CheckoutDto } from './dto/checkout.dto';
import { Chaining } from '../chaining/chaining.entity';
import { GroupTypeEnum } from '../group/enums/group-type.enum';
import { Player } from '../player/player.entity';
import { CardStatusEnum } from './enums/card-status.enum';
import { PlayerService } from '../player/player.service';
import { BuyDto } from './dto/buy.dto';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
    @InjectRepository(Card) private readonly repository: Repository<Card>,
    @InjectRepository(Chaining) private readonly chainingRepository: Repository<Chaining>,
    @InjectRepository(Player) private readonly playerRepository: Repository<Player>,
    @Inject(forwardRef(() => PlayerService))
    private playerService: PlayerService,
  ) {
    super(repository);
  }

  async buy(buy: BuyDto, playerJwt: { id: number, sessionId: number }): Promise<Card> {
    const { cardId } = buy;

    const player = await this.playerService.findOne({ id: playerJwt.id });
    const card = await this.findOne({ id: cardId, sessionId: playerJwt.sessionId });

    if (!card) {
      throw new BadRequestException('Card is not available');
    }

    if (player.position !== card.position) {
      throw new BadRequestException('Player is not staying in the card');
    }

    if (card.status !== 'active') {
      throw new BadRequestException(`Card is ${card.status}`);
    }

    if (player.cash < card.rawPrice) {
      throw new BadRequestException('Player hasn\'t enough money');
    }

    await this.playerRepository.save({
      ...player,
      cash: player.cash - card.rawPrice,
    });

    return this.repository.save({
      ...card,
      sessionId: null,
      playerId: player.id,
      status: CardStatusEnum.SOLD,
    });
  }

  async checkout(checkout: CheckoutDto): Promise<void> {
    const { position, player } = checkout;

    console.log(position);

    const card = await this.findOne(
      { position: 1 },
      { relations: ['chaining'] },
    );

    const { group } = card.chaining;

    // eslint-disable-next-line default-case
    switch (group.type) {
      case GroupTypeEnum.CHANCE:
        // perform action in card.chanceAction
        break;
      case GroupTypeEnum.COLLECTION:
        // could buy
        break;
      case GroupTypeEnum.DICE_ROLL:
        // could buy if card.playerId !== player.id -> player.id pass monet to card.playerId
        break;
      case GroupTypeEnum.GAME:
        // look for status and pass money relates to housePrice ...
        await this.gameCardHandler(card, player);
        break;
      case GroupTypeEnum.PARKING:
        // could park --> player.isParked = true
        break;
      case GroupTypeEnum.PRISON:
        // player.isPrisoned = true
        break;
      case GroupTypeEnum.START:
        // player.cash += 200
        break;
      case GroupTypeEnum.TO_PRISON:
        // player.isPrisoned = true
        break;
    }
  }

  async gameCardHandler(card: Card, player: Player): Promise<void> {
    const isOwner = CardService.isOwner(card, player);

    let fee = 0;

    if (!isOwner) {
      // eslint-disable-next-line default-case
      switch (card.status) {
        case CardStatusEnum.ACTIVE:
        case CardStatusEnum.DEPOSIT:
          fee = 0;
          break;
        case CardStatusEnum.SOLD:
          fee = card.rawFee;
          break;
        case CardStatusEnum.ONE_BUILDING:
          fee = card.oneHouseFee;
          break;
        case CardStatusEnum.TWO_BUILDINGS:
          fee = card.twoHouseFee;
          break;
        case CardStatusEnum.THREE_BUILDING:
          fee = card.threeHouseFee;
          break;
        case CardStatusEnum.FOUR_BUILDINGS:
          fee = card.fourHouseFee;
          break;
        case CardStatusEnum.SKYSCRAPER:
          fee = card.skyscraperFee;
          break;
      }
    }

    if (fee) {
      await this.playerService.passMoney(player.id, card.playerId, fee);
    }
  }

  private static isOwner(card: Card, player: Player): boolean {
    return card.playerId === player.id;
  }
}
