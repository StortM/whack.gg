import { Module } from '@nestjs/common'
import { GameModesService } from './game-modes.service'
import { GameModesController } from './game-modes.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameMode } from './entities/game-mode.entity'
import { Match } from '../matches/entities/match.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GameMode, Match])],
  controllers: [GameModesController],
  providers: [GameModesService],
  exports: [GameModesService]
})
export class GameModesModule {}
