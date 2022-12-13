import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Summoner } from '../summoner/entities/summoner.entity'
import { SummonerService } from '../summoner/summoner.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: SummonerService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Token'),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }
  async validate(payload: any): Promise<Summoner | undefined> {
    return this.userService.findBySummonerName(payload.summonerName)
  }
}
