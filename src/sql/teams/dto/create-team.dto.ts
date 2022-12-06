import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator'

export class CreateTeamDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  matchId!: number

  @IsBoolean()
  @IsNotEmpty()
  matchWon!: boolean
}
