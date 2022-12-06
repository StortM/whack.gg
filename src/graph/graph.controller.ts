import {
  Body,
  Controller,
  Post,
  Request,
  UseFilters,
  UseGuards
} from '@nestjs/common'
import { Neo4jErrorFilter } from 'nest-neo4j/dist'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local-auth.guard'
import { CreateUserDto } from './dto/create-user.dto'
import { LoginDto } from './dto/login.dto'
import { User } from './entities/user.entity'
import { UserService } from './graph.service'

@Controller('graph/users')
export class UsersController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @UseFilters(Neo4jErrorFilter)
  @Post('/')
  async postIndex(@Body() createUserDto: CreateUserDto): Promise<any> {
    const user: User = await this.userService.create(
      createUserDto.user.username,
      createUserDto.user.password,
      createUserDto.user.email,
      createUserDto.user.bio,
      createUserDto.user.image
    )

    const token = this.authService.createToken(user)

    return {
      user: {
        ...user.toJson(),
        token
      }
    }
  }

  //@UseGuards(LocalAuthGuard)
  @Post('/login')
  async postLogin(@Request() request: any, loginDto: LoginDto) {
    const token = this.authService.createToken(request.user)

    return {
      user: {
        ...request.user.toJson(),
        token
      }
    }
  }
}
