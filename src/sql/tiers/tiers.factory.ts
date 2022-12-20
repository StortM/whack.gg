import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { Rank } from '../ranks/entities/rank.entity'
import { Tier } from './entities/tier.entity'

define(
  Tier,
  (
    _,
    context?: {
      id: number
      value: string
      ranks: Rank[]
    }
  ) => {
    const tier = new Tier()

    tier.id = context?.id ?? faker.datatype.number(1000)
    tier.value = context?.value ?? faker.lorem.word()
    tier.ranks = context?.ranks

    return tier
  }
)
