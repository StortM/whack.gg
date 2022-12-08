import { Module } from '@nestjs/common'
import { GameModesService } from './game-modes.service'
import { GameModesController } from './game-modes.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GameMode } from './entities/game-mode.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GameMode])],

  controllers: [GameModesController],
  providers: [GameModesService],
  exports: [GameModesService]
})
export class GameModesModule {}
