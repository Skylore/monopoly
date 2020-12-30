import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Group } from './group.entity';
import { GroupService } from './group.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Group]),
  ],
  controllers: [],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
