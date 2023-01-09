import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { CreateGameModeDto } from './dto/create-game-mode.dto'
import { UpdateGameModeDto } from './dto/update-game-mode.dto'
import { GameMode } from './entities/game-mode.entity'
import { GameModesService } from './game-modes.service'

@ApiTags('SQL Game Modes')
@Controller('gameModes')
export class GameModesController {
  constructor(private readonly gameModesService: GameModesService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
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
  findOne(@Param('id') id: number): Promise<GameMode | undefined> {
    return this.gameModesService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | undefined> {
    return this.gameModesService.update(id, updateGameModeDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.gameModesService.remove(+id)
  }
}
