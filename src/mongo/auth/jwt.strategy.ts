import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SummonerOmittingPasswordHash } from './../summoner/schemas/summoners.schema'
import { SummonersService } from './../summoner/summoners.service'

export type JwtAuthenticatedRequest = Request & {
  summoner: SummonerOmittingPasswordHash
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'mongo-jwt') {
  constructor(
    configService: ConfigService,
    private summonerService: SummonersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('TOKEN_SECRET')
    })
  }

  async validate(payload: {
    sub: string
    summonerName: string
  }): Promise<SummonerOmittingPasswordHash | null> {
    return await this.summonerService.findOne(payload.sub)
  }
}
