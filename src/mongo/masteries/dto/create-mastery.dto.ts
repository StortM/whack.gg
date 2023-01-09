import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Summoner } from './../../summoner/schemas/summoners.schema'

export class CreateMasteryDto {
  @ApiProperty()
  @IsNumber()
  level!: number

  @ApiProperty()
  @IsNumber()
  championPoints!: number

  @ApiProperty()
  @IsNumber()
  lastPlayed!: number

  @ApiProperty()
  summoner!: Summoner
  //champion!: Champion
}
