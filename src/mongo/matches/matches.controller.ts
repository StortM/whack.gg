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
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { MatchesService } from './matches.service'
import { Match } from './schema/matches.schema'

import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { AdminGuard } from './../auth/admin.guard'
import { ApiTags } from '@nestjs/swagger/dist'

@ApiTags('MongoDB Matches')
@Controller('mongo-matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createPositionDto: CreateMatchDto
  ): Promise<Match | undefined> {
    return this.matchesService.create(createPositionDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Match[] | undefined> {
    return this.matchesService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Match | null> {
    return this.matchesService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdateMatchDto
  ): Promise<Match | null> {
    return this.matchesService.update(id, updatePositionDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(id)
  }
}
