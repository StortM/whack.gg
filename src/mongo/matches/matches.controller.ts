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
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { MatchesService } from './matches.service'
import { Match } from './schema/matches.schema'

import { ApiTags } from '@nestjs/swagger/dist'
import { AdminGuard } from './../auth/admin.guard'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'

@ApiTags('MongoDB Matches')
@Controller('mongo/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
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

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdateMatchDto
  ): Promise<Match | null> {
    return this.matchesService.update(id, updatePositionDto)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(id)
  }
}
