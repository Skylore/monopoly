import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chaining } from './chaining.entity';

@Injectable()
export class ChainingService extends TypeOrmCrudService<Chaining> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
  @InjectRepository(Chaining) repository: Repository<Chaining>,
  ) {
    super(repository);
  }
}
