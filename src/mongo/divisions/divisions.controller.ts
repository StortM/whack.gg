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
import { DivisionsService } from './divisions.service'
import { CreateDivisionDto } from './dto/create-division.dto'
import { UpdateDivisionDto } from './dto/update-division.dto'
import { Division } from './schemas/divisions.schema'
import { JwtAuthGuard } from './../auth/jwt-auth.guard'
import { AdminGuard } from './../auth/admin.guard'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('MongoDB Divisions')
@Controller('mongo/divisions')
export class DivisionsController {
  constructor(private readonly divisionsService: DivisionsService) {}

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createDivisionDto: CreateDivisionDto
  ): Promise<Division | undefined> {
    return this.divisionsService.create(createDivisionDto)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Division[] | undefined> {
    return this.divisionsService.findAll()
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Division | null> {
    return this.divisionsService.findOne(id)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDivisionDto: UpdateDivisionDto
  ): Promise<Division | null> {
    return this.divisionsService.update(id, updateDivisionDto)
  }

  @UseGuards(AdminGuard)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.divisionsService.remove(id)
  }
}
