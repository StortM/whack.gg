import { Module } from '@nestjs/common'
import { DivisionsService } from './divisions.service'
import { DivisionsController } from './divisions.controller'
import { Division } from './entities/division.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Division])],
  controllers: [DivisionsController],
  providers: [DivisionsService],
  exports: [DivisionsService]
})
export class DivisionsModule {}
