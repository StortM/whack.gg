import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator'

export class UpdateTeamDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  matchId!: number

  @IsBoolean()
  @IsNotEmpty()
  matchWon!: boolean
}
