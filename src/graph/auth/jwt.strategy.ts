import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SummonerOmittingPasswordHash } from '../summoner/entities/summoner.entity'
import { SummonerService } from '../summoner/summoner.service'

export type JwtAuthenticatedRequest = Request & {
  summoner: SummonerOmittingPasswordHash
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'graph-jwt') {
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
    const summoner = await this.summonerService.findOne(parseInt(payload.sub))
    if (summoner) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...rest } = summoner.toJson()
      return { ...rest }
    }

    return
  }
}
