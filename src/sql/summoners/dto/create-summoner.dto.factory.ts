import { faker } from '@faker-js/faker'
import { Mastery } from 'src/sql/masteries/entities/mastery.entity'
import { Rank } from 'src/sql/ranks/entities/rank.entity'
import { define } from 'typeorm-seeding'
import { CreateSummonerDto } from './create-summoner.dto'
define(
  CreateSummonerDto,
  (
    _,
    context?: {
      summonerName: string
      password: string
      icon: number
      level: number
      isAdmin: boolean
      regionName: string
      rank: Rank
      masteries: Mastery[]
    }
  ) => {
    return {
      summonerName: context?.summonerName ?? faker.name.firstName(),
      password: context?.password ?? faker.internet.password(),
      icon: context?.icon ?? faker.datatype.number(1000),
      level: context?.level ?? faker.datatype.number(100),
      isAdmin: context?.isAdmin ?? false,
      regionName: context?.regionName ?? undefined
      //rank: context?.rank ?? undefined
    } as CreateSummonerDto
  }
)
