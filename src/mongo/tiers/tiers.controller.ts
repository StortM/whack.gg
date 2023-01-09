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
import { TiersService } from './tiers.service'
import { CreateTierDto } from './dto/create-tier.dto'
import { UpdateTierDto } from './dto/update-tier.dto'
import { Tier } from './schemas/tiers.schema'
import { ApiTags } from '@nestjs/swagger/dist'
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
// import { AdminGuard } from 'src/auth/admin.guard'

@ApiTags('MongoDB Tiers')
@Controller('mongo-tiers')
export class TiersController {
  constructor(private readonly tiersService: TiersService) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTierDto: CreateTierDto): Promise<Tier | undefined> {
    return this.tiersService.create(createTierDto)
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Tier[] | undefined> {
    return this.tiersService.findAll()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Tier | null> {
    return this.tiersService.findOne(id)
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTierDto: UpdateTierDto
  ): Promise<Tier | null> {
    return this.tiersService.update(id, updateTierDto)
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.tiersService.remove(id)
  }
}
