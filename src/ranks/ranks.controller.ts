import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { RanksService } from './ranks.service'
import { CreateRankDto } from './dto/create-rank.dto'
import { UpdateRankDto } from './dto/update-rank.dto'
import { Rank } from './entities/rank.entity'

@Controller('ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @Post()
  create(@Body() createRankDto: CreateRankDto): Promise<Rank | undefined> {
    return this.ranksService.create(createRankDto)
  }

  @Get()
  findAll(): Promise<Rank[] | undefined> {
    return this.ranksService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Rank | undefined> {
    return this.ranksService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRankDto: UpdateRankDto
  ): Promise<Rank | undefined> {
    return this.ranksService.update(id, updateRankDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.ranksService.remove(+id)
  }
}
