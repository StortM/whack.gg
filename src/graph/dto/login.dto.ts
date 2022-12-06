import { Type } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsObject, ValidateNested } from 'class-validator'

class UserDto {
  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  password!: string
}

export class LoginDto {
  @IsObject()
  @ValidateNested()
  @Type(() => UserDto)
  user!: UserDto
}
