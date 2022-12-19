import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Request } from 'express'
import { Strategy } from 'passport-local'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from 'src/sql/summoners/entities/summoner.entity'
import { AuthService } from './auth.service'

export type AuthenticatedRequest = Request & { user: Summoner }

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'sql-local') {
  constructor(private authService: AuthService) {
    super({ usernameField: 'summonerName' })
  }

  async validate(
    summonerName: string,
    password: string
  ): Promise<SummonerOmittingPasswordHash> {
    console.log(summonerName, password)

    const summoner = await this.authService.validateUser(summonerName, password)
    if (!summoner) {
      throw new UnauthorizedException('Wrong summonerName or password')
    }
    return summoner
  }
}
