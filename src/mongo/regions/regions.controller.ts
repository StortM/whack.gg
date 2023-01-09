import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AdminGuard } from './../auth/admin.guard'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { RegionsService } from './regions.service'
import { Region } from './schemas/regions.schema'

@ApiTags('MongoDB Regions')
@Controller('mongo/regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createRegionDto: CreateRegionDto
  ): Promise<Region | undefined> {
    return this.regionsService.create(createRegionDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Region[] | undefined> {
    return this.regionsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Region | null> {
    return this.regionsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto
  ): Promise<Region | null> {
    return this.regionsService.update(id, updateRegionDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.regionsService.remove(id)
  }
}
