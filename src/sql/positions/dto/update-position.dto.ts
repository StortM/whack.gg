import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdatePositionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name!: string
}
