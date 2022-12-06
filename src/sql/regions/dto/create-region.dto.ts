import { IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  @Length(1, 45)
  name!: string
}
