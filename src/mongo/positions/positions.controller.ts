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
import { ApiTags } from '@nestjs/swagger/dist'
import { AdminGuard } from './../auth/admin.guard'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { PositionsService } from './positions.service'
import { Position } from './schemas/positions.schema'

@ApiTags('MongoDB Positions')
@Controller('mongo/positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(
    @Body() createPositionDto: CreatePositionDto
  ): Promise<Position | undefined> {
    return this.positionsService.create(createPositionDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Position[] | undefined> {
    return this.positionsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Position | null> {
    return this.positionsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ): Promise<Position | null> {
    return this.positionsService.update(id, updatePositionDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.positionsService.remove(id)
  }
}
