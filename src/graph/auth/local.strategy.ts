import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from '../summoner/entities/summoner.entity'
import { AuthService } from './auth.service'

export type AuthenticatedRequest = Request & { user: Summoner }

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'graph-local') {
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
