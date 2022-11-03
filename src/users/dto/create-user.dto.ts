import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  fullName!: string

  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean

  @IsNotEmpty()
  @IsEmail()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
