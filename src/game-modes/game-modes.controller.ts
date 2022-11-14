import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { GameModesService } from './game-modes.service'
import { CreateGameModeDto } from './dto/create-game-mode.dto'
import { UpdateGameModeDto } from './dto/update-game-mode.dto'
import { GameMode } from './entities/game-mode.entity'

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
  findOne(@Param('id') id: string): Promise<GameMode | undefined> {
    return this.gameModesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | undefined> {
    return this.gameModesService.update(id, updateGameModeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.gameModesService.remove(+id)
  }
}
