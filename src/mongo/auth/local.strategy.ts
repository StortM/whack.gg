import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-local'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from './../summoner/schemas/summoners.schema'
import { AuthService } from './auth.service'

export type AuthenticatedRequest = Request & {
  user: SummonerOmittingPasswordHash
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'mongo-local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'summonerName' })
  }

  async validate(
    summonerName: string,
    password: string
  ): Promise<SummonerOmittingPasswordHash> {
    const summoner = await this.authService.validateUser(summonerName, password)
    if (!summoner) {
      throw new UnauthorizedException('Wrong summonerName or password')
    }
    return summoner
  }
}
