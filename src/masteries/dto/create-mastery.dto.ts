import { Champion } from 'src/champions/entities/champion.entity'
import { Summoner } from 'src/summoners/entities/summoner.entity'

export class CreateMasteryDto {
  level!: number
  championPoints!: number
  lastPlayed!: number
  summoner!: Summoner
  champion!: Champion
}
