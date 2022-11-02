import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseFilters,
  UseInterceptors,
  Body
} from '@nestjs/common'
import { LocalAuthGuard } from './auth-local.guard'
import { AuthService } from './auth.service'
import { AuthenticatedRequest } from './local.strategy'
import { UserOmittingPasswordHash } from 'src/users/entities/user.entity'
import { CatchAllExceptionsFilter } from 'src/utils/exception.filter'
import { ResultInterceptor } from 'src/utils/result.interceptor'
import { CheckEmailDto } from './dto/check-email.dto'

export interface LoginResponse {
  accessToken: string
  user: UserOmittingPasswordHash
}

@UseFilters(new CatchAllExceptionsFilter())
@UseInterceptors(new ResultInterceptor())
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
