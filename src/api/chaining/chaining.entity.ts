import {
  Column, CreateDateColumn, Entity, OneToMany,
  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
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

  @OneToOne(() => Card, (card) => card.binding)
  card: Card;

  @Column('int')
  @IsInt()
  groupId: number;

  @OneToMany(() => Group, (group) => group.chainings)
  group: Group;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
