import {
  Column, CreateDateColumn, Entity,
  OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,
} from 'typeorm';
import { IsString, MaxLength } from 'class-validator';
import { Chaining } from '../chaining/chaining.entity';
import { GroupTypeEnum } from './enums/group-type.enum';

@Entity('Group')
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: GroupTypeEnum,
    default: GroupTypeEnum.GAME,
  })
  type: GroupTypeEnum;

  @Column('varchar')
  @MaxLength(255)
  @IsString()
  color: string;

  @OneToMany(() => Chaining, (chaining) => chaining.group)
  chainings: Chaining[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
