import { Module } from '@nestjs/common'
import { MasteriesService } from './masteries.service'
import { MasteriesController } from './masteries.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Mastery } from './entities/mastery.entity'

@Module({
  controllers: [MasteriesController],
  providers: [MasteriesService]
})
@Module({
  imports: [TypeOrmModule.forFeature([Mastery])],
  controllers: [MasteriesController],
  providers: [MasteriesService],
  exports: [MasteriesService]
})
export class MasteriesModule {}
