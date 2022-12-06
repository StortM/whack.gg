import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateChampionDto {
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name!: string
}
