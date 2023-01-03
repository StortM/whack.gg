import { ApiProperty } from '@nestjs/swagger'
import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator'

export class CreateTeamDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  matchId!: number

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  matchWon!: boolean
}
