import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { MatchesService } from './matches.service'
import { CreateMatchDto } from './dto/create-match.dto'
import { UpdateMatchDto } from './dto/update-match.dto'
import { Match } from './entities/match.entity'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { ApiTags } from '@nestjs/swagger/dist'

@ApiTags('SQL Matches')
@Controller('sql/matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body(new ValidationPipe()) createMatchDto: CreateMatchDto
  ): Promise<Match | undefined> {
    return this.matchesService.create(createMatchDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Match[] | undefined> {
    return this.matchesService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Match | undefined> {
    return this.matchesService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/teams/:id')
  findMatchWithTeams(@Param('id') id: string): Promise<Match | undefined> {
    return this.matchesService.findMatchWithTeams(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatchDto: UpdateMatchDto
  ): Promise<Match | undefined> {
    return this.matchesService.update(id, updateMatchDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.matchesService.remove(+id)
  }
}
