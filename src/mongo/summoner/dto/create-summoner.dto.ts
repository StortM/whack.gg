import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString
} from 'class-validator'
import { Mastery } from 'src/mongo/masteries/schemas/masteries.schema'
import { Rank } from '../schemas/summoners.schema'

export class createSummonerDto {
  @IsNotEmpty()
  @IsString()
  summonerName!: string

  @IsString()
  @IsNotEmpty()
  password!: string

  @IsBoolean()
  @IsNotEmpty()
  isAdmin!: boolean

  @IsString()
  @IsOptional()
  regionName?: string

  @IsOptional()
  @IsNumber()
  level?: number

  @IsOptional()
  @IsNumber()
  icon?: number

  rank?: Rank[]

  masteries?: Mastery[]
}
