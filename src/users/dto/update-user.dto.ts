import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsNotEmpty()
  @IsString()
  fullName!: string

  @IsNotEmpty()
  @IsBoolean()
  isAdmin!: boolean

  @IsNotEmpty()
  @IsString()
  email!: string

  @IsString()
  @IsOptional()
  password?: string
}
