import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Player } from './player.entity';

@Injectable()
export class PlayerService extends TypeOrmCrudService<Player> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
  @InjectRepository(Player) repository: Repository<Player>,
  ) {
    super(repository);
  }
}
