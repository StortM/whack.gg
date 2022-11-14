import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common'
import { TiersService } from './tiers.service'
import { CreateTierDto } from './dto/create-tier.dto'
import { UpdateTierDto } from './dto/update-tier.dto'
import { Tier } from './entities/tier.entity'

@Controller('tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  @Post()
  create(@Body() createTierDto: CreateTierDto): Promise<Tier | undefined> {
    return this.tiersService.create(createTierDto)
  }

  @Get()
  findAll(): Promise<Tier[] | undefined> {
    return this.tiersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Tier | undefined> {
    return this.tiersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateTierDto: UpdateTierDto
  ): Promise<Tier | undefined> {
    return this.tiersService.update(id, updateTierDto)
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tiersService.remove(+id)
  }
}
