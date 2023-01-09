import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, Min } from 'class-validator'

export class CreateRankDto {
  @ApiProperty()
  @IsNumber()
  @Min(0)
  lp!: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  divisionId!: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  tierId!: number

  @ApiProperty()
  @IsNumber()
  @Min(0)
  gameModeId!: number
}
