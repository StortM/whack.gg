import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { Mastery } from './schemas/masteries.schema'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { AdminGuard } from './../auth/admin.guard'
import { MasteriesService } from './masteries.service'
import { CreateMasteryDto } from './dto/create-mastery.dto'
import { UpdateMasteryDto } from './dto/update-mastery.dto'

@Controller('mongo-masteries')
export class MasteriesController {
  constructor(private readonly masteriesService: MasteriesService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  async create(
    @Body() createMasteryDto: CreateMasteryDto
  ): Promise<Mastery | undefined | any> {
    const res = await this.masteriesService.create(createMasteryDto)

    const newMastery = {
      level: res.level,
      championPoints: res.championPoints,
      lastPlayed: res.lastPlayed
    }

    return res
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Mastery[] | undefined> {
    return this.masteriesService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Mastery | null> {
    const res = this.masteriesService.findOne(id)

    if (!res) {
      throw new HttpException(
        `Resource not found with ${id}`,
        HttpStatus.NOT_FOUND
      )
    }

    return res
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMasteryDto: UpdateMasteryDto
  ): Promise<Mastery | null> {
    return this.masteriesService.update(id, updateMasteryDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Mastery | null> {
    return this.masteriesService.remove(id)
  }
}
