import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CryptService } from 'src/crypt/crypt.service'
import { Summoner } from './schemas/summoners.schema'
import { RegionsModule } from '../regions/regions.module'
import { SummonerSchema } from './schemas/summoners.schema'
import { SummonerController } from './summoners.controller'
import { SummonersService } from './summoners.service'
import { AuthModule } from '../auth/auth.module'
import { forwardRef } from '@nestjs/common/utils'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Summoner.name, schema: SummonerSchema }
    ]),
    RegionsModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [SummonerController],
  providers: [SummonersService, CryptService],
  exports: [SummonersService]
})
export class SummonerModule {}
