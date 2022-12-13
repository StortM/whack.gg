import { Type } from 'class-transformer'
import { IsEmail, ValidateNested } from 'class-validator'

class UpdatedUser {
  @IsEmail()
  email?: string

  password?: string

  bio?: string
  image?: string
}

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UpdatedUser)
  user!: UpdatedUser
}
