import { Type } from 'class-transformer'
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
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
  @IsPositive()
  @IsInt()
  level!: number

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  icon!: number

  @IsString()
  @IsNotEmpty()
  regionName!: string

  @IsNotEmpty()
  // string
  // 0
  // null
  // undefined

  // true
  // false
  @IsBoolean()
  isAdmin!: boolean

  @IsOptional()
  @Type(() => CreateRankDto)
  rank?: Rank
}
