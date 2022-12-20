import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  Validate
} from 'class-validator'
import { AlphanumericAllowSpaces } from 'src/validators/AlphanumericAllowSpaces'
import { ContainsNoEmoji } from 'src/validators/emoji.validator'

export class FetchSummonerDto {
  @IsString()
  @MinLength(3)
  @MaxLength(16)
  @IsNotEmpty()
  @Validate(ContainsNoEmoji)
  @Validate(AlphanumericAllowSpaces)
  summonerName!: string

  @IsString()
  @IsNotEmpty()
  regionName!: string

  @IsString()
  @MinLength(6)
  @MaxLength(45)
  @IsNotEmpty()
  @Validate(ContainsNoEmoji)
  password!: string
}
