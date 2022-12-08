import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SummonerOmittingPasswordHash } from 'src/sql/summoners/entities/summoner.entity'
import { SummonerService } from 'src/sql/summoners/summoner.service'

export type JwtAuthenticatedRequest = Request & {
  summoner: SummonerOmittingPasswordHash
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private summonerService: SummonerService
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
  }): Promise<SummonerOmittingPasswordHash | undefined> {
    return await this.summonerService.findOne(parseInt(payload.sub))
  }
}
