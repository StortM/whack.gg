import { Module } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { SummonerController } from './summoner.controller'
import { Summoner } from './entities/summoner.entity'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([Summoner])],
  controllers: [SummonerController],
  providers: [SummonerService],
  exports: [SummonerService]
})
export class SummonerModule {}
