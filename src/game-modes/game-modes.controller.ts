import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { CreateGameModeDto } from './dto/create-game-mode.dto'
import { UpdateGameModeDto } from './dto/update-game-mode.dto'
import { GameMode } from './entities/game-mode.entity'
import { GameModesService } from './game-modes.service'

@Controller('gameModes')
export class GameModesController {
  constructor(private readonly gameModesService: GameModesService) {}

  @Post()
  create(
    @Body() createGameModeDto: CreateGameModeDto
  ): Promise<GameMode | undefined> {
    return this.gameModesService.create(createGameModeDto)
  }

  @Get()
  findAll(): Promise<GameMode[] | undefined> {
    return this.gameModesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<GameMode | undefined> {
    return this.gameModesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | undefined> {
    return this.gameModesService.update(id, updateGameModeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.gameModesService.remove(+id)
  }
}
