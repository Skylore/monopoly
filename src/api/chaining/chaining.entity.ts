import {
  Column, CreateDateColumn, Entity, JoinColumn, ManyToOne,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Card } from '../card/card.entity';
import { Group } from '../group/group.entity';

@Entity('Chaining')
export class Chaining {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  @IsInt()
  cardId: number;

  @ManyToOne(() => Card, (card) => card.chaining, { eager: true })
  @JoinColumn()
  card: Card;

  @Column('int')
  @IsInt()
  groupId: number;

  @ManyToOne(() => Group, (group) => group.chainings, { eager: true })
  @JoinColumn()
  group: Group;

  @Column('int', { default: 10 })
  sort: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
