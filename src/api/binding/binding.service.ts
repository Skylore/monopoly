import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Binding } from './binding.entity';

@Injectable()
export class BindingService extends TypeOrmCrudService<Binding> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
  @InjectRepository(Binding) repository: Repository<Binding>,
  ) {
    super(repository);
  }
}
