import { Body, Controller, NotFoundException, Post } from '@nestjs/common'
import { SummonerOmittingPasswordHash } from '../summoners/entities/summoner.entity'
import { FetchSummonerDto } from './dto/fetch-summoner.dto'
import { RiotService } from './riot.service'

@Controller('riot')
export class RiotController {
  constructor(private readonly riotService: RiotService) {}

  @Post('')
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
