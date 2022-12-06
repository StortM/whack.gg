import { IsNumber, Min } from 'class-validator'

export class CreateRankDto {
  @IsNumber()
  @Min(0)
  lp!: number

  @IsNumber()
  @Min(0)
  divisionId!: number

  @IsNumber()
  @Min(0)
  tierId!: number

  @IsNumber()
  @Min(0)
  gameModeId!: number
}
