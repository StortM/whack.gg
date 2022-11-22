import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { SummonerService } from './summoner.service'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from './entities/summoner.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'

@Controller('summoner')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  @Post()
  create(
    @Body(new ValidationPipe()) createSummonerDto: CreateSummonerDto
  ): Promise<Summoner | undefined> {
    return this.summonerService.create(createSummonerDto)
  }

  @Get()
  findAll(): Promise<Summoner[] | undefined> {
    return this.summonerService.findAll()
  }

  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const summoner = await this.summonerService.findOne(id)

    if (!summoner) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    return summoner
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateSummonerDto: UpdateSummonerDto
  ): Promise<Summoner | undefined> {
    //TODO - Check if the summoner is the same as the one in the JWT or user is admin. Else throw 403.
    return this.summonerService.update(id, updateSummonerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    //TODO - Check if the summoner is the same as the one in the JWT or user is admin. Else throw 403.
    return this.summonerService.remove(+id)
  }
}
