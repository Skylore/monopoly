import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from './card.entity';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { Chaining } from '../chaining/chaining.entity';
import { ChainingModule } from '../chaining/chaining.module';
import { PlayerModule } from '../player/player.module';
import { Player } from '../player/player.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Card, Chaining, Player]),
    forwardRef(() => PlayerModule),
    ChainingModule,
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService],
})
export class CardModule {}
