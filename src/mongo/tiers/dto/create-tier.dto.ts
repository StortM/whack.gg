import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateTierDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  value!: string
}
