import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MaxLength } from 'class-validator';

@Entity('Player')
export class PlayerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @MaxLength(255)
  nick: string;

  @Column('int')
  position: number;

  // cards

  // user

  @Column('boolean')
  isParked: boolean;

  @Column('boolean')
  isPrisoned: boolean;
}
