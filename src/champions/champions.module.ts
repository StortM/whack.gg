import { Module } from '@nestjs/common'
import { ChampionsService } from './champions.service'
import { ChampionsController } from './champions.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Champion } from './entities/champion.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Champion])],

  controllers: [ChampionsController],
  providers: [ChampionsService],
  exports: [ChampionsService]
})
export class ChampionsModule {}
