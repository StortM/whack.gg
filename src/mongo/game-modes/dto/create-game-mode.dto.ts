import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateGameModeDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name!: string
}
