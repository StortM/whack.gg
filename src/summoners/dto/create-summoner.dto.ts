import { Type } from 'class-transformer'
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'
import { CreateRankDto } from 'src/ranks/dto/create-rank.dto'
import { Rank } from 'src/ranks/entities/rank.entity'

export class CreateSummonerDto {
  @IsString()
  @IsNotEmpty()
  name!: string

  @IsNumber()
  @IsNotEmpty()
  level!: number

  @IsNumber()
  @IsNotEmpty()
  icon!: number

  @IsNumber()
  @IsNotEmpty()
  regionId!: number

  @IsOptional()
  @Type(() => CreateRankDto)
  rank?: Rank
}
