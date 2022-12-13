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
import { Summoner } from '../summoner/entities/summoner.entity'
import { SummonerService } from '../summoner/summoner.service'

@Controller('/graph/participants')
export class ParticipantController {
  constructor(private readonly summonerService: SummonerService) {}

  /*   @UseGuards(JwtAuthGuard)
  @Get('/:username')
  async getIndex(@Request() request: any, @Param('username') username: string) {
    const user = await this.summonerService.findBySummonerName(username)

    if (!user) throw new NotFoundException(`User ${username} not found`)

    const following = await this.summonerService.isFollowing(
      user,
      <Summoner>request.user
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
    const user = await this.summonerService.follow(request.user, username)

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
    const user = await this.summonerService.unfollow(request.user, username)

    if (!user) throw new NotFoundException(`User ${username} not found`)

    return {
      profile: {
        ...user.toJson(),
        following: false
      }
    }
  } */
}
