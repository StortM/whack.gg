import { Module } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { SummonerController } from './summoner.controller'

@Module({
  controllers: [SummonerController],
  providers: [SummonerService],
  exports: [SummonerService]
})
export class SummonerModule {}
