/* eslint-disable camelcase */
import { SummonerOmittingPasswordHash } from '../summoners/entities/summoner.entity'
import { FetchSummonerDto } from './dto/fetch-summoner.dto'
import { IRiotService } from './riot.service'
import { RiotSummoner } from './riot.types'

export const riotProfileMockData = {
  id: 'HCm0V_hzeDAJ2_hYtoqcnKFxlk0hhf1jgDF1jrna2YuINx8',
  accountId: 'mdCTXBbM_xCZcSyYUYpc_LT2--KI0fEPakLdbwsWqbZwVQ',
  puuid:
    'VRW5IG4AowuCw5_1P3PoewL6SXG8H3ta05-jS-H7qvWzfDOKysyWALEt03voSvC1sN1sYGyCQWhvHQ',
  profileIconId: 556,
  revisionDate: 1669933331000,
  summonerLevel: 212
}

export class MockRiotService implements IRiotService {
  async createSummonerFromName(
    fetchSummonerDto: FetchSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    return {
      id: 1,
      summonerName: fetchSummonerDto.summonerName,
      isAdmin: false,
      level: riotProfileMockData.summonerLevel,
      icon: riotProfileMockData.profileIconId
    } as SummonerOmittingPasswordHash
  }

  async fetchSummonerByName(
    summonerName: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    region: string
  ): Promise<RiotSummoner> {
    return { ...riotProfileMockData, name: summonerName } as RiotSummoner
  }
}
