import { Module } from '@nestjs/common'
import { RiotService } from './riot.service'
import { RiotController } from './riot.controller'
import { ConfigService } from '@nestjs/config'
import { SummonerModule } from '../summoners/summoner.module'

@Module({
  imports: [SummonerModule],
  controllers: [RiotController],
  providers: [RiotService, ConfigService]
})
export class RiotModule {}
