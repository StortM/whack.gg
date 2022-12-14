import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { JwtAuthenticatedRequest } from 'src/sql/auth/jwt.strategy'
import { AuthService } from '../auth/auth.service'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'
import {
  SummonerOmittingPasswordHash,
  SummonerWithFullRank
} from './entities/summoner.entity'
import { SummonerService } from './summoner.service'

@Controller('sql/summoner')
export class SummonerController {
  constructor(
    private readonly summonerService: SummonerService,
    private readonly authService: AuthService
  ) {}

  // endoint is open but only admins can create admin users
  // TODO: Limit admin creation to only admins
  @Post()
  async create(
    @Body(new ValidationPipe()) createSummonerDto: CreateSummonerDto,
    @Headers('Authorization') auth: string
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const isCreatingAdminUser = createSummonerDto.isAdmin

    if (isCreatingAdminUser) {
      if (auth) {
        const token = auth.split(' ')[1]
        const isAdmin = await this.authService.isAdminToken(token)

        if (!isAdmin) {
          throw new HttpException('Forbidden', 403)
        }
      } else {
        throw new HttpException('Forbidden', 403)
      }
    }

    const res = await this.summonerService.create(createSummonerDto)
    if (!res) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }
    return res
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<SummonerOmittingPasswordHash[] | undefined> {
    return await this.summonerService.findAll()
  }

  @Get(':id/fullrank')
  async getFullRank(
    @Param('name') name: string
  ): Promise<SummonerWithFullRank | undefined> {
    const summonerWithFullRank = await this.summonerService.getSummonerFullRank(
      name
    )

    if (!summonerWithFullRank) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    console.log(summonerWithFullRank)
    return summonerWithFullRank
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id') id: number
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const summoner = await this.summonerService.findOne(id)

    if (!summoner) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND)
    }

    return summoner
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateSummonerDto: UpdateSummonerDto,
    @Request() { summoner }: JwtAuthenticatedRequest
  ): Promise<SummonerOmittingPasswordHash | undefined> {
    const summonerFromDB = await this.summonerService.findOne(id)

    // Autorize admins and summoners
    if (!summoner.isAdmin && summoner.id !== summonerFromDB?.id)
      throw new UnauthorizedException()

    return await this.summonerService.update(id, updateSummonerDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: number,
    @Request() { summoner }: JwtAuthenticatedRequest
  ): Promise<void> {
    const summonerFromDB = await this.summonerService.findOne(id)

    // Autorize admins and summoners
    if (!summoner.isAdmin && summoner.id !== summonerFromDB?.id)
      throw new UnauthorizedException()

    return await this.summonerService.remove(+id)
  }
}
