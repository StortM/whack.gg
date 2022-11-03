import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { UserOmittingPasswordHash } from 'src/users/entities/user.entity'
import { LoginResponse } from './auth.controller'

export type JwtToken = {
  email: string
  sub: string
  iat: number
  exp: number
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    email: string,
    pass: string
  ): Promise<UserOmittingPasswordHash | null> {
    const user = await this.usersService.findOneWithPasswordHash(email)
    if (user && (await compare(pass, user.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = user
      return result
    }

    return null
  }

  async login(user: UserOmittingPasswordHash): Promise<LoginResponse> {
    const payload = { email: user.email, sub: user.id }
    return {
      accessToken: this.jwtService.sign(payload),
      user
    }
  }

  async isAdminToken(token: string): Promise<boolean> {
    const decodedToken = this.jwtService.decode(token) as JwtToken

    const user = await this.usersService.findOne(decodedToken.sub)

    return user?.isAdmin ?? false
  }

  async validateEmail(email: string): Promise<boolean> {
    const user = await !!this.usersService.findOneWithPasswordHash(email)

    return !!user
  }
}
