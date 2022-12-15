import { IsNumber } from 'class-validator'
import { Summoner } from 'src/mongo/summoner/schemas/summoners.schema'

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
