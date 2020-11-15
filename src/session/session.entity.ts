import {
  Column, Entity, Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsBoolean } from 'class-validator';

@Entity()
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('unique_external_id', { unique: true })
  @Column('varchar', { length: 6 })
  pid: string;

  @Column('varchar', { length: 30 })
  name: string;

  @Column({ width: 1, default: true })
  @IsBoolean()
  isActive: boolean;
}
