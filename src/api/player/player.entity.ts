import {
  Column, CreateDateColumn, Entity, ManyToOne, OneToMany,
  OneToOne, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean, IsInt, IsString,
  MaxLength,
} from 'class-validator';
import { Binding } from '../binding/binding.entity';
import { User } from '../user/user.entity';
import { Session } from '../session/session.entity';
import { Card } from '../card/card.entity';

@Entity('Player')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @MaxLength(255)
  @IsString()
  nick: string;

  @Column('int', { default: 0 })
  @IsInt()
  position: number;

  @OneToMany(() => Binding, (binding) => binding.player)
  bindings: Binding[];

  @Column('int')
  @IsInt()
  userId: number;

  @OneToOne(() => User)
  user: User;

  @Column('int')
  @IsInt()
  sessionId: number;

  @ManyToOne(() => Session, (session) => session.players)
  session: Session;

  @OneToMany(() => Card, (card) => card.player)
  cards: Card[];

  @Column('boolean', { default: false })
  @IsBoolean()
  isParked: boolean;

  @Column('boolean', { default: false })
  @IsBoolean()
  isPrisoned: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
