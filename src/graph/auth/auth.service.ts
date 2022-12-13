import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EncryptionService } from '../encryption/encryption.service'
import { Summoner } from '../summoner/entities/summoner.entity'
import { SummonerService } from '../summoner/summoner.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: SummonerService,
    private readonly encryptionService: EncryptionService,
    private readonly jwtService: JwtService
  ) {}

  createToken(user: Summoner): string {
    const token = this.jwtService.sign(user.getClaims())

    return token
  }

  async validateUser(
    summonerName: string,
    password: string
  ): Promise<Summoner | undefined> {
    const user = await this.userService.findBySummonerName(summonerName)

    if (
      user &&
      (await this.encryptionService.compare(password, user.getPassword()))
    ) {
      return user
    }

    return undefined
  }
}
