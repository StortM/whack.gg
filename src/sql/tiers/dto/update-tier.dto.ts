import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateTierDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  value!: string
}
