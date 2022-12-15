import { forwardRef, Module } from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { SummonerController } from './summoner.controller'
import { Summoner } from './entities/summoner.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CryptService } from 'src/crypt/crypt.service'
import { RegionsModule } from 'src/sql/regions/regions.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Summoner]),
    RegionsModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [SummonerController],
  providers: [SummonerService, CryptService],
  exports: [SummonerService]
})
export class SummonerModule {}
