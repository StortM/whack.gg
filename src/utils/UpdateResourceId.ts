import { IsInt, IsNotEmpty, IsNumber, IsPositive, Max } from 'class-validator'

export class UpdateResourceId {
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  @Max(2147483647)
  id!: number
}
