import { ApiProperty } from '@nestjs/swagger'
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
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summonerName!: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password!: string

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  isAdmin!: boolean

  @ApiProperty()
  @IsString()
  @IsOptional()
  regionName?: string

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  level?: number

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  icon?: number

  @ApiProperty()
  rank?: Rank[]

  @ApiProperty()
  masteries?: Mastery[]
}
