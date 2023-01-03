import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { MasteriesService } from './masteries.service'
import { CreateMasteryDto } from './dto/create-mastery.dto'
import { UpdateMasteryDto } from './dto/update-mastery.dto'
import { Mastery } from './entities/mastery.entity'
import { ApiTags } from '@nestjs/swagger/dist'

@ApiTags('SQL Masteries')
@Controller('masteries')
export class MasteriesController {
  constructor(private readonly masteriesService: MasteriesService) {}

  @Post()
  create(
    @Body() createMasteryDto: CreateMasteryDto
  ): Promise<Mastery | undefined> {
    return this.masteriesService.create(createMasteryDto)
  }

  @Get()
  findAll(): Promise<Mastery[] | undefined> {
    return this.masteriesService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Mastery | undefined> {
    return this.masteriesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateMasteryDto: UpdateMasteryDto
  ): Promise<Mastery | undefined> {
    return this.masteriesService.update(+id, updateMasteryDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.masteriesService.remove(+id)
  }
}
