import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { SummonerOmittingPasswordHash } from './../summoner/schemas/summoners.schema'
import { LocalAuthGuard } from './auth-local.guard'
import { AuthService } from './auth.service'
import { AuthenticatedRequest } from './local.strategy'

export interface LoginResponse {
  accessToken: string
  summoner: SummonerOmittingPasswordHash
}

@Controller('mongo-auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest): Promise<LoginResponse> {
    return this.authService.login({
      ...req.user,
      summonerName: req.user.summonerName.toLowerCase() // Case-insentitive compare.
    })
  }
}
