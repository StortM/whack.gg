import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards
} from '@nestjs/common'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { User } from '../entities/user.entity'
import { UserService } from '../graph.service'

@Controller('profiles')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:username')
  async getIndex(@Request() request: any, @Param('username') username: string) {
    const user = await this.userService.findByUsername(username)

    if (!user) throw new NotFoundException(`User ${username} not found`)

    const following = await this.userService.isFollowing(
      user,
      <User>request.user
    )

    return {
      profile: {
        ...user.toJson(),
        following
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('/:username/follow')
  async postFollow(
    @Request() request: any,
    @Param('username') username: string
  ) {
    const user = await this.userService.follow(request.user, username)

    if (!user) throw new NotFoundException(`User ${username} not found`)

    return {
      profile: {
        ...user.toJson(),
        following: true
      }
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:username/follow')
  async deleteFollow(
    @Request() request: any,
    @Param('username') username: string
  ) {
    const user = await this.userService.unfollow(request.user, username)

    if (!user) throw new NotFoundException(`User ${username} not found`)

    return {
      profile: {
        ...user.toJson(),
        following: false
      }
    }
  }
}
