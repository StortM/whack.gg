import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'
import { Team } from '../schema/matches.schema'

export class CreateMatchDto {
  @ApiProperty()
  @IsNumber()
  duration!: number

  @ApiProperty()
  gameMode!: string

  @ApiProperty()
  gameCreation!: number

  @ApiProperty()
  championName!: string

  @ApiProperty()
  @IsArray()
  @IsNotEmpty()
  teams!: Team[]
}
