import {
  IsNotEmpty,
  IsEmail,
  ValidateNested,
  IsObject,
  Length
} from 'class-validator'
import { Type } from 'class-transformer'

class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @Length(1, 100)
  username!: string

  @IsNotEmpty()
  password!: string

  bio?: string
  image?: string
}

export class CreateUserDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto
}
