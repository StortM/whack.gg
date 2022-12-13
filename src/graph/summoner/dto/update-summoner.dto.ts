import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateSummonerDto {
  @IsNotEmpty()
  id!: number

  @IsNotEmpty()
  @IsString()
  summonerName!: string

  @IsNotEmpty()
  password!: string

  @IsBoolean()
  isAdmin!: boolean

  @IsOptional()
  level?: number

  @IsOptional()
  icon?: number
}
