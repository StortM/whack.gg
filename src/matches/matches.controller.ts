import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { MatchesService } from './matches.service'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { Match } from './entities/match.entity'

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @Post()
  create(@Body() createMatchDto: CreateMatchDto): Promise<Match | undefined> {
    return this.matchesService.create(createMatchDto)
  }

  @Get()
  findAll(): Promise<Match[] | undefined> {
    return this.matchesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Match | undefined> {
    return this.matchesService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto
  ): Promise<Match | undefined> {
    return this.matchesService.update(id, updateMatchDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(+id)
  }
}
