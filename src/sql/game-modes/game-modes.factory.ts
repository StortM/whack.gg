import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { Match } from '../matches/entities/match.entity'
import { Rank } from '../ranks/entities/rank.entity'
import { GameMode } from './entities/game-mode.entity'

define(
  GameMode,
  (
    _,
    context?: {
      id: number
      name: string
      ranks: Rank[]
      match: Match
    }
  ) => {
    const gameMode = new GameMode()

    gameMode.id = context?.id ?? faker.datatype.number(1000)
    gameMode.name = context?.name ?? faker.lorem.word()
    gameMode.ranks = context?.ranks
    gameMode.match = context?.match

    return gameMode
  }
)
