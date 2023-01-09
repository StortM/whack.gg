import { Mastery } from 'src/mongo/masteries/schemas/masteries.schema'
import { Rank } from '../schemas/summoners.schema'

export class UpdateSummonerDto {
  name!: string
  level!: number
  mastery!: Mastery | Mastery[]
  icon!: number
  rank!: Rank[] | Rank
}
