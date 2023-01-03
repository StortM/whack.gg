import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateSummonerDto } from './dto/create-sumoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  SummonerNode,
  SummonerOmittingPasswordHash
} from './entities/summoner.entity'
import { SummonerService } from './summoner.service'

@ApiTags('Graph Summoners')
@Controller('graph/summoners')
export class SummonerController {
  constructor(private readonly summonerService: SummonerService) {}

  // endoint is open but only admins can create admin users
  // TODO: Limit admin creation to only admins
  @Post()
  async create(
    @Body() createSummonerDto: CreateSummonerDto
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.summonerService.create(createSummonerDto)

    return summoner.toJson()
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSummonerDto: UpdateSummonerDto
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.summonerService.update(+id, updateSummonerDto)

    if (!summoner) throw new NotFoundException()

    return summoner.toJson()
  }

  // create get endpoint for summoner
  @Get()
  async findAll(): Promise<SummonerOmittingPasswordHash[]> {
    const summoners = await this.summonerService.findAll()

    return summoners.map((summoner: SummonerNode) => summoner.toJson())
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.summonerService.findOne(+id)

    return summoner.toJson()
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    this.summonerService.remove(+id)
  }
}
