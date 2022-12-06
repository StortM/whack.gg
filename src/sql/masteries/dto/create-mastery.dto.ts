import { IsNumber } from 'class-validator'
import { Champion } from 'src/sql/champions/entities/champion.entity'
import { Summoner } from 'src/sql/summoners/entities/summoner.entity'

export class CreateMasteryDto {
  level!: number
  championPoints!: number
  lastPlayed!: number
  summoner!: Summoner
  champion!: Champion
}
