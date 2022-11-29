import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChampionsController } from './champions.controller'
import { ChampionService } from './champions.service'
import { Champion } from './entities/champion.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Champion])],
  controllers: [ChampionsController],
  providers: [ChampionService],
  exports: [ChampionService]
})
export class ChampionsModule {}
