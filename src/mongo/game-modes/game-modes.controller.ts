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
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
// import { AdminGuard } from 'src/auth/admin.guard'

@Controller('mongo-game-modes')
export class GameModesController {
  constructor(private readonly gameModesService: GameModesService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createGameModeDto: CreateGameModeDto
  ): Promise<GameMode | undefined> {
    return this.gameModesService.create(createGameModeDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<GameMode[] | undefined> {
    return this.gameModesService.findAll()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<GameMode | null> {
    return this.gameModesService.findOne(id)
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGameModeDto: UpdateGameModeDto
  ): Promise<GameMode | null> {
    return this.gameModesService.update(id, updateGameModeDto)
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.gameModesService.remove(id)
  }
}
