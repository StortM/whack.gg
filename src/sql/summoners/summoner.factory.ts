import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { CryptService } from '../../crypt/crypt.service'
import { Mastery } from '../masteries/entities/mastery.entity'
import { Participant } from '../participants/entities/participant.entity'
import { Rank } from '../ranks/entities/rank.entity'
import { Region } from '../regions/entities/region.entity'
import { Summoner } from './entities/summoner.entity'

define(
  Summoner,
  (
    _,
    context?: {
      id: number
      summonerName: string
      password: string
      icon: number
      level: number
      isAdmin: boolean
      region: Region
      rank: Rank
      participants: Participant
      masteries: Mastery[]
      cryptService: CryptService
    }
  ) => {
    const summoner = new Summoner()

    summoner.id = context?.id ?? faker.datatype.number(1000)
    summoner.summonerName = context?.summonerName ?? faker.name.firstName()
    summoner.icon = context?.icon ?? faker.datatype.number(1000)
    summoner.level = context?.level ?? faker.datatype.number(100)
    summoner.region = context?.region ?? undefined
    summoner.isAdmin = context?.isAdmin ?? false
    summoner.rank = context?.rank ?? undefined
    summoner.participants = context?.participants ?? undefined
    summoner.masteries = context?.masteries ?? undefined
    summoner.passwordHash =
      context?.password && context?.cryptService
        ? context?.cryptService.hashSync(context.password)
        : 'banankage'

    return summoner
  }
)
