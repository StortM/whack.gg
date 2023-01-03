import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateSummonerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  summonerName!: string

  @ApiProperty()
  @IsNotEmpty()
  password!: string

  @ApiProperty()
  @IsBoolean()
  isAdmin!: boolean

  @ApiProperty()
  @IsOptional()
  level?: number

  @ApiProperty()
  @IsOptional()
  icon?: number
}
