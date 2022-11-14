import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { PositionsService } from './positions.service'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { Position } from './entities/position.entity'

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @Post()
  create(
    @Body() createPositionDto: CreatePositionDto
  ): Promise<Position | undefined> {
    return this.positionsService.create(createPositionDto)
  }

  @Get()
  findAll(): Promise<Position[] | undefined> {
    return this.positionsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Position | undefined> {
    return this.positionsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ): Promise<Position | undefined> {
    return this.positionsService.update(id, updatePositionDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.positionsService.remove(+id)
  }
}
