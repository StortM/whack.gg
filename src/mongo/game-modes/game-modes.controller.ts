import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common'
import { GameModesService } from './game-modes.service'
import { CreateGameModeDto } from './dto/create-game-mode.dto'
import { UpdateGameModeDto } from './dto/update-game-mode.dto'
import { GameMode } from './schemas/game-modes.schema'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { AdminGuard } from './../auth/admin.guard'
import { ApiTags } from '@nestjs/swagger/dist'

@ApiTags('MongoDB Game Modes')
@Controller('mongo/game-modes')
export class GameModesController {
  constructor(private readonly gameModesService: GameModesService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createGameModeDto: CreateGameModeDto
  ): Promise<GameMode | undefined> {
    return this.gameModesService.create(createGameModeDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<GameMode[] | undefined> {
    return this.gameModesService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GameMode | null> {
    return this.gameModesService.findOne(id)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | null> {
    return this.gameModesService.update(id, updateGameModeDto)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.gameModesService.remove(id)
  }
}
