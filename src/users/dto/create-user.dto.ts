import { IsBoolean, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDTO {
  @IsNotEmpty()
  @IsString()
  fullName!: string

  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsNotEmpty()
  @IsString()
  password!: string
}
