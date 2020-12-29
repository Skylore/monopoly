import {
  Column, CreateDateColumn, Entity,
  Index, OneToMany, OneToOne, PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsBoolean, IsNumber } from 'class-validator';
import { User } from '../user/user.entity';
import { Player } from '../player/player.entity';
import { Card } from '../card/card.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('unique_external_id', { unique: true })
  @Column('varchar', { length: 6 })
  pid: string;

  @Column('varchar', { length: 30 })
  name: string;

  @IsNumber()
  hostId: number;

  @OneToOne(() => User)
  host: User;

  @Column({ width: 1, default: false })
  @IsBoolean()
  isActive: boolean;

  @OneToMany(() => Player, (player) => player.session, { onDelete: 'CASCADE', nullable: true })
  players: Player[];

  @OneToMany(() => Card, (card) => card.session)
  cards: Card[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
