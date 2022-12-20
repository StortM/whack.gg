import { Injectable, InternalServerErrorException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import axios from 'axios'
import { isValid } from 'src/utils/isValid'
import { CreateSummonerDto } from '../summoners/dto/create-summoner.dto'
import { SummonerOmittingPasswordHash } from '../summoners/entities/summoner.entity'
import { SummonerService } from '../summoners/summoner.service'
import { FetchSummonerDto } from './dto/fetch-summoner.dto'
import { RegionCodes, RegionName, RiotSummoner } from './riot.types'

export interface IRiotService {
  createSummonerFromName(
    fetchSummonerDto: FetchSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined>
  fetchSummonerByName(
    summonerName: string,
    region: string
  ): Promise<RiotSummoner>
}

@Injectable()
export class RiotService implements IRiotService {
  private riotApiKey

  constructor(
    private configService: ConfigService,
    private summonerService: SummonerService
  ) {
    this.riotApiKey = this.configService.get('RIOT_API_KEY')
  }

  async createSummonerFromName(
    fetchSummonerDto: FetchSummonerDto
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const dtoValid = await isValid(FetchSummonerDto, fetchSummonerDto)
    if (!dtoValid) return

    const riotSummoner = await this.fetchSummonerByName(
      fetchSummonerDto.summonerName,
      fetchSummonerDto.regionName
    )

    const createSummonerDto = {
      summonerName: riotSummoner.name,
      password: fetchSummonerDto.password,
      isAdmin: false,
      regionName: fetchSummonerDto.regionName,
      level: riotSummoner.summonerLevel,
      icon: riotSummoner.profileIconId
    } as CreateSummonerDto

    return await this.summonerService.create(createSummonerDto)
  }

  async fetchSummonerByName(
    summonerName: string,
    region: string
  ): Promise<RiotSummoner> {
    try {
      const regionCode = this.convertRegionNameToRegionCode(region)
      if (!regionCode)
        throw new InternalServerErrorException("Region doesn't exist")

      const { data } = await axios.get<RiotSummoner>(
        `https://${regionCode}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-Riot-Token': this.riotApiKey
          }
        }
      )
      return data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.toJSON(), error.response)
      } else {
        console.error(error)
      }
      throw new InternalServerErrorException(
        'Failed to recieve data from riot api'
      )
    }
  }

  convertRegionNameToRegionCode(regionName: string): string | undefined {
    const regionNameInRegionCodes =
      Object.keys(RegionCodes).includes(regionName)

    if (!regionNameInRegionCodes) return

    return RegionCodes[regionName as RegionName]
  }
}
