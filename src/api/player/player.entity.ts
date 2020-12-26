import {
  Column, CreateDateColumn, Entity, OneToMany,
  PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import {
  IsBoolean, IsInt, IsString,
  MaxLength,
} from 'class-validator';
import { Binding } from '../binding/binding.entity';

@Entity('Player')
export class Player {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  @MaxLength(255)
  @IsString()
  nick: string;

  @Column('int')
  @IsInt()
  position: number;

  @OneToMany(() => Binding, (binding) => binding.player)
  bindings: Binding[];

  // TODO: add user binding
  // user

  @Column('boolean')
  @IsBoolean()
  isParked: boolean;

  @Column('boolean')
  @IsBoolean()
  isPrisoned: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
