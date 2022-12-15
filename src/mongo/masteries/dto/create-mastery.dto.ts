import { IsNumber } from 'class-validator'
import { Summoner } from './../../summoner/schemas/summoners.schema'

export class CreateMasteryDto {
  @IsNumber()
  level!: number

  @IsNumber()
  championPoints!: number

  @IsNumber()
  lastPlayed!: number

  summoner!: Summoner
  //champion!: Champion
}
