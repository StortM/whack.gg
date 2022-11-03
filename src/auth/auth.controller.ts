import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common'
import { UserOmittingPasswordHash } from 'src/users/entities/user.entity'
import { LocalAuthGuard } from './auth-local.guard'
import { AuthService } from './auth.service'
import { CheckEmailDto } from './dto/check-email.dto'
import { AuthenticatedRequest } from './local.strategy'

export interface LoginResponse {
  accessToken: string
  user: UserOmittingPasswordHash
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: AuthenticatedRequest): Promise<LoginResponse> {
    return this.authService.login({
      ...req.user,
      email: req.user.email.toLowerCase() // Case-insentitive compare.
    })
  }

  @Post('check-email')
  checkEmail(@Body() emailDto: CheckEmailDto): Promise<boolean> {
    return this.authService.validateEmail(emailDto.email)
  }
}
