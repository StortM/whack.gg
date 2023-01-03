import { Body, Controller, NotFoundException, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'
import { SummonerOmittingPasswordHash } from '../summoners/entities/summoner.entity'
import { FetchSummonerDto } from './dto/fetch-summoner.dto'
import { RiotService } from './riot.service'

@ApiTags('SQL Riot')
@Controller('/sql/riot')
export class RiotController {
  constructor(private readonly riotService: RiotService) {}

  @Post()
  async fetchSummoner(
    @Body() fetchSummonerDto: FetchSummonerDto
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.riotService.createSummonerFromName(
      fetchSummonerDto
    )

    if (!summoner) throw new NotFoundException()

    return summoner
  }
}
