import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateGameModeDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name!: string
}
