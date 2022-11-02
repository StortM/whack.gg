import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from 'src/users/users.service'
import { UserOmittingPasswordHash } from 'src/users/entities/user.entity'

export type JwtAuthenticatedRequest = Request & {
  user: UserOmittingPasswordHash
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService, private userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('TOKEN_SECRET')
    })
  }

  async validate(payload: {
    sub: string
    email: string
  }): Promise<UserOmittingPasswordHash | undefined> {
    return await this.userService.findOne(payload.sub)
  }
}
