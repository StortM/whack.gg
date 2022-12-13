import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { Mastery } from 'src/mongo/masteries/schemas/masteries.schema'
import { Rank } from '../schemas/summoners.schema'

export class createSummonerDto {
  @IsNotEmpty()
  @IsString()
  name!: string

  @IsNumber()
  level!: number

  @IsNumber()
  icon!: number

  rank!: Rank[]

  masteries!: Mastery[]
}
