import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Param,
  Delete,
  UseGuards,
  ValidationPipe,
  Put
} from '@nestjs/common'
import { createSummonerDto } from './dto/create-summoner.dto'
import { SummonersService } from './summoners.service'
import {
  Summoner,
  SummonerOmittingPasswordHash
} from './schemas/summoners.schema'
import { updateSummonerDto } from './dto/update-summoner.dto'
import { AuthService } from '../auth/auth.service'
import { HttpException } from '@nestjs/common'
import { Mastery } from '../masteries/schemas/masteries.schema'

import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { AdminGuard } from './../auth/admin.guard'
import { ApiTags } from '@nestjs/swagger/dist'

@ApiTags('MongoDB Summoners')
@Controller('mongo-summoners')
export class SummonerController {
  constructor(
    private readonly summonersService: SummonersService,
    private readonly authService: AuthService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body(new ValidationPipe()) createSummonerDto: createSummonerDto,
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

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: updateSummonerDto
  ): Promise<Summoner | null> {
    return this.summonersService.update(id, updateRegionDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.summonersService.remove(id)
  }
}
