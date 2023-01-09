import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger/dist'
import { CreateTierDto } from './dto/create-tier.dto'
import { UpdateTierDto } from './dto/update-tier.dto'
import { Tier } from './schemas/tiers.schema'
import { TiersService } from './tiers.service'

@ApiTags('MongoDB Tiers')
@Controller('mongo/tiers')
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
  findOne(@Param('id') id: string): Promise<Tier | null> {
    return this.tiersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTierDto: UpdateTierDto
  ): Promise<Tier | null> {
    return this.tiersService.update(id, updateTierDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tiersService.remove(id)
  }
}
