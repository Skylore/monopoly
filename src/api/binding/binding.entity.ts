import {
  Column, CreateDateColumn, Entity,
  ManyToOne, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Card } from '../card/card.entity';
import { Player } from '../player/player.entity';

@Entity('Binding')
export class Binding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  @IsInt()
  playerId: number;

  @ManyToOne(() => Player, (player) => player.bindings)
  player: Player;

  @Column('int')
  @IsInt()
  cardId: number;

  @OneToOne(() => Card, (card) => card.binding)
  card: Card;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
