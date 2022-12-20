import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { Summoner } from '../summoners/entities/summoner.entity'
import { Rank } from './entities/rank.entity'

define(
  Rank,
  (
    _,
    context?: {
      id: number
      lp: number
      gameModeId: number
      divisionId: number
      tierId: number
      summoners: Summoner[]
    }
  ) => {
    const rank = new Rank()

    rank.id = context?.id ?? faker.datatype.number(1000)
    rank.lp = context?.lp ?? faker.datatype.number(100)
    rank.gameModeId = context?.gameModeId
    rank.divisionId = context?.divisionId
    rank.tierId = context?.tierId
    rank.summoners = context?.summoners

    return rank
  }
)
