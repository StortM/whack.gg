import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  UseGuards
} from '@nestjs/common'
import { TeamsService } from './teams.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { Team } from './entities/team.entity'
import { AdminGuard } from 'src/sql/auth/admin.guard'
import { JwtAuthGuard } from 'src/sql/auth/jwt-auth.guard'

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team | undefined> {
    return this.teamsService.create(createTeamDto).catch(() => {
      throw new HttpException(
        'You can only assign 2 teams pr match.',
        HttpStatus.BAD_REQUEST
      )
    })
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<Team[] | undefined> {
    return this.teamsService.findAll()
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team | undefined> {
    return this.teamsService.findOne(id)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto
  ): Promise<Team | undefined> {
    return this.teamsService.update(id, updateTeamDto)
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(+id)
  }
}
