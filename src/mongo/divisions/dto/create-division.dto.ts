import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateDivisionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name!: string
}
