import { Controller, Post, Request, UseGuards } from '@nestjs/common'
import { SummonerOmittingPasswordHash } from 'src/sql/summoners/entities/summoner.entity'
import { LocalAuthGuard } from './auth-local.guard'
import { AuthService } from './auth.service'
import { AuthenticatedRequest } from './local.strategy'

export interface LoginResponse {
  accessToken: string
  summoner: SummonerOmittingPasswordHash
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest): Promise<LoginResponse> {
    console.log('req', req.body)

    return this.authService.login({
      ...req.user,
      summonerName: req.user.summonerName.toLowerCase() // Case-insentitive compare.
    })
  }
}
