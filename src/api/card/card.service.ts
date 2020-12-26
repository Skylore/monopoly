import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from './card.entity';

@Injectable()
export class CardService extends TypeOrmCrudService<Card> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
  @InjectRepository(Card) repository: Repository<Card>,
  ) {
    super(repository);
  }
}
