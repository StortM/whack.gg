import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'
import { Team } from '../schema/matches.schema'

export class CreateMatchDto {
  @IsNumber()
  duration!: number

  gameMode!: string

  gameCreation!: number

  championName!: string
  @IsArray()
  @IsNotEmpty()
  teams!: Team[]
}
