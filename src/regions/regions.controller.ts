import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { RegionsService } from './regions.service'
import { CreateRegionDto } from './dto/create-region.dto'
import { UpdateRegionDto } from './dto/update-region.dto'
import { Region } from './entities/region.entity'

@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  create(
    @Body() createRegionDto: CreateRegionDto
  ): Promise<Region | undefined> {
    return this.regionsService.create(createRegionDto)
  }

  @Get()
  findAll(): Promise<Region[] | undefined> {
    return this.regionsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Region | undefined> {
    return this.regionsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto
  ): Promise<Region | undefined> {
    return this.regionsService.update(id, updateRegionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.regionsService.remove(+id)
  }
}
