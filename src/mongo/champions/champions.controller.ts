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
import { ChampionsService } from './champions.service'
import { CreateChampionDto } from './dto/create-champion.dto'
import { UpdateChampionDto } from './dto/update-champion.dto'
import { Champion } from './schemas/champions.schema'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { AdminGuard } from './../auth/admin.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('MongoDB Champions')
@Controller('mongo/champions')
export class ChampionsController {
  constructor(private readonly championsService: ChampionsService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Champion | null> {
    return this.championsService.findOne(id)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateChampionDto: UpdateChampionDto
  ): Promise<Champion | null> {
    return this.championsService.update(id, updateChampionDto)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.championsService.remove(id)
  }
}
