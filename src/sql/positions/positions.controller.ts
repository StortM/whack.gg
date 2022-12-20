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
import { PositionsService } from './positions.service'
import { CreatePositionDto } from './dto/create-position.dto'
import { UpdatePositionDto } from './dto/update-position.dto'
import { Position } from './entities/position.entity'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'

@Controller('positions')
export class PositionsController {
  constructor(private readonly positionsService: PositionsService) {}
  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPositionDto: CreatePositionDto
  ): Promise<Position | undefined> {
    return this.positionsService.create(createPositionDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Position[] | undefined> {
    return this.positionsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Position | undefined> {
    return this.positionsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updatePositionDto: UpdatePositionDto
  ): Promise<Position | undefined> {
    return this.positionsService.update(id, updatePositionDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.positionsService.remove(+id)
  }
}
