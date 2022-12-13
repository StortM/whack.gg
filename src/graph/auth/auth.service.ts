import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CryptService } from 'src/sql/crypt/crypt.service'
import { SummonerNode } from '../summoner/entities/summoner.entity'
import { SummonerService } from '../summoner/summoner.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: SummonerService,
    private readonly cryptService: CryptService,
    private readonly jwtService: JwtService
  ) {}

  createToken(user: SummonerNode): string {
    const token = this.jwtService.sign(user.getClaims())

    return token
  }

  async validateUser(
    summonerName: string,
    password: string
  ): Promise<SummonerNode | undefined> {
    const user = await this.userService.findBySummonerName(summonerName)

    if (
      user &&
      (await this.cryptService.compare(password, user.getPassword()))
    ) {
      return user
    }

    return undefined
  }
}
