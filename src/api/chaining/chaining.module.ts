import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chaining } from './chaining.entity';
import { ChainingService } from './chaining.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chaining]),
  ],
  controllers: [],
  providers: [ChainingService],
  exports: [ChainingService],
})
export class ChainingModule {}
