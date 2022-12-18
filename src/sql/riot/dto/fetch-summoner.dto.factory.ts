import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { FetchSummonerDto } from './fetch-summoner.dto'
define(
  FetchSummonerDto,
  (
    _,
    context?: {
      summonerName: string
      password: string
      regionName: string
    }
  ) => {
    return {
      summonerName: context?.summonerName ?? faker.name.firstName(),
      password: context?.password ?? faker.internet.password(),
      regionName: context?.regionName ?? undefined
    } as FetchSummonerDto
  }
)
