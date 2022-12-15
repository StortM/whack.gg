import * as faker from 'faker'
import { define } from 'typeorm-seeding'
import { Region } from '../regions/entities/region.entity'

define(
  Region,
  (
    _,
    context?: {
      id: number
      name: string
    }
  ) => {
    const region = new Region()
    region.id = context?.id ?? faker.datatype.number(1000)
    region.name = context?.name ?? faker.address.countryCode()

    return region
  }
)
