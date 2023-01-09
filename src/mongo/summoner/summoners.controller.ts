import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpException,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe
} from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from './schemas/summoners.schema'
import { SummonersService } from './summoners.service'

import { ApiTags } from '@nestjs/swagger/dist'
import { AdminGuard } from './../auth/admin.guard'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { CreateSummonerDto } from './dto/create-summoner.dto'
import { UpdateSummonerDto } from './dto/update-summoner.dto'

@ApiTags('MongoDB Summoners')
@Controller('mongo/summoners')
export class SummonerController {
  constructor(
    private readonly summonersService: SummonersService,
    private readonly authService: AuthService
  ) {}

  @Post()
  async create(
    @Body(new ValidationPipe()) createSummonerDto: CreateSummonerDto,
    @Headers('Authorization') auth: string
  ): Promise<SummonerOmittingPasswordHash | null> {
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

    return this.summonersService.create(createSummonerDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Summoner[] | null> {
    return this.summonersService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(
    @Param('id') id: string
  ): Promise<SummonerOmittingPasswordHash | null> {
    return this.summonersService.findOne(id)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateSummonerDto
  ): Promise<Summoner | null> {
    return this.summonersService.update(id, updateRegionDto)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.summonersService.remove(id)
  }
}
