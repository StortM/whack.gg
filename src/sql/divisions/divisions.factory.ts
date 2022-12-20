import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { Division } from './entities/division.entity'

define(
  Division,
  (
    _,
    context?: {
      id: number
      name: string
      //ranks: Rank[]
    }
  ) => {
    const division = new Division()

    division.id = context?.id ?? faker.datatype.number(1000)
    division.name = context?.name ?? faker.name.firstName()
    //ivision.ranks = context?.ranks ?? []

    return division
  }
)
