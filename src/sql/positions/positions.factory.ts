import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { Participant } from '../participants/entities/participant.entity'
import { Position } from './entities/position.entity'

define(
  Position,
  (
    _,
    context?: {
      id: number
      name: string
      participants: Participant[]
    }
  ) => {
    const position = new Position()

    position.id = context?.id ?? faker.datatype.number(1000)
    position.name = context?.name ?? faker.lorem.word()
    position.participants = context?.participants

    return position
  }
)
