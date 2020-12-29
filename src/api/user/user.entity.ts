import {
  Column, Entity, Index, OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsInt, IsOptional } from 'class-validator';
import { Player } from '../player/player.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 64 })
  password: string;

  @Index('unique_email', { unique: true })
  @Column('varchar', { length: 60 })
  email: string;

  @Column('varchar', { length: 30 })
  nick: string;

  @Column('int', { nullable: true })
  @IsInt()
  @IsOptional()
  playerId: number;

  @OneToOne(() => Player)
  player: Player;
}
