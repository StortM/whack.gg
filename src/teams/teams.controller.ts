import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus
} from '@nestjs/common'
import { TeamsService } from './teams.service'
import { CreateTeamDto } from './dto/create-team.dto'
import { UpdateTeamDto } from './dto/update-team.dto'
import { Team } from './entities/team.entity'

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Post()
  create(@Body() createTeamDto: CreateTeamDto): Promise<Team | undefined> {
    return this.teamsService.create(createTeamDto).catch(() => {
      throw new HttpException(
        'You can only assign 2 teams pr match.',
        HttpStatus.BAD_REQUEST
      )
    })
  }

  @Get()
  findAll(): Promise<Team[] | undefined> {
    return this.teamsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Team | undefined> {
    return this.teamsService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto
  ): Promise<Team | undefined> {
    return this.teamsService.update(id, updateTeamDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.teamsService.remove(+id)
  }
}
