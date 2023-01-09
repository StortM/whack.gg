import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, Min } from 'class-validator'

export class UpdateMatchDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  duration!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  gameModeId!: number

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  gameCreation!: number
}
