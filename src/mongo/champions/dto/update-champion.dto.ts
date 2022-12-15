import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateChampionDto {
  @Length(1, 255)
  @IsString()
  @IsNotEmpty()
  name!: string
}
