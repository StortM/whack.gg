import { Body, Controller, Post, Request, UseFilters } from '@nestjs/common'
import { Neo4jErrorFilter } from 'nest-neo4j/dist'
import { AuthService } from '../auth/auth.service'
import { LoginDto } from '../auth/dto/login.dto'
import { CreateSummonerDto } from './dto/create-sumoner.dto'
import { SummonerService } from './summoner.service'

@Controller('graph/summoners')
export class SummonerController {
  constructor(
    private readonly summonerService: SummonerService,
    private readonly authService: AuthService
  ) {}

  // endoint is open but only admins can create admin users
  // TODO: Limit admin creation to only admins
  @UseFilters(Neo4jErrorFilter)
  @Post('/')
  async postIndex(@Body() createSummonerDto: CreateSummonerDto): Promise<any> {
    const summoner = await this.summonerService.create(createSummonerDto)

    //const token = this.authService.createToken(summoner)

    return summoner.toJson()
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
