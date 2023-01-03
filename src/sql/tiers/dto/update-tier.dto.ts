import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateTierDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(1, 10)
  value!: string
}
