import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { GameModesController } from './game-modes.controller'
import { GameModesService } from './game-modes.service'
import { GameMode, GameModeSchema } from './schemas/game-modes.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: GameMode.name, schema: GameModeSchema }])
  ],
  controllers: [GameModesController],
  providers: [GameModesService]
})
export class GameModesModule {}
