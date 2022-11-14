import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { DivisionsService } from './divisions.service'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'
import { Division } from './entities/division.entity'

@Controller('divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @Post()
  create(
    @Body() createDivisionDto: CreateDivisionDto
  ): Promise<Division | undefined> {
    return this.divisionsService.create(createDivisionDto)
  }

  @Get()
  findAll(): Promise<Division[] | undefined> {
    return this.divisionsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Division | undefined> {
    return this.divisionsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivisionDto: UpdateDivisionDto
  ): Promise<Division | undefined> {
    return this.divisionsService.update(id, updateDivisionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.divisionsService.remove(+id)
  }
}
