import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import { Summoner } from './entities/summoner.entity'

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Post()
  create(
    @Body() createSummonerDto: CreateSummonerDto
  ): Promise<Summoner | undefined> {
    return this.summonerService.create(createSummonerDto)
  }

  @Get()
  findAll(): Promise<Summoner[] | undefined> {
    return this.summonerService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Summoner | undefined> {
    return this.summonerService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSummonerDto: UpdateSummonerDto
  ): Promise<Summoner | undefined> {
    return this.summonerService.update(id, updateSummonerDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.summonerService.remove(+id)
  }
}
