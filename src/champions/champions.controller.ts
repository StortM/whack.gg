import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { ChampionService } from './champions.service'
import { CreateChampionDto } from './dto/create-champion.dto'
import { UpdateChampionDto } from './dto/update-champion.dto'
import { Champion } from './entities/champion.entity'

@Controller('champions')
export class ChampionsController {
  constructor(private readonly championService: ChampionService) {}

  @Post()
  create(
    @Body() createMasteryDto: CreateChampionDto
  ): Promise<Champion | undefined> {
    return this.championService.create(createMasteryDto)
  }

  @Get()
  findAll(): Promise<Champion[] | undefined> {
    return this.championService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Champion | undefined> {
    return this.championService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMasteryDto: UpdateChampionDto
  ): Promise<Champion | undefined> {
    return this.championService.update(+id, updateMasteryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.championService.remove(+id)
  }
}
