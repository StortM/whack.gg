import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common'
import { RegionsService } from './regions.service'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { Region } from './entities/region.entity'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('SQL Regions')
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
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
  findOne(@Param('id') id: number): Promise<Region | undefined> {
    return this.regionsService.findOne(id)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateRegionDto: UpdateRegionDto
  ): Promise<Region | undefined> {
    return this.regionsService.update(id, updateRegionDto)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.regionsService.remove(+id)
  }
}
