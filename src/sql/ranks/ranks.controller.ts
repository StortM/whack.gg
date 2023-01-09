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
import { RanksService } from './ranks.service'
import { CreateRankDto } from './dto/create-rank.dto'
import { UpdateRankDto } from './dto/update-rank.dto'
import { Rank } from './entities/rank.entity'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('SQL Ranks')
@Controller('sql/ranks')
export class RanksController {
  constructor(private readonly ranksService: RanksService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createRankDto: CreateRankDto): Promise<Rank | undefined> {
    return this.ranksService.create(createRankDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Rank[] | undefined> {
    return this.ranksService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Rank | undefined> {
    return this.ranksService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRankDto: UpdateRankDto
  ): Promise<Rank | undefined> {
    return this.ranksService.update(id, updateRankDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.ranksService.remove(+id)
  }
}
