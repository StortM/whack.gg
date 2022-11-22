import { Module } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { SummonerController } from './summoner.controller'
import { Summoner } from './entities/summoner.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CryptService } from 'src/crypt/crypt.service'

@Module({
  imports: [TypeOrmModule.forFeature([Summoner])],
  controllers: [SummonerController],
  providers: [SummonerService, CryptService],
  exports: [SummonerService]
})
export class SummonerModule {}
