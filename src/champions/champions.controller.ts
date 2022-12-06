import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { ChampionsService } from './champions.service'
import { CreateChampionDto } from './dto/create-champion.dto'
import { UpdateChampionDto } from './dto/update-champion.dto'
import { Champion, ChampionBans } from './entities/champion.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { AdminGuard } from 'src/auth/admin.guard'

@Controller('champions')
export class ChampionsController {
  constructor(private readonly championsService: ChampionsService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createChampionDto: CreateChampionDto
  ): Promise<Champion | undefined> {
    return this.championsService.create(createChampionDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Champion[] | undefined> {
    return this.championsService.findAll()
  }

  @Get('championsBans')
  championBanRate(): Promise<ChampionBans[] | undefined> {
    const res = this.championsService.championBans()

    if (!res) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    return res
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Champion | undefined> {
    return this.championsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateChampionDto: UpdateChampionDto
  ): Promise<Champion | undefined> {
    return this.championsService.update(id, updateChampionDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.championsService.remove(+id)
  }
}
