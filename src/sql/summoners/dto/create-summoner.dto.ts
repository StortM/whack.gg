import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength
} from 'class-validator'
import { CreateRankDto } from 'src/sql/ranks/dto/create-rank.dto'
import { Rank } from 'src/sql/ranks/entities/rank.entity'

export class CreateSummonerDto {
  @IsString()
  @IsNotEmpty()
  summonerName!: string

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string

  @IsNumber()
  @IsNotEmpty()
  level!: number

  @IsNumber()
  @IsNotEmpty()
  icon!: number

  @IsString()
  @IsNotEmpty()
  regionName!: string

  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean

  @IsOptional()
  @Type(() => CreateRankDto)
  rank?: Rank
}
