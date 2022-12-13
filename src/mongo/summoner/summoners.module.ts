import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'
import { SummonerSchema } from './schemas/summoners.schema'
import { SummonerController } from './summoners.controller'
import { SummonersService } from './summoners.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Summoner.name, schema: SummonerSchema }])
  ],
  controllers: [SummonerController],
  providers: [SummonersService]
})
export class SummonerModule {}
