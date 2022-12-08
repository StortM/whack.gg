import { IsNotEmpty, IsNumber, Min } from 'class-validator'

export class CreateMatchDto {
  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  duration!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  gameModeId!: number

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  gameCreation!: number
}
