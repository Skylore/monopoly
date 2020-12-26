import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './group.entity';

@Injectable()
export class GroupService extends TypeOrmCrudService<Group> {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(
  @InjectRepository(Group) repository: Repository<Group>,
  ) {
    super(repository);
  }
}
