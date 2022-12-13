import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Put
} from '@nestjs/common'
import { createSummonerDto } from './dto/create-summoner.dto'
import { SummonersService } from './summoners.service'
import { Summoner } from './schemas/summoners.schema'
import { updateSummonerDto } from './dto/update-summoner.dto'
import { Mastery } from '../masteries/schemas/masteries.schema'

// import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
// import { AdminGuard } from 'src/sql/auth/admin.guard'

@Controller('mongo-summoners')
export class SummonerController {
  constructor(private readonly summonersService: SummonersService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) createSummonerDto: createSummonerDto
  ): Promise<Summoner | null> {
    return this.summonersService.create(createSummonerDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Summoner[] | null> {
    return this.summonersService.findAll()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Summoner | null> {
    return this.summonersService.findOne(id)
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: updateSummonerDto
  ): Promise<Summoner | null> {
    return this.summonersService.update(id, updateRegionDto)
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.summonersService.remove(id)
  }
}
