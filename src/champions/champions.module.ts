import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ChampionsController } from './champions.controller'
import { ChampionsService } from './champions.service'
import { Champion } from './entities/champion.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Champion])],

  controllers: [ChampionsController],
  providers: [ChampionsService],
  exports: [ChampionsService]
})
export class ChampionsModule {}
