import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { SummonerOmittingPasswordHash } from 'src/sql/summoners/entities/summoner.entity'
import { SummonerService } from 'src/sql/summoners/summoner.service'
import { LoginResponse } from './auth.controller'

export type JwtToken = {
  summonerName: string
  sub: string
  iat: number
  exp: number
}

@Injectable()
export class AuthService {
  constructor(
    private summonerService: SummonerService,
    private jwtService: JwtService
  ) {}

  async validateUser(
    summonerName: string,
    pass: string
  ): Promise<SummonerOmittingPasswordHash | null> {
    const summoner = await this.summonerService.findOneWithPasswordHash({
      name: summonerName
    })

    if (summoner && (await compare(pass, summoner.passwordHash))) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { passwordHash, ...result } = summoner

      return result
    }

    return null
  }

  async login(summoner: SummonerOmittingPasswordHash): Promise<LoginResponse> {
    const payload = { summonerName: summoner.summonerName, sub: summoner.id }
    return {
      accessToken: this.jwtService.sign(payload),
      summoner
    }
  }

  async isAdminToken(token: string): Promise<boolean> {
    const decodedToken = this.jwtService.decode(token) as JwtToken
    const summoner = await this.summonerService.findOne({
      id: parseInt(decodedToken.sub)
    })

    return summoner?.isAdmin ?? false
  }
}
