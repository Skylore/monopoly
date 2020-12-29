import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Binding } from './binding.entity';
import { BindingService } from './binding.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Binding]),
  ],
  controllers: [],
  providers: [BindingService],
  exports: [BindingService],
})
export class BindingModule {}
