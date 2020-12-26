import {
  Column, CreateDateColumn, Entity,
  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Binding } from '../binding/binding.entity';
import { CardStatusEnum } from './enums/card-status.enum';
import { ChanceActionsEnum } from './enums/chance-actions.enum';

@Entity('Card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  @IsInt()
  position: number;

  @Column('int')
  @IsInt()
  rawPrice: number;

  @Column('int')
  @IsInt()
  deposit: number;

  @Column('int')
  @IsInt()
  housePrice: number;

  @Column('int')
  @IsInt()
  skyscraperPrice: number;

  @Column('int')
  @IsInt()
  rawFee: number;

  @Column('int')
  @IsInt()
  oneHouseFee: number;

  @Column('int')
  @IsInt()
  twoHouseFee: number;

  @Column('int')
  @IsInt()
  threeHouseFee: number;

  @Column('int')
  @IsInt()
  fourHouseFee: number;

  @Column('int')
  @IsInt()
  skyscraperFee: number;

  @OneToOne(() => Binding)
  binding: Binding;

  @Column({
    type: 'enum',
    enum: CardStatusEnum,
    default: CardStatusEnum.ACTIVE,
  })
  status: CardStatusEnum;

  @Column({
    type: 'enum',
    enum: ChanceActionsEnum,
    nullable: true,
  })
  chanceAction: ChanceActionsEnum;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
